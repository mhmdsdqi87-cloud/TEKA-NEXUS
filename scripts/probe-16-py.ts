// Task 16-c-1 — quick pylite feature probes for modules m9–m12.
// Modes: "ok" → must run and output must contain every string; "err" → must raise a friendly error.
// Run: cd /home/z/my-project && bun scripts/probe-16-py.ts
import { runPython } from "../src/lib/academy/pylite";

type Probe = { name: string; code: string; stdin?: string[]; mode: "ok" | "err"; contains?: string[] };

const probes: Probe[] = [
  // ── m9: text processing ──
  { name: "strip()", mode: "ok", code: `print("   hi there   ".strip())`, contains: ["hi there"] },
  { name: "chained strip().lower()", mode: "ok", code: `print("  HeLLo  ".strip().lower())`, contains: ["hello"] },
  { name: "startswith", mode: "ok", code: `print("teka.png".startswith("teka"))\nprint("teka.png".startswith("png"))`, contains: ["True", "False"] },
  { name: "endswith", mode: "ok", code: `print("notes.txt".endswith(".txt"))\nprint("notes.txt".endswith(".md"))`, contains: ["True", "False"] },
  { name: "for ch in string", mode: "ok", code: `hits = 0\nfor ch in "aXaXa":\n    if ch == "a":\n        hits += 1\nprint(hits)`, contains: ["3"] },
  { name: "find after replace chain", mode: "ok", code: `s = "a-b-c".replace("-", "")\nprint(s.find("c"))`, contains: ["2"] },
  // ── m10: stacks & queues & records ──
  { name: "stack pop() no-arg", mode: "ok", code: `stack = [1, 2, 3]\nstack.append(4)\nprint(stack.pop())\nprint(stack.pop())\nprint(stack)`, contains: ["4", "3", "[1, 2]"] },
  { name: "queue pop(0)", mode: "ok", code: `queue = ["a", "b", "c"]\nprint(queue.pop(0))\nprint(queue)`, contains: ["a", "['b', 'c']"] },
  { name: "insert(0, x)", mode: "ok", code: `a = [2, 3]\na.insert(0, 1)\nprint(a)`, contains: ["[1, 2, 3]"] },
  { name: "len(dict)", mode: "ok", code: `d = {"a": 1, "b": 2}\nprint(len(d))`, contains: ["2"] },
  { name: "dict.keys() list", mode: "ok", code: `d = {"x": 1, "y": 2}\nprint(d.keys())`, contains: ["['x', 'y']"] },
  { name: "dict.values() list", mode: "ok", code: `d = {"x": 10, "y": 20}\nprint(d.values())`, contains: ["[10, 20]"] },
  { name: "for k in d + d[k] total", mode: "ok", code: `stock = {"pen": 3, "pad": 4}\ntotal = 0\nfor k in stock:\n    total += stock[k]\nprint(total)`, contains: ["7"] },
  { name: "for item in d.items() + item[0]/item[1]", mode: "ok", code: `d = {"a": 5}\nfor item in d.items():\n    print(item[0])\n    print(item[1])`, contains: ["a", "5"] },
  { name: "list of dicts deep read opts[2]", mode: "ok", code: `quiz = [{"q": "1+1?", "options": ["2", "3", "4"], "answer": 0}]\nprint(quiz[0]["options"][2])\nprint(quiz[0]["answer"])`, contains: ["4", "0"] },
  { name: "dict of dicts READ d[a][b]", mode: "ok", code: `rooms = {"hall": {"desc": "big room"}}\nprint(rooms["hall"]["desc"])`, contains: ["big room"] },
  { name: "dict of dicts WRITE d[a][b]=v (documented: avoid in lessons)", mode: "ok", code: `rooms = {"hall": {}}\nrooms["hall"]["x"] = 1\nprint(rooms["hall"]["x"])`, contains: ["1"] },
  { name: "build inner dict then assign outer key", mode: "ok", code: `inv = {}\nslot = {"price": 5, "qty": 2}\ninv["bolt"] = slot\nprint(inv["bolt"]["price"])`, contains: ["5"] },
  // ── in operator (str/list/dict) ──
  { name: "in dict", mode: "ok", code: `seen = {"cat": 2}\nprint("cat" in seen)\nprint("dog" in seen)`, contains: ["True", "False"] },
  { name: "in string", mode: "ok", code: `print("ell" in "hello")\nprint("z" in "hello")`, contains: ["True", "False"] },
  { name: "in list", mode: "ok", code: `print(3 in [1, 2, 3])\nprint(9 in [1, 2, 3])`, contains: ["True", "False"] },
  { name: "not in", mode: "ok", code: `print("dog" not in seen)`.replace("seen", '{"cat": 2}'), contains: ["True"] },
  // ── misc helpers ──
  { name: "str(42)", mode: "ok", code: `print(str(42) + "!")`, contains: ["42!"] },
  { name: "string repetition '-' * 10", mode: "ok", code: `print("-" * 10)`, contains: ["----------"] },
  { name: "sum(list)", mode: "ok", code: `print(sum([1, 2, 3]))`, contains: ["6"] },
  { name: "max/min numbers", mode: "ok", code: `print(max([3, 9, 2]))\nprint(min([3, 9, 2]))`, contains: ["9", "2"] },
  { name: "list[-1] negative index read", mode: "ok", code: `a = [10, 20, 30]\nprint(a[-1])`, contains: ["30"] },
  { name: "print multi-arg + sep", mode: "ok", code: `print("a", "b", sep="-")`, contains: ["a-b"] },
  { name: "dict insertion order", mode: "ok", code: `d = {}\nd["b"] = 1\nd["a"] = 2\nfor k in d:\n    print(k)`, contains: ["b", "a"] },
  { name: "counter d[w] = d.get(w, 0) + 1", mode: "ok", code: `counts = {}\nfor w in ["go", "go", "stop"]:\n    counts[w] = counts.get(w, 0) + 1\nprint(counts["go"])\nprint(counts["stop"])`, contains: ["2", "1"] },
  { name: "% and // on ints", mode: "ok", code: `print(17 // 5)\nprint(17 % 5)`, contains: ["3", "2"] },
  { name: "continue in while", mode: "ok", code: `n = 0\nwhile n < 5:\n    n += 1\n    if n == 2:\n        continue\n    print(n)`, contains: ["1", "3", "4", "5"] },
  { name: "while lo <= hi (binary search shape)", mode: "ok", code: `a = [1, 3, 5, 7]\nlo = 0\nhi = len(a) - 1\ntarget = 7\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if a[mid] == target:\n        print(mid)\n        break\n    elif a[mid] < target:\n        lo = mid + 1\n    else:\n        hi = mid - 1`, contains: ["3"] },
  { name: "input().strip() chain", mode: "ok", code: `x = input().strip()\nprint(x.upper())`, stdin: ["  hi  "], contains: ["HI"] },
  { name: "int(x, base) (must fail → use % // loops)", mode: "err", code: `print(int("101", 2))` },
  { name: "slicing (still must fail)", mode: "err", code: `print("abcdef"[1:3])` },
  { name: "list item write (still must fail)", mode: "err", code: `a = [1, 2]\na[0] = 9` },
  { name: "nested LIST write (still must fail)", mode: "err", code: `g = [[1], [2]]\ng[0][0] = 9` },
];

let pass = 0;
let fail = 0;
for (const p of probes) {
  const r = runPython(p.code, p.stdin ?? []);
  let ok: boolean;
  let detail = "";
  if (p.mode === "ok") {
    ok = r.ok && (p.contains ?? []).every((c) => r.output.join("\n").includes(c));
    if (!ok) detail = r.ok ? `missing [${p.contains!.join(" | ")}] in [${r.output.join(" | ")}]` : `error: ${r.error}`;
  } else {
    ok = !r.ok;
    detail = r.ok ? "expected error but ran" : `✓ errors: ${r.error.slice(0, 90)}`;
  }
  if (ok) pass += 1;
  else fail += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${p.name}${detail ? ` — ${detail}` : ""}`);
}
console.log(`\n${pass}/${pass + fail} probes passed`);
if (fail > 0) process.exit(1);
