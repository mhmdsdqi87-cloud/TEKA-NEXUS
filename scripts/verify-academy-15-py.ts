// Task 15-c-1 verification harness — Python course expansion (modules m6/m7/m8).
// 1) Empirical pylite feature probes (the facts the syllabus decisions rest on).
// 2) Runs EVERY challenge test (incl. hidden) of py-m6/py-m7/py-m8 lessons
//    against the shipped solutions, mirroring the app's grading
//    (right-trim per line, trailing blank lines ignored).
// Run: cd /home/z/my-project && bun scripts/verify-academy-15-py.ts
import { runPython } from "../src/lib/academy/pylite";
import { pythonCourse } from "../src/lib/academy/course-python";

// ─── grading helpers (mirror src/components/academy/py-runner.tsx) ──
function toStdinLines(stdin?: string): string[] {
  if (!stdin) return [];
  const lines = stdin.split("\n");
  if (lines.length && lines[lines.length - 1] === "") lines.pop();
  return lines;
}

function normalizeOut(s: string): string {
  return s
    .split("\n")
    .map((l) => l.replace(/\s+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "");
}

// ─── 1) pylite feature probes ─────────────────────────────────────
type Probe = {
  name: string;
  code: string;
  stdin?: string[];
  /** "ok"  → code must run; "err" → code must raise a friendly error. */
  mode: "ok" | "err";
  /** when mode==="ok", all of these must appear in the output */
  contains?: string[];
  note?: string;
};

const probes: Probe[] = [
  // — m6-l1 string methods —
  { name: "str.split(sep)", mode: "ok", code: `print("a,b,c".split(","))`, contains: ["['a', 'b', 'c']"] },
  { name: "str.split() whitespace", mode: "ok", code: `print("to be or not".split())`, contains: ["['to', 'be', 'or', 'not']"] },
  { name: "str.join", mode: "ok", code: `print("-".join(["a", "b", "c"]))`, contains: ["a-b-c"] },
  { name: "str.replace", mode: "ok", code: `print("cat cat".replace("cat", "dog"))`, contains: ["dog dog"] },
  { name: "str.find", mode: "ok", code: `print("hello".find("l"))`, contains: ["2"] },
  { name: "str.find missing → -1", mode: "ok", code: `print("hello".find("z"))`, contains: ["-1"] },
  { name: "str.count", mode: "ok", code: `print("banana".count("a"))`, contains: ["3"] },
  { name: "str.isdigit true/false", mode: "ok", code: `print("123".isdigit())\nprint("12a".isdigit())`, contains: ["True", "False"] },
  // — m6-l2: slicing must FAIL → fallback to nested lists lesson —
  { name: "slicing x[1:3] (must be unsupported)", mode: "err", code: `s = "hello"\nprint(s[1:3])` },
  // — m6-l2 nested lists —
  { name: "nested list read grid[r][c]", mode: "ok", code: `grid = [[1, 2], [3, 4]]\nprint(grid[1][0])`, contains: ["3"] },
  { name: "nested list WRITE grid[r][c] = x (must fail → grids are read-only in lessons)", mode: "err", code: `grid = [[1, 2], [3, 4]]\ngrid[0][1] = 9` },
  // — m6-l3 list of dicts —
  { name: "list of dicts access", mode: "ok", code: `team = [{"name": "Maya", "goals": 12}]\nprint(team[0]["name"])\ng = team[0]["goals"]\nprint(g)`, contains: ["Maya", "12"] },
  { name: "dict.get(key, default)", mode: "ok", code: `d = {"a": 1}\nprint(d.get("a", 0) + d.get("zz", 0))`, contains: ["1"] },
  { name: "for k in dict (keys)", mode: "ok", code: `d = {"b": 1, "a": 2}\nfor k in d:\n    print(k)`, contains: ["b", "a"] },
  // — m6-l4 f-string quote ban (compute into a variable first) —
  { name: "f-string with quotes inside (must fail)", mode: "err", code: `c = [{"p": "5"}]\nprint(f"{c[0]['p']}")` },
  // — m7-l2 sorting: NO item assignment on lists → selection-by-extraction (while+for+remove) instead of swaps —
  { name: "list item assignment a[0] = v (must fail → no bubble-swap; selection-by-extraction used)", mode: "err", code: `a = [2, 1]\na[0] = a[1]` },
  { name: "selection sort by extraction (while + for + append/remove)", mode: "ok", code: `pile = [40, 10, 30]\nresult = []\nwhile len(pile) > 0:\n    smallest = pile[0]\n    for n in pile:\n        if n < smallest:\n            smallest = n\n    result.append(smallest)\n    pile.remove(smallest)\nprint(result)`, contains: ["[10, 30, 40]"] },
  { name: "sorted() on numbers", mode: "ok", code: `print(sorted([3, 1, 2]))`, contains: ["[1, 2, 3]"] },
  { name: "sorted() on strings (must fail → avoid in lessons)", mode: "err", code: `print(sorted(["b", "a"]))` },
  // — m8-l1 math module members —
  { name: "math.sqrt", mode: "ok", code: `import math\nprint(math.sqrt(9))`, contains: ["3.0"] },
  { name: "math.pi value", mode: "ok", code: `import math\nprint(round(math.pi, 2))`, contains: ["3.14"] },
  { name: "math.floor", mode: "ok", code: `import math\nprint(math.floor(3.9))`, contains: ["3"] },
  { name: "math.ceil", mode: "ok", code: `import math\nprint(math.ceil(3.1))`, contains: ["4"] },
  { name: "math.pow", mode: "ok", code: `import math\nprint(math.pow(2, 3))`, contains: ["8.0"] },
  { name: "f-string format spec {x:.2f} (must fail → use round())", mode: "err", code: `x = 1.5\nprint(f"{x:.2f}")` },
  // — m8-l2 validation loop building blocks —
  { name: "while + break + input lines", mode: "ok", code: `while True:\n    x = input()\n    if x == "go":\n        break\nprint("done")`, stdin: ["a", "go"], contains: ["done"] },
  // — m8-l3 recursion —
  { name: "recursive def calls itself", mode: "ok", code: `def down(n):\n    if n == 0:\n        return\n    print(n)\n    down(n - 1)\ndown(3)`, contains: ["3", "2", "1"] },
  { name: "recursive factorial", mode: "ok", code: `def f(n):\n    if n <= 1:\n        return 1\n    return n * f(n - 1)\nprint(f(6))`, contains: ["720"] },
  // — m8-l4 seeded randomness —
  { name: "random.seed determinism (same draw twice)", mode: "ok", code: `import random\nrandom.seed(42)\nprint(random.randint(1, 20))`, contains: ["13"] },
  { name: "random.seed(42) → the Number Hunt secret (used by py-m8-l4 tests)", mode: "ok", code: `import random\nrandom.seed(42)\nprint(random.randint(1, 20))`, contains: ["13"] },
  { name: "enumerate/zip (must fail → not used)", mode: "err", code: `print(enumerate(["a"]))` },
];

let probePass = 0;
let probeFail = 0;
console.log("════════ 1) PYLITE FEATURE PROBES ════════");
for (const p of probes) {
  const r = runPython(p.code, p.stdin ?? []);
  let ok: boolean;
  let detail = "";
  if (p.mode === "ok") {
    ok = r.ok && (p.contains ?? []).every((c) => r.ok && r.output.join("\n").includes(c));
    if (!ok) detail = r.ok ? `missing ${p.contains!.join(" | ")} in [${r.output.join(" | ")}]` : r.error;
  } else {
    ok = !r.ok;
    detail = r.ok ? "expected an error but code ran" : `✓ errors: ${r.error.slice(0, 80)}`;
  }
  if (ok) probePass += 1;
  else probeFail += 1;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${p.name}${detail ? ` — ${detail}` : ""}`);
  if (p.name.startsWith("random.seed(42) →") && r.ok) {
    console.log(`        ↳ seeded secret: ${r.output.join(", ")} (py-m8-l4 Number Hunt tests rely on this)`);
  }
}

// ─── 2) challenge tests for modules m6/m7/m8 ──────────────────────
type TestRow = { lesson: string; test: string; hidden: boolean; ok: boolean; detail: string };

const rows: TestRow[] = [];
let checked = 0;
const targetModules = new Set(["py-m6", "py-m7", "py-m8"]);
const foundModules = new Set<string>();

for (const mod of pythonCourse.modules) {
  if (!targetModules.has(mod.id)) continue;
  foundModules.add(mod.id);
  for (const lesson of mod.lessons) {
    const challenge = lesson.steps.find((s) => s.kind === "challenge");
    if (!challenge || challenge.kind !== "challenge" || challenge.check.kind !== "py") {
      rows.push({ lesson: `${mod.id}/${lesson.id}`, test: "challenge", hidden: false, ok: false, detail: "no py challenge step found" });
      continue;
    }
    for (const [ti, t] of challenge.check.tests.entries()) {
      const label = t.hidden ? `test${ti + 1} (hidden)` : `test${ti + 1}`;
      const r = runPython(challenge.solution, toStdinLines(t.stdin));
      checked += 1;
      if (!r.ok) {
        rows.push({ lesson: lesson.id, test: label, hidden: !!t.hidden, ok: false, detail: `error: ${r.error} (line ${r.line})` });
        continue;
      }
      const got = normalizeOut(r.output.join("\n"));
      const want = normalizeOut(t.expect);
      if (got === want) {
        rows.push({ lesson: lesson.id, test: label, hidden: !!t.hidden, ok: true, detail: "" });
      } else {
        rows.push({
          lesson: lesson.id,
          test: label,
          hidden: !!t.hidden,
          ok: false,
          detail: `WANT: ${JSON.stringify(want)}  GOT: ${JSON.stringify(got)}`,
        });
      }
      // sample must match the first non-hidden test exactly
      if (ti === 0 && !t.hidden && challenge.sample) {
        const sIn = toStdinLines(challenge.sample.stdin);
        const sGot = challenge.sample.stdin === undefined ? undefined : sIn;
        const sameStdin = JSON.stringify(sGot ?? []) === JSON.stringify(toStdinLines(t.stdin));
        const sameExpect = normalizeOut(challenge.sample.expect) === normalizeOut(t.expect);
        if (!sameStdin || !sameExpect) {
          rows.push({ lesson: lesson.id, test: "sample mirrors test1", hidden: false, ok: false, detail: `sample must equal first non-hidden test (stdin match: ${sameStdin}, expect match: ${sameExpect})` });
        }
      }
    }
  }
}

console.log("\n════════ 2) CHALLENGE TESTS (solutions vs graded expects) ════════");
console.log(`  modules found: ${[...foundModules].join(", ") || "NONE — course not expanded yet"}`);
const byLesson = new Map<string, TestRow[]>();
for (const row of rows) {
  if (!byLesson.has(row.lesson)) byLesson.set(row.lesson, []);
  byLesson.get(row.lesson)!.push(row);
}
let lessonPass = 0;
let lessonTotal = 0;
for (const [lesson, rws] of byLesson) {
  const ok = rws.every((r) => r.ok);
  lessonTotal += 1;
  if (ok) lessonPass += 1;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${lesson}`);
  for (const r of rws) {
    if (!r.ok) console.log(`        ✗ ${r.test}: ${r.detail}`);
  }
}
if (foundModules.size < 3) {
  lessonTotal += 3 - foundModules.size;
  for (const m of ["py-m6", "py-m7", "py-m8"]) {
    if (!foundModules.has(m)) console.log(`  MISSING  ${m} (not in course-python.ts yet)`);
  }
}

const pass = probeFail === 0 && rows.every((r) => r.ok) && foundModules.size === 3;
console.log("\n════════ SUMMARY ════════");
console.log(`  probes:        ${probePass}/${probePass + probeFail} passed`);
console.log(`  tests:         ${rows.filter((r) => r.ok).length}/${checked} passed`);
console.log(`  lessons:       ${lessonPass}/${lessonTotal} fully passing`);
console.log(`  overall:       ${pass ? "✅ ALL GREEN" : "❌ FAILURES — fix above"}`);
if (!pass) process.exit(1);
