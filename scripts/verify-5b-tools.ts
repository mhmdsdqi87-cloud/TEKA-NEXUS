// Task 5-b verification harness — runs pylite against every Python snippet
// used in academy-portal/tools content (bug cases buggy+fixed, predict Qs).
// Kept in scripts/ for reproducibility. Run: bun scripts/verify-5b-tools.ts
import { runPython } from "../src/lib/academy/pylite";

const cases: { name: string; code: string; stdin?: string[] }[] = [
  // ── Bug Detective: BUGGY versions (should error or produce wrong output) ──
  {
    name: "bug-042-buggy (off-by-one, expect crash)",
    code: `tickets = ["A1", "A2", "A3", "A4"]
n = len(tickets)
i = 0
while i <= n:
    print(tickets[i])
    i = i + 1`,
  },
  {
    name: "bug-017-buggy (wrong-operator //)",
    code: `apples = 5
friends = 2
each = apples // friends
leftover = apples % friends
print(f"Each friend gets {each} apples")
print(f"Leftover: {leftover}")`,
  },
  {
    name: "bug-073-buggy (aliasing mutation)",
    code: `cart = ["book", "pen"]
backup = cart
backup.append("phone")
print(f"Cart: {cart}")
print(f"Backup: {backup}")`,
  },
  {
    name: "bug-008-buggy (type-confusion input)",
    code: `age = input()
next_year = age + 1
print(f"Next year you'll be {next_year}")`,
    stdin: ["12"],
  },
  {
    name: "bug-106-buggy (infinite loop, expect output-limit error)",
    code: `launch = 3
while launch > 0:
    print(f"T-minus {launch}\u2026")
print("Liftoff! \u{1F680}")`,
  },
  // ── Bug Detective: FIXED versions (must produce exact expected output) ──
  {
    name: "bug-042-fixed",
    code: `tickets = ["A1", "A2", "A3", "A4"]
n = len(tickets)
i = 0
while i < n:
    print(tickets[i])
    i = i + 1`,
  },
  {
    name: "bug-017-fixed",
    code: `apples = 5
friends = 2
each = apples / friends
leftover = apples % friends
print(f"Each friend gets {each} apples")
print(f"Leftover: {leftover}")`,
  },
  {
    name: "bug-073-fixed",
    code: `cart = ["book", "pen"]
backup = cart.copy()
backup.append("phone")
print(f"Cart: {cart}")
print(f"Backup: {backup}")`,
  },
  {
    name: "bug-008-fixed",
    code: `age = int(input())
next_year = age + 1
print(f"Next year you'll be {next_year}")`,
    stdin: ["12"],
  },
  {
    name: "bug-106-fixed",
    code: `launch = 3
while launch > 0:
    print(f"T-minus {launch}\u2026")
    launch = launch - 1
print("Liftoff! \u{1F680}")`,
  },
  // ── Predict the Output: 8 Python questions ──
  {
    name: "pred-P1",
    code: `a = 7
b = 2
print(a // b)
print(a % b)`,
  },
  {
    name: "pred-P2",
    code: `word = "ha"
print(word * 3)
print(len(word) * 2)`,
  },
  {
    name: "pred-P3",
    code: `total = 0
for n in [2, 4, 6]:
    total = total + n
print(total)
print(n)`,
  },
  {
    name: "pred-P4",
    code: `temp = 31
if temp > 30:
    print("Hot day")
elif temp > 20:
    print("Nice day")
else:
    print("Cold day")`,
  },
  {
    name: "pred-P5",
    code: `nums = [3, 1, 2]
nums.append(9)
nums.sort()
print(nums)
print(nums[-1])`,
  },
  {
    name: "pred-P6",
    code: `ages = {"Sara": 14, "Ali": 15}
ages["Ali"] = 16
print(ages["Ali"])
print(len(ages))`,
  },
  {
    name: "pred-P7",
    code: `i = 1
while True:
    if i * i > 20:
        break
    print(i * i)
    i = i + 1`,
  },
  {
    name: "pred-P8",
    code: `def shout(word):
    return word.upper() + "!"

msg = shout("go")
print(msg)
print(shout(msg))`,
  },
];

for (const c of cases) {
  const r = runPython(c.code, c.stdin ?? []);
  if (r.ok) console.log(`OK   ${c.name}\n     ${JSON.stringify(r.output)}`);
  else console.log(`ERR  ${c.name}\n     ${r.error}`);
}
