// TEKA NEXUS — pylite: a sandboxed Python-subset interpreter in TypeScript.
// Powers the TEKA Academy playground and auto-graded challenges — 100% in the
// browser, zero dependencies, zero network. Deterministic seeding, step
// budgets and output caps make it safe to run learner code on the main thread.
//
// Supported: print/input, ints/floats/strings/bools/None, lists/dicts,
// if/elif/else, while/for/range, break/continue, def/return, f-strings,
// string & list & dict methods, sorted/sum/max/min/abs/round/len,
// import random (randint/choice/shuffle/seed) + import math.
// Everything fails with friendly "Line N: …" errors instead of crashing.

// ─── Public API ──────────────────────────────────────────────

export type PyResult =
  | { ok: true; output: string[] }
  | { ok: false; error: string; line: number };

export function runPython(code: string, stdinLines: string[] = []): PyResult {
  try {
    const tokens = tokenize(code);
    const program = parseProgram(tokens);
    const interp = new Interpreter(stdinLines);
    interp.run(program);
    return { ok: true, output: interp.output };
  } catch (e) {
    if (e instanceof PyError) return { ok: false, error: e.message, line: e.line };
    return { ok: false, error: "Something went wrong while running Python.", line: 0 };
  }
}

// ─── Errors ──────────────────────────────────────────────────

class PyError extends Error {
  line: number;
  constructor(message: string, line = 0) {
    super(message);
    this.line = line;
  }
}

// ─── Values ──────────────────────────────────────────────────

export type PyVal =
  | { t: "int"; v: number }
  | { t: "float"; v: number }
  | { t: "str"; v: string }
  | { t: "bool"; v: boolean }
  | { t: "none" }
  | { t: "list"; v: PyVal[] }
  | { t: "dict"; v: Map<string, PyVal> } // insertion-ordered, normalized keys
  | { t: "func"; name: string; params: string[]; body: Stmt[]; closure: Env }
  | { t: "module"; name: "random" | "math" };

const INT = (v: number): PyVal => ({ t: "int", v });
const FLOAT = (v: number): PyVal => ({ t: "float", v });
const STR = (v: string): PyVal => ({ t: "str", v });
const BOOL = (v: boolean): PyVal => ({ t: "bool", v });
const NONE: PyVal = { t: "none" };

function dictKey(x: PyVal): string | null {
  switch (x.t) {
    case "str": return `s:${x.v}`;
    case "int": return `i:${x.v}`;
    case "float": return Number.isInteger(x.v) ? `i:${x.v}` : `f:${x.v}`;
    case "bool": return `b:${x.v}`;
    default: return null;
  }
}

function truthy(x: PyVal): boolean {
  switch (x.t) {
    case "none": return false;
    case "bool": return x.v;
    case "int": case "float": return x.v !== 0;
    case "str": return x.v.length > 0;
    case "list": return x.v.length > 0;
    case "dict": return x.v.size > 0;
    default: return true;
  }
}

function pyRepr(x: PyVal): string {
  switch (x.t) {
    case "str": return `'${x.v.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
    case "int": return String(x.v);
    case "float": return formatFloat(x.v);
    case "bool": return x.v ? "True" : "False";
    case "none": return "None";
    case "list": return `[${x.v.map(pyRepr).join(", ")}]`;
    case "dict": {
      const parts: string[] = [];
      for (const [k, val] of x.v) {
        const keyLabel = k.startsWith("s:") ? `'${k.slice(2)}'` : k.slice(2);
        parts.push(`${keyLabel}: ${pyRepr(val)}`);
      }
      return `{${parts.join(", ")}}`;
    }
    case "func": return `<function ${x.name}>`;
    case "module": return `<module '${x.name}'>`;
  }
}

function pyStr(x: PyVal): string {
  if (x.t === "str") return x.v;
  return pyRepr(x);
}

function formatFloat(v: number): string {
  if (!Number.isFinite(v)) return v > 0 ? "inf" : Number.isNaN(v) ? "nan" : "-inf";
  if (Number.isInteger(v) && Math.abs(v) < 1e16) return `${v}.0`;
  return String(v);
}

// ─── Tokenizer ───────────────────────────────────────────────

type TokType =
  | "NAME" | "INT" | "FLOAT" | "STRING" | "FSTRING"
  | "OP" | "KEYWORD" | "NEWLINE" | "INDENT" | "DEDENT" | "EOF";

interface Tok {
  type: TokType;
  value: string;      // NAME text / OP symbol / decoded string / fstring raw
  parts?: FSPart[];   // fstring parts
  line: number;
}

interface FSPart { text?: string; exprSrc?: string }

const KEYWORDS = new Set([
  "if", "elif", "else", "while", "for", "in", "def", "return", "break",
  "continue", "pass", "and", "or", "not", "True", "False", "None", "import",
]);

const OPS3 = ["**=", "//=", "..."];
const OPS2 = ["==", "!=", "<=", ">=", "**", "//", "+=", "-=", "*=", "/=", "%="];

function tokenize(src: string): Tok[] {
  if (src.length > 20000) throw new PyError("Your program is too long for the playground (20 000 character limit).");
  const lines = src.replace(/\r\n?/g, "\n").split("\n");
  const toks: Tok[] = [];
  const indents: number[] = [0];
  let parenDepth = 0;

  lines.forEach((rawLine, idx) => {
    const line = idx + 1;
    let i = 0;

    if (parenDepth === 0) {
      let width = 0;
      while (i < rawLine.length) {
        const ch = rawLine[i];
        if (ch === " ") { width += 1; i += 1; }
        else if (ch === "\t") { width += 4; i += 1; }
        else break;
      }
      const rest = rawLine.slice(i);
      if (rest.trim() === "" || rest.trimStart().startsWith("#")) return; // blank/comment line
      const top = indents[indents.length - 1];
      if (width > top) {
        indents.push(width);
        toks.push({ type: "INDENT", value: "", line });
      } else if (width < top) {
        while (indents.length > 1 && width < indents[indents.length - 1]) {
          indents.pop();
          toks.push({ type: "DEDENT", value: "", line });
        }
        if (width !== indents[indents.length - 1]) {
          throw new PyError("unindent does not match any outer indentation level", line);
        }
      }
    }

    while (i < rawLine.length) {
      const ch = rawLine[i];
      if (ch === " " || ch === "\t") { i += 1; continue; }
      if (ch === "#") break; // comment till EOL

      // f-string / string
      if (ch === 'f' && (rawLine[i + 1] === '"' || rawLine[i + 1] === "'")) {
        const { value, parts, next } = lexFString(rawLine, i + 1, line);
        toks.push({ type: "FSTRING", value, parts, line });
        i = next;
        continue;
      }
      if (ch === '"' || ch === "'") {
        const { value, next } = lexString(rawLine, i, line);
        toks.push({ type: "STRING", value, line });
        i = next;
        continue;
      }

      // numbers
      if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(rawLine[i + 1] ?? ""))) {
        let j = i;
        let seenDot = false;
        while (j < rawLine.length && /[0-9._]/.test(rawLine[j])) {
          if (rawLine[j] === ".") {
            if (seenDot) break;
            if (rawLine[j + 1] === ".") break; // "1.." style — stop
            seenDot = true;
          }
          j += 1;
        }
        const raw = rawLine.slice(i, j).replace(/_/g, "");
        toks.push({ type: seenDot ? "FLOAT" : "INT", value: raw, line });
        i = j;
        continue;
      }

      // names / keywords
      if (/[A-Za-z_]/.test(ch)) {
        let j = i;
        while (j < rawLine.length && /[A-Za-z0-9_]/.test(rawLine[j])) j += 1;
        const word = rawLine.slice(i, j);
        toks.push({ type: KEYWORDS.has(word) ? "KEYWORD" : "NAME", value: word, line });
        i = j;
        continue;
      }

      // operators
      const three = rawLine.slice(i, i + 3);
      const two = rawLine.slice(i, i + 2);
      const one = ch;
      if (OPS3.includes(three)) { toks.push({ type: "OP", value: three, line }); i += 3; continue; }
      if (OPS2.includes(two)) { toks.push({ type: "OP", value: two, line }); i += 2; continue; }
      if ("+-*/%<>=(),:.[{}]".includes(one)) {
        if (one === "(" || one === "[" || one === "{") parenDepth += 1;
        if (one === ")" || one === "]" || one === "}") parenDepth = Math.max(0, parenDepth - 1);
        toks.push({ type: "OP", value: one, line });
        i += 1;
        continue;
      }
      throw new PyError(`unexpected character '${ch}'`, line);
    }

    if (parenDepth === 0) toks.push({ type: "NEWLINE", value: "", line });
  });

  while (indents.length > 1) {
    indents.pop();
    toks.push({ type: "DEDENT", value: "", line: lines.length });
  }
  toks.push({ type: "NEWLINE", value: "", line: lines.length });
  toks.push({ type: "EOF", value: "", line: lines.length });
  return toks;
}

function lexString(src: string, start: number, line: number): { value: string; next: number } {
  const quote = src[start];
  let i = start + 1;
  let out = "";
  while (i < src.length) {
    const ch = src[i];
    if (ch === quote) return { value: out, next: i + 1 };
    if (ch === "\\") {
      const nxt = src[i + 1];
      if (nxt === undefined) throw new PyError("unterminated string literal", line);
      out += decodeEscape(nxt);
      i += 2;
      continue;
    }
    out += ch;
    i += 1;
  }
  throw new PyError("unterminated string literal (missing closing quote)", line);
}

function decodeEscape(c: string): string {
  switch (c) {
    case "n": return "\n";
    case "t": return "\t";
    case "\\": return "\\";
    case "'": return "'";
    case '"': return '"';
    case "r": return "";
    default: return c;
  }
}

function lexFString(src: string, start: number, line: number): { value: string; parts: FSPart[]; next: number } {
  const quote = src[start];
  let i = start + 1;
  const parts: FSPart[] = [];
  let lit = "";
  while (i < src.length) {
    const ch = src[i];
    if (ch === quote) {
      if (lit) parts.push({ text: lit });
      return { value: "", parts, next: i + 1 };
    }
    if (ch === "\\") {
      const nxt = src[i + 1];
      if (nxt === undefined) break;
      lit += decodeEscape(nxt);
      i += 2;
      continue;
    }
    if (ch === "{") {
      if (src[i + 1] === "{") { lit += "{"; i += 2; continue; }
      if (lit) { parts.push({ text: lit }); lit = ""; }
      let depth = 1;
      let j = i + 1;
      let exprSrc = "";
      while (j < src.length && depth > 0) {
        const c = src[j];
        if (c === "{" || c === "(" || c === "[") depth += 1;
        if (c === "}" || c === ")" || c === "]") {
          depth -= 1;
          if (depth === 0) break;
        }
        exprSrc += c;
        j += 1;
      }
      if (depth !== 0) throw new PyError("f-string: expected '}'", line);
      if (exprSrc.includes(":")) {
        throw new PyError("f-string format specs like {x:.2f} are not supported — use round() instead", line);
      }
      if (exprSrc.includes("'") || exprSrc.includes('"')) {
        throw new PyError("f-string expressions cannot contain quotes — compute it on a variable first", line);
      }
      parts.push({ exprSrc });
      i = j + 1;
      continue;
    }
    if (ch === "}") {
      if (src[i + 1] === "}") { lit += "}"; i += 2; continue; }
      throw new PyError("f-string: single '}' is not allowed", line);
    }
    lit += ch;
    i += 1;
  }
  throw new PyError("unterminated f-string (missing closing quote)", line);
}

// ─── AST ─────────────────────────────────────────────────────

type Expr =
  | { k: "num"; v: number; isFloat: boolean; line: number }
  | { k: "str"; v: string; line: number }
  | { k: "fstr"; parts: FSPart[]; line: number }
  | { k: "bool"; v: boolean; line: number }
  | { k: "none"; line: number }
  | { k: "name"; name: string; line: number }
  | { k: "list"; items: Expr[]; line: number }
  | { k: "dict"; entries: { key: Expr; value: Expr }[]; line: number }
  | { k: "bin"; op: string; l: Expr; r: Expr; line: number }
  | { k: "unary"; op: string; e: Expr; line: number }
  | { k: "bool2"; op: "and" | "or"; l: Expr; r: Expr; line: number }
  | { k: "not"; e: Expr; line: number }
  | { k: "cmp"; op: string; l: Expr; r: Expr; line: number }
  | { k: "in"; l: Expr; r: Expr; line: number }
  | { k: "call"; callee: Expr; args: Expr[]; kwargs: { name: string; value: Expr }[]; line: number }
  | { k: "index"; obj: Expr; idx: Expr; line: number }
  | { k: "attr"; obj: Expr; name: string; line: number };

type Stmt =
  | { k: "assign"; name: string; op: string | null; value: Expr; line: number }
  | { k: "assignIndex"; obj: Expr; index: Expr; op: string | null; value: Expr; line: number }
  | { k: "expr"; e: Expr; line: number }
  | { k: "if"; branches: { cond: Expr; body: Stmt[] }[]; orelse: Stmt[] | null; line: number }
  | { k: "while"; cond: Expr; body: Stmt[]; line: number }
  | { k: "for"; varName: string; iter: Expr; body: Stmt[]; line: number }
  | { k: "def"; name: string; params: string[]; body: Stmt[]; line: number }
  | { k: "return"; e: Expr | null; line: number }
  | { k: "break"; line: number }
  | { k: "continue"; line: number }
  | { k: "pass"; line: number }
  | { k: "import"; mod: string; line: number };

// ─── Parser ──────────────────────────────────────────────────

class Parser {
  private toks: Tok[];
  private pos = 0;

  constructor(toks: Tok[]) {
    this.toks = toks;
  }

  private peek(offset = 0): Tok { return this.toks[Math.min(this.pos + offset, this.toks.length - 1)]; }
  private next(): Tok { return this.toks[this.pos++]; }
  private at(type: TokType, value?: string): boolean {
    const t = this.peek();
    return t.type === type && (value === undefined || t.value === value);
  }
  private atOp(value: string): boolean { return this.at("OP", value); }
  private atKw(value: string): boolean { return this.at("KEYWORD", value); }
  private eat(type: TokType, value?: string): Tok {
    if (!this.at(type, value)) {
      const t = this.peek();
      const got = t.type === "NEWLINE" ? "end of line" : t.type === "EOF" ? "end of program" : `'${t.value || t.type}'`;
      throw new PyError(`expected ${value ?? type}, found ${got}`, t.line);
    }
    return this.next();
  }

  parseProgram(): Stmt[] {
    const stmts: Stmt[] = [];
    while (!this.at("EOF")) {
      if (this.at("NEWLINE") || this.at("INDENT") || this.at("DEDENT")) { this.next(); continue; }
      stmts.push(this.parseStatement());
    }
    return stmts;
  }

  private parseBlock(): Stmt[] {
    this.eat("OP", ":");
    if (this.at("NEWLINE")) {
      this.eat("NEWLINE");
      this.eat("INDENT");
      const body: Stmt[] = [];
      while (!this.at("DEDENT") && !this.at("EOF")) {
        if (this.at("NEWLINE")) { this.next(); continue; }
        body.push(this.parseStatement());
      }
      this.eat("DEDENT");
      return body;
    }
    // inline single simple statement after ':'
    return [this.parseSimpleStmt()];
  }

  private parseStatement(): Stmt {
    if (this.atKw("if")) return this.parseIf();
    if (this.atKw("while")) return this.parseWhile();
    if (this.atKw("for")) return this.parseFor();
    if (this.atKw("def")) return this.parseDef();
    return this.parseSimpleStmt();
  }

  private parseIf(): Stmt {
    const line = this.peek().line;
    this.next(); // if
    const cond = this.parseExpr();
    const body = this.parseBlock();
    const branches = [{ cond, body }];
    let orelse: Stmt[] | null = null;
    // allow elif/else preceded by NEWLINE tokens
    for (;;) {
      while (this.at("NEWLINE")) this.next();
      if (this.atKw("elif")) {
        this.next();
        const c = this.parseExpr();
        branches.push({ cond: c, body: this.parseBlock() });
        continue;
      }
      if (this.atKw("else")) {
        this.next();
        orelse = this.parseBlock();
      }
      break;
    }
    return { k: "if", branches, orelse, line };
  }

  private parseWhile(): Stmt {
    const line = this.peek().line;
    this.next();
    const cond = this.parseExpr();
    const body = this.parseBlock();
    return { k: "while", cond, body, line };
  }

  private parseFor(): Stmt {
    const line = this.peek().line;
    this.next();
    const name = this.eat("NAME").value;
    this.eat("KEYWORD", "in");
    const iter = this.parseExpr();
    const body = this.parseBlock();
    return { k: "for", varName: name, iter, body, line };
  }

  private parseDef(): Stmt {
    const line = this.peek().line;
    this.next();
    const name = this.eat("NAME").value;
    this.eat("OP", "(");
    const params: string[] = [];
    while (!this.atOp(")")) {
      params.push(this.eat("NAME").value);
      if (this.atOp(",")) { this.next(); continue; }
      break;
    }
    this.eat("OP", ")");
    const body = this.parseBlock();
    return { k: "def", name, params, body, line };
  }

  private parseSimpleStmt(): Stmt {
    const t = this.peek();
    const line = t.line;

    if (this.atKw("return")) {
      this.next();
      if (this.at("NEWLINE") || this.at("EOF")) { this.matchNewline(); return { k: "return", e: null, line }; }
      const e = this.parseExpr();
      this.matchNewline();
      return { k: "return", e, line };
    }
    if (this.atKw("break")) { this.next(); this.matchNewline(); return { k: "break", line }; }
    if (this.atKw("continue")) { this.next(); this.matchNewline(); return { k: "continue", line }; }
    if (this.atKw("pass")) { this.next(); this.matchNewline(); return { k: "pass", line }; }
    if (this.atKw("import")) {
      this.next();
      const mod = this.eat("NAME").value;
      if (mod !== "random" && mod !== "math") {
        throw new PyError(`module '${mod}' is not available in this playground — try random or math`, line);
      }
      this.matchNewline();
      return { k: "import", mod, line };
    }

    // assignment?  NAME (=|+=|-=|…) expr
    if (t.type === "NAME" && this.peek(1).type === "OP" && ["=", "+=", "-=", "*=", "/=", "//=", "%=", "**="].includes(this.peek(1).value)) {
      const name = this.next().value;
      const op = this.next().value;
      const value = this.parseExpr();
      this.matchNewline();
      return { k: "assign", name, op: op === "=" ? null : op, value, line };
    }

    // item assignment?  NAME[expr] (=|+=|…) expr  (speculative parse + rewind)
    if (t.type === "NAME" && this.peek(1).type === "OP" && this.peek(1).value === "[") {
      const save = this.pos;
      this.next(); // NAME
      this.next(); // [
      const indexExpr = this.parseExpr();
      if (this.atOp("]") && this.peek(1).type === "OP" && ["=", "+=", "-=", "*=", "/=", "//=", "%=", "**="].includes(this.peek(1).value)) {
        this.next(); // ]
        const op = this.next().value;
        const value = this.parseExpr();
        this.matchNewline();
        return { k: "assignIndex", obj: { k: "name", name: t.value, line }, index: indexExpr, op: op === "=" ? null : op, value, line };
      }
      this.pos = save; // not an item assignment — rewind
    }

    const e = this.parseExpr();
    this.matchNewline();
    return { k: "expr", e, line };
  }

  private matchNewline() {
    while (this.at("NEWLINE")) this.next();
  }

  // ── expressions (precedence climbing) ──
  parseExpr(): Expr { return this.parseOr(); }

  private parseOr(): Expr {
    let l = this.parseAnd();
    while (this.atKw("or")) {
      const line = this.next().line;
      l = { k: "bool2", op: "or", l, r: this.parseAnd(), line };
    }
    return l;
  }

  private parseAnd(): Expr {
    let l = this.parseNot();
    while (this.atKw("and")) {
      const line = this.next().line;
      l = { k: "bool2", op: "and", l, r: this.parseNot(), line };
    }
    return l;
  }

  private parseNot(): Expr {
    if (this.atKw("not")) {
      const line = this.next().line;
      return { k: "not", e: this.parseNot(), line };
    }
    return this.parseComparison();
  }

  private parseComparison(): Expr {
    let l = this.parseAdd();
    for (;;) {
      const t = this.peek();
      if (t.type === "OP" && ["==", "!=", "<", "<=", ">", ">="].includes(t.value)) {
        this.next();
        const r = this.parseAdd();
        l = { k: "cmp", op: t.value, l, r, line: t.line };
        continue;
      }
      if (this.atKw("in")) {
        const line = this.next().line;
        const r = this.parseAdd();
        l = { k: "in", l, r, line };
        continue;
      }
      break;
    }
    return l;
  }

  private parseAdd(): Expr {
    let l = this.parseMul();
    while (this.atOp("+") || this.atOp("-")) {
      const t = this.next();
      l = { k: "bin", op: t.value, l, r: this.parseMul(), line: t.line };
    }
    return l;
  }

  private parseMul(): Expr {
    let l = this.parseUnary();
    while (this.atOp("*") || this.atOp("/") || this.atOp("//") || this.atOp("%")) {
      const t = this.next();
      l = { k: "bin", op: t.value, l, r: this.parseUnary(), line: t.line };
    }
    return l;
  }

  private parseUnary(): Expr {
    if (this.atOp("-")) {
      const t = this.next();
      return { k: "unary", op: "-", e: this.parseUnary(), line: t.line };
    }
    if (this.atOp("+")) {
      this.next();
      return this.parseUnary();
    }
    return this.parsePower();
  }

  private parsePower(): Expr {
    const base = this.parsePostfix();
    if (this.atOp("**")) {
      const t = this.next();
      return { k: "bin", op: "**", l: base, r: this.parseUnary(), line: t.line }; // right-assoc
    }
    return base;
  }

  private parsePostfix(): Expr {
    let e = this.parseAtom();
    for (;;) {
      if (this.atOp("(")) {
        const line = this.next().line;
        const args: Expr[] = [];
        const kwargs: { name: string; value: Expr }[] = [];
        while (!this.atOp(")")) {
          if (this.peek().type === "NAME" && this.peek(1).type === "OP" && this.peek(1).value === "=") {
            const name = this.next().value;
            this.next(); // =
            kwargs.push({ name, value: this.parseExpr() });
          } else {
            args.push(this.parseExpr());
          }
          if (this.atOp(",")) { this.next(); continue; }
          break;
        }
        this.eat("OP", ")");
        e = { k: "call", callee: e, args, kwargs, line };
        continue;
      }
      if (this.atOp("[")) {
        const line = this.next().line;
        const idx = this.parseExpr();
        this.eat("OP", "]");
        e = { k: "index", obj: e, idx, line };
        continue;
      }
      if (this.atOp(".")) {
        this.next();
        const name = this.eat("NAME").value;
        e = { k: "attr", obj: e, name, line: this.peek().line };
        continue;
      }
      break;
    }
    return e;
  }

  private parseAtom(): Expr {
    const t = this.peek();
    const line = t.line;
    if (t.type === "INT") { this.next(); return { k: "num", v: Number(t.value), isFloat: false, line }; }
    if (t.type === "FLOAT") { this.next(); return { k: "num", v: Number(t.value), isFloat: true, line }; }
    if (t.type === "STRING") { this.next(); return { k: "str", v: t.value, line }; }
    if (t.type === "FSTRING") { this.next(); return { k: "fstr", parts: t.parts ?? [], line }; }
    if (this.atKw("True")) { this.next(); return { k: "bool", v: true, line }; }
    if (this.atKw("False")) { this.next(); return { k: "bool", v: false, line }; }
    if (this.atKw("None")) { this.next(); return { k: "none", line }; }
    if (t.type === "NAME") { this.next(); return { k: "name", name: t.value, line }; }
    if (this.atOp("(")) {
      this.next();
      const e = this.parseExpr();
      this.eat("OP", ")");
      return e;
    }
    if (this.atOp("[")) {
      this.next();
      const items: Expr[] = [];
      while (!this.atOp("]")) {
        items.push(this.parseExpr());
        if (this.atOp(",")) { this.next(); continue; }
        break;
      }
      this.eat("OP", "]");
      return { k: "list", items, line };
    }
    if (this.atOp("{")) {
      this.next();
      const entries: { key: Expr; value: Expr }[] = [];
      while (!this.atOp("}")) {
        const key = this.parseExpr();
        this.eat("OP", ":");
        const value = this.parseExpr();
        entries.push({ key, value });
        if (this.atOp(",")) { this.next(); continue; }
        break;
      }
      this.eat("OP", "}");
      return { k: "dict", entries, line };
    }
    const got = t.type === "NEWLINE" || t.type === "EOF" ? "end of line" : `'${t.value || t.type}'`;
    throw new PyError(`invalid syntax near ${got}`, line);
  }
}

function parseProgram(toks: Tok[]): Stmt[] {
  return new Parser(toks).parseProgram();
}

// ─── Runtime ─────────────────────────────────────────────────

type Env = { vars: Map<string, PyVal>; parent: Env | null };

function envLookup(env: Env, name: string): PyVal | undefined {
  let cur: Env | null = env;
  while (cur) {
    const v = cur.vars.get(name);
    if (v !== undefined) return v;
    cur = cur.parent;
  }
  return undefined;
}

function envSet(env: Env, name: string, value: PyVal) {
  env.vars.set(name, value);
}

const BREAK = Symbol("break");
const CONTINUE = Symbol("continue");
type ReturnSignal = { __return: true; value: PyVal };
function isReturn(x: unknown): x is ReturnSignal {
  return typeof x === "object" && x !== null && "__return" in x;
}

// Deterministic PRNG (mulberry32) so random.seed(n) is reproducible.
function makeRng(seed: number): () => number {
  let a = Math.floor(seed) >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STEP_LIMIT = 400000;
const OUTPUT_LINE_LIMIT = 500;
const OUTPUT_CHAR_LIMIT = 20000;
const MAX_RANGE = 100000;

class Interpreter {
  private globals: Env = { vars: new Map(), parent: null };
  private rng: () => number = Math.random;
  private stdin: string[];
  private stdinPos = 0;
  output: string[] = [];
  private openLast = false;
  private steps = 0;
  private outChars = 0;
  private depth = 0;

  constructor(stdin: string[]) {
    this.stdin = stdin;
  }

  run(program: Stmt[]) {
    this.execBlock(program, this.globals);
  }

  // ── helpers ──
  private tick(line: number) {
    this.steps += 1;
    if (this.steps > STEP_LIMIT) {
      throw new PyError("your program ran too long — check for an infinite loop (does the while condition ever change?)", line);
    }
  }

  /** Write one print body; a non-newline `end` leaves the last line open. */
  private write(text: string, line: number) {
    if (this.outChars + text.length > OUTPUT_CHAR_LIMIT) {
      throw new PyError("too much output — over 20 000 characters", line);
    }
    if (this.openLast && this.output.length > 0) {
      this.output[this.output.length - 1] += text;
    } else {
      this.output.push(text);
      if (this.output.length > OUTPUT_LINE_LIMIT) {
        throw new PyError("too much output — over 500 lines (an infinite print loop?)", line);
      }
    }
    this.outChars += text.length;
  }

  private doPrint(e: Extract<Expr, { k: "call" }>, env: Env) {
    const args = e.args.map(a => this.evalExpr(a, env));
    let sep = " ";
    let end = "\n";
    for (const kw of e.kwargs) {
      const v = this.evalExpr(kw.value, env);
      if (kw.name === "sep" && v.t === "str") sep = v.v;
      else if (kw.name === "end" && v.t === "str") end = v.v;
      else this.err(`print() got an unexpected keyword argument '${kw.name}' (try sep= or end=)`, e.line);
    }
    const body = args.map(pyStr).join(sep);
    this.write(end === "\n" ? body : body + end, e.line);
    this.openLast = end !== "\n";
  }

  private err(msg: string, line: number): never {
    throw new PyError(msg, line);
  }

  // ── statements ──
  private execBlock(stmts: Stmt[], env: Env): void | ReturnSignal | typeof BREAK | typeof CONTINUE {
    for (const st of stmts) {
      const r = this.execStmt(st, env);
      if (r !== undefined) return r;
    }
    return undefined;
  }

  private execStmt(st: Stmt, env: Env): void | ReturnSignal | typeof BREAK | typeof CONTINUE {
    this.tick(st.line);
    switch (st.k) {
      case "assign": {
        let value = this.evalExpr(st.value, env);
        if (st.op) {
          const cur = envLookup(env, st.name);
          if (cur === undefined) this.err(`name '${st.name}' is not defined`, st.line);
          value = this.binop(st.op.slice(0, -1), cur!, value, st.line);
        }
        envSet(env, st.name, value);
        return;
      }
      case "assignIndex": {
        const obj = this.evalExpr(st.obj, env);
        const idx = this.evalExpr(st.index, env);
        let value = this.evalExpr(st.value, env);
        if (obj.t !== "dict") {
          this.err(`'${typeName(obj)}' does not support item assignment — only dictionaries do`, st.line);
        }
        const k = dictKey(idx);
        if (k === null) this.err("dictionary keys must be strings, numbers or booleans", st.line);
        if (st.op) {
          const cur = obj.v.get(k);
          if (cur === undefined) this.err(`KeyError: ${pyStr(idx)} — this key is not in the dictionary yet`, st.line);
          value = this.binop(st.op.slice(0, -1), cur!, value, st.line);
        }
        obj.v.set(k, value);
        return;
      }
      case "expr":
        this.evalExpr(st.e, env);
        return;
      case "if": {
        for (const b of st.branches) {
          if (truthy(this.evalExpr(b.cond, env))) {
            return this.execBlock(b.body, env);
          }
        }
        if (st.orelse) return this.execBlock(st.orelse, env);
        return;
      }
      case "while": {
        let guard = 0;
        while (truthy(this.evalExpr(st.cond, env))) {
          this.tick(st.line);
          guard += 1;
          if (guard > STEP_LIMIT / 10) {
            this.err("your program ran too long — check for an infinite loop (does the while condition ever change?)", st.line);
          }
          const r = this.execBlock(st.body, env);
          if (r === BREAK) break;
          if (isReturn(r)) return r;
          // CONTINUE → next round
        }
        return;
      }
      case "for": {
        const iterable = this.evalExpr(st.iter, env);
        const items = this.iterate(iterable, st.line);
        for (const item of items) {
          this.tick(st.line);
          envSet(env, st.varName, item);
          const r = this.execBlock(st.body, env);
          if (r === BREAK) break;
          if (isReturn(r)) return r;
        }
        return;
      }
      case "def":
        envSet(env, st.name, { t: "func", name: st.name, params: st.params, body: st.body, closure: env });
        return;
      case "return":
        return { __return: true, value: st.e ? this.evalExpr(st.e, env) : NONE };
      case "break":
        return BREAK;
      case "continue":
        return CONTINUE;
      case "pass":
        return;
      case "import": {
        if (st.mod === "random") {
          this.rng = Math.random; // fresh unseeded randomness per import
          envSet(env, st.mod, { t: "module", name: "random" });
        } else {
          envSet(env, st.mod, { t: "module", name: "math" });
        }
        return;
      }
    }
  }

  private iterate(x: PyVal, line: number): PyVal[] {
    switch (x.t) {
      case "list": return [...x.v];
      case "str": return [...x.v].map(STR);
      case "dict": return [...x.v.keys()].map(k =>
        k.startsWith("s:") ? STR(k.slice(2)) : k.startsWith("b:")
          ? BOOL(k.slice(2) === "true")
          : INT(Number(k.slice(2))));
      default:
        this.err(`'${typeName(x)}' object is not iterable (use a list, string or range)`, line);
    }
  }

  // ── expressions ──
  private evalExpr(e: Expr, env: Env): PyVal {
    this.tick(e.line);
    switch (e.k) {
      case "num": return e.isFloat ? FLOAT(e.v) : INT(e.v);
      case "str": return STR(e.v);
      case "fstr": return STR(e.parts.map(p => p.text ?? pyStr(this.evalFPart(p.exprSrc!, env, e.line))).join(""));
      case "bool": return BOOL(e.v);
      case "none": return NONE;
      case "name": {
        const v = envLookup(env, e.name);
        if (v === undefined) this.err(`name '${e.name}' is not defined — check the spelling, or create it first`, e.line);
        return v!;
      }
      case "list": return { t: "list", v: e.items.map(it => this.evalExpr(it, env)) };
      case "dict": {
        const m = new Map<string, PyVal>();
        for (const en of e.entries) {
          const key = this.evalExpr(en.key, env);
          const k = dictKey(key);
          if (k === null) this.err("dictionary keys must be strings, numbers or booleans", e.line);
          m.set(k, this.evalExpr(en.value, env));
        }
        return { t: "dict", v: m };
      }
      case "bin": {
        const l = this.evalExpr(e.l, env);
        const r = this.evalExpr(e.r, env);
        return this.binop(e.op, l, r, e.line);
      }
      case "unary": {
        const v = this.evalExpr(e.e, env);
        if (v.t === "int") return INT(-v.v);
        if (v.t === "float") return FLOAT(-v.v);
        this.err(`bad operand type for unary -: '${typeName(v)}'`, e.line);
      }
      case "bool2": {
        const l = this.evalExpr(e.l, env);
        if (e.op === "and") return truthy(l) ? this.evalExpr(e.r, env) : l;
        return truthy(l) ? l : this.evalExpr(e.r, env);
      }
      case "not": return BOOL(!truthy(this.evalExpr(e.e, env)));
      case "cmp": {
        const l = this.evalExpr(e.l, env);
        const r = this.evalExpr(e.r, env);
        return BOOL(this.compare(e.op, l, r, e.line));
      }
      case "in": {
        const l = this.evalExpr(e.l, env);
        const r = this.evalExpr(e.r, env);
        if (r.t === "str") {
          if (l.t !== "str") this.err("'in <string>' requires a string on the left", e.line);
          return BOOL(r.v.includes(l.v));
        }
        if (r.t === "list") return BOOL(r.v.some(it => this.equals(it, l)));
        if (r.t === "dict") {
          const k = dictKey(l);
          return BOOL(k !== null && r.v.has(k));
        }
        this.err(`argument of 'in' must be a string, list or dictionary (got '${typeName(r)}')`, e.line);
      }
      case "call": return this.callExpr(e, env);
      case "index": {
        const obj = this.evalExpr(e.obj, env);
        const idx = this.evalExpr(e.idx, env);
        if (obj.t === "list" || obj.t === "str") {
          if (idx.t !== "int") this.err(`indices must be integers (got '${typeName(idx)}')`, e.line);
          const n = obj.t === "list" ? obj.v.length : obj.v.length;
          let i = idx.v;
          if (i < 0) i += n;
          if (i < 0 || i >= n) {
            this.err(`index out of range — the collection has ${n} item${n === 1 ? "" : "s"} (valid: 0…${n - 1})`, e.line);
          }
          return obj.t === "list" ? obj.v[i] : STR(obj.v[i]);
        }
        if (obj.t === "dict") {
          const k = dictKey(idx);
          if (k === null) this.err("dictionary keys must be strings, numbers or booleans", e.line);
          const v = obj.v.get(k);
          if (v === undefined) this.err(`KeyError: ${pyStr(idx)} — this key is not in the dictionary (try .get() for a safe read)`, e.line);
          return v!;
        }
        this.err(`'${typeName(obj)}' object is not subscriptable`, e.line);
      }
      case "attr": {
        const obj = this.evalExpr(e.obj, env);
        if (obj.t === "module") {
          if (obj.name === "math" && e.name === "pi") return FLOAT(Math.PI);
          if (obj.name === "math" && e.name === "e") return FLOAT(Math.E);
          this.err(`'${obj.name}.${e.name}' is not available (try math.pi, or functions like random.randint)`, e.line);
        }
        this.err(`'${typeName(obj)}' object has no attribute '${e.name}'`, e.line);
      }
    }
  }

  private evalFPart(src: string, env: Env, line: number): PyVal {
    const toks = tokenize(src);
    const expr = new Parser(toks).parseProgram();
    if (expr.length !== 1 || expr[0].k !== "expr") {
      this.err("f-string expressions must be a single expression", line);
    }
    return this.evalExpr((expr[0] as Extract<Stmt, { k: "expr" }>).e, env);
  }

  private callExpr(e: Extract<Expr, { k: "call" }>, env: Env): PyVal {
    const callee = e.callee;

    // print(...) — needs sep/end kwargs, handled specially
    if (callee.k === "name" && callee.name === "print") {
      const shadowed = envLookup(env, "print");
      if (!shadowed || shadowed.t !== "func") {
        this.doPrint(e, env);
        return NONE;
      }
    }

    // builtin call: NAME(...)
    if (callee.k === "name") {
      const fn = envLookup(env, callee.name);
      if (fn !== undefined && fn.t === "func") {
        return this.callFunc(fn, e, env);
      }
      const args = e.args.map(a => this.evalExpr(a, env));
      return this.callBuiltin(callee.name, args, e.line);
    }

    // method call / module function: obj.method(...) — covers random.randint(...)
    if (callee.k === "attr") {
      const obj = this.evalExpr(callee.obj, env);
      const args = e.args.map(a => this.evalExpr(a, env));
      return this.callMethod(obj, callee.name, args, e.line);
    }

    this.err("you can only call functions and methods", e.line);
  }

  private callFunc(fn: Extract<PyVal, { t: "func" }>, e: Extract<Expr, { k: "call" }>, callerEnv: Env): PyVal {
    if (e.kwargs.length > 0) this.err("keyword arguments are only supported for print()", e.line);
    if (e.args.length !== fn.params.length) {
      this.err(`${fn.name}() takes ${fn.params.length} argument${fn.params.length === 1 ? "" : "s"} but ${e.args.length} ${e.args.length === 1 ? "was" : "were"} given`, e.line);
    }
    this.depth += 1;
    if (this.depth > 60) {
      this.depth -= 1;
      this.err("your functions called themselves too deep — infinite recursion?", e.line);
    }
    const local: Env = { vars: new Map(), parent: fn.closure };
    fn.params.forEach((p, i) => local.vars.set(p, this.evalExpr(e.args[i], callerEnv)));
    const r = this.execBlock(fn.body, local);
    this.depth -= 1;
    if (isReturn(r)) return r.value;
    return NONE;
  }

  private kwarg(e: Extract<Expr, { k: "call" }>, name: string, env: Env, fallback: PyVal): PyVal {
    const found = e.kwargs.find(k => k.name === name);
    return found ? this.evalExpr(found.value, env) : fallback;
  }

  private callBuiltin(name: string, args: PyVal[], line: number): PyVal {
    switch (name) {
      case "input": {
        if (this.stdinPos >= this.stdin.length) {
          this.err("input() ran out of lines — add more lines to the Input box (one per input() call)", line);
        }
        return STR(this.stdin[this.stdinPos++]);
      }
      case "len": {
        const a = one(args, "len", line);
        if (a.t === "str" || a.t === "list") return INT(a.v.length);
        if (a.t === "dict") return INT(a.v.size);
        this.err(`object of type '${typeName(a)}' has no len()`, line);
      }
      case "int": {
        const a = one(args, "int", line);
        if (a.t === "int") return a;
        if (a.t === "float") return INT(Math.trunc(a.v));
        if (a.t === "bool") return INT(a.v ? 1 : 0);
        if (a.t === "str") {
          const trimmed = a.v.trim();
          if (/^[+-]?[0-9]+$/.test(trimmed)) return INT(Number(trimmed));
          this.err(`int(): invalid literal '${a.v.trim().slice(0, 20)}' — use float() for decimals`, line);
        }
        this.err(`int() can't convert '${typeName(a)}'`, line);
      }
      case "float": {
        const a = one(args, "float", line);
        if (a.t === "float") return a;
        if (a.t === "int") return FLOAT(a.v);
        if (a.t === "bool") return FLOAT(a.v ? 1 : 0);
        if (a.t === "str") {
          const trimmed = a.v.trim();
          if (/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(trimmed)) return FLOAT(Number(trimmed));
          this.err(`float(): invalid literal '${a.v.trim().slice(0, 20)}'`, line);
        }
        this.err(`float() can't convert '${typeName(a)}'`, line);
      }
      case "str": {
        const a = one(args, "str", line);
        return STR(pyStr(a));
      }
      case "bool": {
        const a = one(args, "bool", line);
        return BOOL(truthy(a));
      }
      case "sum": {
        const a = one(args, "sum", line);
        if (a.t !== "list") this.err("sum() needs a list of numbers", line);
        let acc = 0;
        let sawFloat = false;
        for (const it of a.v) {
          if (it.t === "int") acc += it.v;
          else if (it.t === "float") { acc += it.v; sawFloat = true; }
          else if (it.t === "bool") acc += it.v ? 1 : 0;
          else this.err("sum() needs a list of numbers", line);
        }
        return sawFloat ? FLOAT(acc) : INT(acc);
      }
      case "max": case "min": {
        if (args.length === 0) this.err(`${name}() needs at least one argument`, line);
        const items = args.length === 1 ? unwrapList(args[0], name, line) : args;
        let best = items[0];
        for (const it of items.slice(1)) {
          const c = this.compare(">", it, best, line);
          if (name === "max" ? c : this.compare("<", it, best, line)) best = it;
        }
        return best;
      }
      case "abs": {
        const a = one(args, "abs", line);
        if (a.t === "int") return INT(Math.abs(a.v));
        if (a.t === "float") return FLOAT(Math.abs(a.v));
        this.err(`abs() needs a number (got '${typeName(a)}')`, line);
      }
      case "round": {
        if (args.length < 1 || args.length > 2) this.err("round() takes 1 or 2 arguments", line);
        const a = args[0];
        const digits = args.length > 1 ? args[1] : null;
        if (a.t !== "int" && a.t !== "float") this.err(`round() needs a number (got '${typeName(a)}')`, line);
        if (digits && digits.t !== "int") this.err("round() digits must be an int", line);
        const nd = digits ? digits.v : 0;
        // Python banker's rounding, then float-in/float-out semantics
        const factor = Math.pow(10, nd);
        const scaled = a.v * factor;
        const floorV = Math.floor(scaled);
        let rounded: number;
        const diff = scaled - floorV;
        if (diff > 0.5) rounded = floorV + 1;
        else if (diff < 0.5) rounded = floorV;
        else rounded = floorV % 2 === 0 ? floorV : floorV + 1;
        const result = rounded / factor;
        return a.t === "int" && nd <= 0 ? INT(result) : FLOAT(result);
      }
      case "sorted": {
        const a = one(args, "sorted", line);
        const items = [...unwrapList(a, "sorted", line)];
        items.sort((x, y) => (this.compare("<", x, y, line) ? -1 : this.compare(">", x, y, line) ? 1 : 0));
        return { t: "list", v: items };
      }
      case "list": {
        if (args.length === 0) return { t: "list", v: [] };
        return { t: "list", v: this.iterate(args[0], line) };
      }
      case "range": {
        let start = 0, stop = 0, step = 1;
        if (args.length === 1) stop = asInt(args[0], "range", line);
        else if (args.length === 2) { start = asInt(args[0], "range", line); stop = asInt(args[1], "range", line); }
        else if (args.length === 3) {
          start = asInt(args[0], "range", line);
          stop = asInt(args[1], "range", line);
          step = asInt(args[2], "range", line);
          if (step === 0) this.err("range() step must not be zero", line);
        } else this.err("range() takes 1 to 3 arguments", line);
        const out: PyVal[] = [];
        if (step > 0) for (let i = start; i < stop; i += step) { out.push(INT(i)); if (out.length > MAX_RANGE) break; }
        else for (let i = start; i > stop; i += step) { out.push(INT(i)); if (out.length > MAX_RANGE) break; }
        return { t: "list", v: out };
      }
      default:
        this.err(`'${name}' is not defined — did you forget to create it, or to import a module?`, line);
    }
  }

  private callMethod(obj: PyVal, method: string, args: PyVal[], line: number): PyVal {
    // string methods
    if (obj.t === "str") {
      const s = obj.v;
      const need = (n: number, m: string) => arity(args, n, `${s ? "str" : "str"}.${m}`, line);
      switch (method) {
        case "upper": need(0, method); return STR(s.toUpperCase());
        case "lower": need(0, method); return STR(s.toLowerCase());
        case "strip": need(0, method); return STR(s.trim());
        case "title": need(0, method); return STR(s.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()));
        case "capitalize": need(0, method); return STR(s.length ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s);
        case "replace": {
          need(2, method);
          if (args[0].t !== "str" || args[1].t !== "str") this.err("replace() needs two strings", line);
          return STR(s.split(args[0].v).join(args[1].v));
        }
        case "split": {
          if (args.length === 0) return { t: "list", v: s.trim().length ? s.trim().split(/\s+/).map(STR) : [] };
          if (args[0].t !== "str") this.err("split() separator must be a string", line);
          return { t: "list", v: args[0].v === "" ? [] : s.split(args[0].v).map(STR) };
        }
        case "find": {
          need(1, method);
          if (args[0].t !== "str") this.err("find() needs a string", line);
          return INT(s.indexOf(args[0].v));
        }
        case "count": {
          need(1, method);
          if (args[0].t !== "str") this.err("count() needs a string", line);
          if (args[0].v === "") return INT(s.length + 1);
          return INT(s.split(args[0].v).length - 1);
        }
        case "startswith": {
          need(1, method);
          if (args[0].t !== "str") this.err("startswith() needs a string", line);
          return BOOL(s.startsWith(args[0].v));
        }
        case "endswith": {
          need(1, method);
          if (args[0].t !== "str") this.err("endswith() needs a string", line);
          return BOOL(s.endsWith(args[0].v));
        }
        case "join": {
          need(1, method);
          const items = unwrapList(args[0], "join", line);
          for (const it of items) if (it.t !== "str") this.err("join() needs a list of strings", line);
          return STR(items.map(it => (it as Extract<PyVal, { t: "str" }>).v).join(s));
        }
        case "isdigit": {
          need(0, method);
          return BOOL(s.length > 0 && /^[0-9]+$/.test(s));
        }
        default:
          this.err(`strings have no method '${method}'`, line);
      }
    }

    // list methods
    if (obj.t === "list") {
      const list = obj.v;
      switch (method) {
        case "append": {
          arity(args, 1, "list.append", line);
          list.push(args[0]);
          return NONE;
        }
        case "pop": {
          if (args.length > 1) this.err("list.pop takes at most 1 argument", line);
          let i = args.length === 1 ? asInt(args[0], "pop", line) : list.length - 1;
          if (i < 0) i += list.length;
          if (i < 0 || i >= list.length) this.err("pop from empty list — index out of range", line);
          return list.splice(i, 1)[0];
        }
        case "insert": {
          arity(args, 2, "list.insert", line);
          let i = asInt(args[0], "insert", line);
          if (i < 0) i = Math.max(0, i + list.length);
          list.splice(Math.min(i, list.length), 0, args[1]);
          return NONE;
        }
        case "remove": {
          arity(args, 1, "list.remove", line);
          const idx = list.findIndex(it => this.equals(it, args[0]));
          if (idx === -1) this.err(`list.remove(x): ${pyStr(args[0])} is not in the list`, line);
          list.splice(idx, 1);
          return NONE;
        }
        case "sort": {
          arity(args, 0, "list.sort", line);
          list.sort((x, y) => (this.compare("<", x, y, line) ? -1 : this.compare(">", x, y, line) ? 1 : 0));
          return NONE;
        }
        case "reverse": {
          arity(args, 0, "list.reverse", line);
          list.reverse();
          return NONE;
        }
        case "copy": {
          arity(args, 0, "list.copy", line);
          return { t: "list", v: [...list] };
        }
        default:
          this.err(`lists have no method '${method}'`, line);
      }
    }

    // dict methods
    if (obj.t === "dict") {
      switch (method) {
        case "keys": {
          arity(args, 0, "dict.keys", line);
          return { t: "list", v: [...obj.v.keys()].map(k => denormalizeKey(k)) };
        }
        case "values": {
          arity(args, 0, "dict.values", line);
          return { t: "list", v: [...obj.v.values()] };
        }
        case "items": {
          arity(args, 0, "dict.items", line);
          return { t: "list", v: [...obj.v.entries()].map(([k, v]) => ({ t: "list", v: [denormalizeKey(k), v] } as PyVal)) };
        }
        case "get": {
          if (args.length < 1 || args.length > 2) this.err("dict.get takes 1 or 2 arguments", line);
          const k = dictKey(args[0]);
          if (k === null) this.err("dictionary keys must be strings, numbers or booleans", line);
          const v = obj.v.get(k);
          if (v !== undefined) return v;
          return args.length === 2 ? args[1] : NONE;
        }
        default:
          this.err(`dictionaries have no method '${method}'`, line);
      }
    }

    // module functions: random.randint / math.sqrt …
    if (obj.t === "module") {
      if (obj.name === "random") {
        switch (method) {
          case "seed": {
            arity(args, 1, "random.seed", line);
            this.rng = makeRng(asNum(args[0], "random.seed", line));
            return NONE;
          }
          case "randint": {
            arity(args, 2, "random.randint", line);
            const lo = asInt(args[0], "randint", line);
            const hi = asInt(args[1], "randint", line);
            if (lo > hi) this.err("randint(a, b) needs a <= b", line);
            return INT(lo + Math.floor(this.rng() * (hi - lo + 1)));
          }
          case "choice": {
            arity(args, 1, "random.choice", line);
            const items = unwrapList(args[0], "choice", line);
            if (items.length === 0) this.err("random.choice() needs a non-empty list", line);
            return items[Math.floor(this.rng() * items.length)];
          }
          case "shuffle": {
            arity(args, 1, "random.shuffle", line);
            const arr = args[0];
            if (arr.t !== "list") this.err("random.shuffle() needs a list", line);
            for (let i = arr.v.length - 1; i > 0; i--) {
              const j = Math.floor(this.rng() * (i + 1));
              [arr.v[i], arr.v[j]] = [arr.v[j], arr.v[i]];
            }
            return NONE;
          }
          default:
            this.err(`random has no function '${method}' (try randint, choice, shuffle or seed)`, line);
        }
      }
      if (obj.name === "math") {
        switch (method) {
          case "pi": this.err("math.pi is a value, not a function — write it without parentheses", line);
          case "sqrt": {
            arity(args, 1, "math.sqrt", line);
            const v = asNum(args[0], "sqrt", line);
            if (v < 0) this.err("math.sqrt() needs a non-negative number", line);
            return FLOAT(Math.sqrt(v));
          }
          case "floor": {
            arity(args, 1, "math.floor", line);
            return INT(Math.floor(asNum(args[0], "floor", line)));
          }
          case "ceil": {
            arity(args, 1, "math.ceil", line);
            return INT(Math.ceil(asNum(args[0], "ceil", line)));
          }
          case "pow": {
            arity(args, 2, "math.pow", line);
            return FLOAT(Math.pow(asNum(args[0], "pow", line), asNum(args[1], "pow", line)));
          }
          default:
            this.err(`math has no function '${method}' (try sqrt, floor, ceil, pow or pi)`, line);
        }
      }
    }

    this.err(`'${typeName(obj)}' object has no method '${method}'`, line);
  }

  // ── operators ──
  private binop(op: string, l: PyVal, r: PyVal, line: number): PyVal {
    // string/list specials
    if (op === "+") {
      if (l.t === "str" && r.t === "str") return STR(l.v + r.v);
      if (l.t === "list" && r.t === "list") return { t: "list", v: [...l.v, ...r.v] };
      if (l.t === "str" || r.t === "str") {
        this.err(`can't add '${typeName(l)}' and '${typeName(r)}' — convert with str() first, or use an f-string`, line);
      }
    }
    if (op === "*") {
      if (l.t === "str" && r.t === "int") return STR(l.v.repeat(Math.max(0, r.v)));
      if (l.t === "int" && r.t === "str") return STR(r.v.repeat(Math.max(0, l.v)));
    }

    const ln = numCoerce(l, line, op);
    const rn = numCoerce(r, line, op);
    const floatResult = l.t === "float" || r.t === "float";
    switch (op) {
      case "+": return floatResult ? FLOAT(ln + rn) : INT(ln + rn);
      case "-": return floatResult ? FLOAT(ln - rn) : INT(ln - rn);
      case "*": return floatResult ? FLOAT(ln * rn) : INT(ln * rn);
      case "/":
        if (rn === 0) this.err("division by zero", line);
        return FLOAT(ln / rn);
      case "//":
        if (rn === 0) this.err("division by zero", line);
        return floatResult ? FLOAT(Math.floor(ln / rn)) : INT(Math.floor(ln / rn));
      case "%":
        if (rn === 0) this.err("division by zero — modulo by zero", line);
        // Python modulo keeps the divisor's sign
        {
          const result = ((ln % rn) + rn) % rn;
          return floatResult ? FLOAT(result) : INT(result);
        }
      case "**": {
        const result = Math.pow(ln, rn);
        if (!floatResult && rn >= 0) return INT(result);
        return FLOAT(result);
      }
      default:
        this.err(`unknown operator '${op}'`, line);
    }
  }

  private compare(op: string, l: PyVal, r: PyVal, line: number): boolean {
    switch (op) {
      case "==": return this.equals(l, r);
      case "!=": return !this.equals(l, r);
    }
    const ln = numCoerce(l, line, op);
    const rn = numCoerce(r, line, op);
    switch (op) {
      case "<": return ln < rn;
      case "<=": return ln <= rn;
      case ">": return ln > rn;
      case ">=": return ln >= rn;
      default: this.err(`unknown comparison '${op}'`, line);
    }
  }

  private equals(l: PyVal, r: PyVal): boolean {
    if (l.t === "int" && r.t === "float") return l.v === r.v;
    if (l.t === "float" && r.t === "int") return l.v === r.v;
    if (l.t !== r.t) {
      // int/bool cross-compare
      if (l.t === "bool" && r.t === "int") return (l.v ? 1 : 0) === r.v;
      if (l.t === "int" && r.t === "bool") return l.v === (r.v ? 1 : 0);
      return false;
    }
    switch (l.t) {
      case "none": return true;
      case "str": case "int": case "float": case "bool": return l.v === (r as typeof l).v;
      case "list": {
        const rl = (r as typeof l).v;
        if (l.v.length !== rl.length) return false;
        return l.v.every((it, i) => this.equals(it, rl[i]));
      }
      case "dict": {
        const rd = (r as typeof l).v;
        if (l.v.size !== rd.size) return false;
        for (const [k, v] of l.v) {
          const other = rd.get(k);
          if (other === undefined || !this.equals(v, other)) return false;
        }
        return true;
      }
      default: return l === r;
    }
  }
}

// ─── small helpers ───────────────────────────────────────────

function one(args: PyVal[], name: string, line: number): PyVal {
  if (args.length !== 1) {
    throw new PyError(`${name}() takes exactly 1 argument (${args.length} given)`, line);
  }
  return args[0];
}

function arity(args: PyVal[], n: number, what: string, line: number) {
  if (args.length !== n) {
    throw new PyError(`${what}() takes exactly ${n} argument${n === 1 ? "" : "s"} (${args.length} given)`, line);
  }
}

function unwrapList(x: PyVal, name: string, line: number): PyVal[] {
  if (x.t === "list") return x.v;
  if (x.t === "str") return [...x.v].map(STR);
  throw new PyError(`${name}() needs a list (got '${typeName(x)}')`, line);
}

function asInt(x: PyVal, what: string, line: number): number {
  if (x.t === "int") return x.v;
  if (x.t === "bool") return x.v ? 1 : 0;
  if (x.t === "float" && Number.isInteger(x.v)) return x.v;
  throw new PyError(`${what}() needs whole numbers`, line);
}

function asNum(x: PyVal, what: string, line: number): number {
  if (x.t === "int" || x.t === "float") return x.v;
  if (x.t === "bool") return x.v ? 1 : 0;
  throw new PyError(`${what}() needs a number (got '${typeName(x)}')`, line);
}

function numCoerce(x: PyVal, line: number, op: string): number {
  if (x.t === "int" || x.t === "float") return x.v;
  if (x.t === "bool") return x.v ? 1 : 0;
  throw new PyError(`'${typeName(x)}' and numbers can't be combined with '${op}'`, line);
}

function typeName(x: PyVal): string {
  switch (x.t) {
    case "int": return "int";
    case "float": return "float";
    case "str": return "str";
    case "bool": return "bool";
    case "none": return "NoneType";
    case "list": return "list";
    case "dict": return "dict";
    case "func": return "function";
    case "module": return "module";
  }
}

function denormalizeKey(k: string): PyVal {
  if (k.startsWith("s:")) return STR(k.slice(2));
  if (k.startsWith("b:")) return BOOL(k.slice(2) === "true");
  return INT(Number(k.slice(2)));
}

export { pyRepr as __pyRepr };
