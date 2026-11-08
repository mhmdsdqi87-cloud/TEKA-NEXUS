// TEKA NEXUS — tests for the code-evaluation engine (pylite).
// pylite is the sandboxed Python-subset interpreter that powers the Academy
// playground and the auto-graded lesson challenges. These tests pin down the
// exact behaviors learners rely on: correct execution, friendly errors with
// line numbers, and the safety budgets (infinite loop / deep recursion).

import { describe, expect, test } from "bun:test";

import { runPython } from "@/lib/academy/pylite";

describe("pylite — correct programs", () => {
  test("print + utf-8 (Persian output)", () => {
    const r = runPython(`print("سلام دنیا")`);
    expect(r).toEqual({ ok: true, output: ["سلام دنیا"] });
  });

  test("arithmetic and variables", () => {
    const r = runPython(`x = 6 * 7\nprint(x)`);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.output).toEqual(["42"]);
  });

  test("f-strings", () => {
    const r = runPython(`name = "مهدی"\nage = 19\nprint(f"{name} is {age}")`);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.output).toEqual(["مهدی is 19"]);
  });

  test("for + range accumulation", () => {
    const r = runPython(`total = 0\nfor i in range(5):\n    total += i\nprint(total)`);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.output).toEqual(["10"]);
  });

  test("while + break", () => {
    const r = runPython(`i = 0\nwhile True:\n    i += 1\n    if i >= 4:\n        break\nprint(i)`);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.output).toEqual(["4"]);
  });

  test("def + return", () => {
    const r = runPython(`def add(a, b):\n    return a + b\nprint(add(2, 3))`);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.output).toEqual(["5"]);
  });

  test("lists + sorted / max / abs", () => {
    const r = runPython(`nums = [3, 1, 2]\nprint(sorted(nums), max(nums), abs(-7))`);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.output).toEqual(["[1, 2, 3] 3 7"]);
  });

  test("dicts + len + sum(values)", () => {
    const r = runPython(`d = {"a": 1, "b": 2}\nd["c"] = 3\nprint(len(d), sum(d.values()))`);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.output).toEqual(["3 6"]);
  });

  test("input() consumes stdin lines in order", () => {
    const r = runPython(`name = input()\nprint("salam", name)`, ["علی"]);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.output).toEqual(["salam علی"]);
  });

  test("if / elif / else ladder (lesson-shipping shape)", () => {
    const code = [
      "total = int(input())",
      "if total >= 500:",
      "    ship = 0",
      "elif total >= 200:",
      "    ship = 20",
      "else:",
      "    ship = 40",
      'print(f"Total: {total}")',
      'print(f"Shipping: {ship}")',
    ].join("\n");
    const small = runPython(code, ["150"]);
    expect(small.ok).toBe(true);
    if (small.ok) expect(small.output).toEqual(["Total: 150", "Shipping: 40"]);
    const mid = runPython(code, ["350"]);
    expect(mid.ok).toBe(true);
    if (mid.ok) expect(mid.output).toEqual(["Total: 350", "Shipping: 20"]);
    const big = runPython(code, ["900"]);
    expect(big.ok).toBe(true);
    if (big.ok) expect(big.output).toEqual(["Total: 900", "Shipping: 0"]);
  });
});

describe("pylite — friendly, line-numbered errors", () => {
  test("syntax error reports the offending line", () => {
    const r = runPython(`x = 1\nprint("hi"\n`);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.line).toBe(3);
      expect(r.error).toContain("expected )");
    }
  });

  test("undefined variable names the identifier", () => {
    const r = runPython(`print(namashenas)\nprint("after")`);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.line).toBe(1);
      expect(r.error).toContain("namashenas");
    }
  });

  test("division by zero never crashes the host", () => {
    const r = runPython(`y = 10 / 0`);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("division by zero");
  });
});

describe("pylite — sandbox safety budgets", () => {
  test("infinite loop hits the step budget with a helpful message", () => {
    const t0 = Date.now();
    const r = runPython("i = 0\nwhile True:\n    i = i + 1");
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.error).toContain("too long");
      expect(r.line).toBe(2);
    }
    // Budget enforcement must be fast — the host thread is shared with the UI.
    expect(Date.now() - t0).toBeLessThan(5000);
  });

  test("infinite recursion is detected, not a stack overflow", () => {
    const r = runPython("def f(n):\n    return f(n)\nf(1)");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("too deep");
  });
});
