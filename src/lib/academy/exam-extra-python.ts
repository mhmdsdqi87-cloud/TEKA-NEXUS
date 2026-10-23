// TEKA NEXUS — Task 15-c-1: extra Python exam questions for the expanded
// course (modules py-m6/py-m7/py-m8). Same contract as exam-bank.ts:
// beginner level, exactly 4 options, `answer` is the correct index.
// English-only, ids continue the main bank (py-26 … py-40).
// NOTE: like exam-bank.ts, this file must NEVER be imported by client code —
// it contains answers; grading happens server-side.
import type { ExamQuestion } from "./exam-bank";

export const EXTRA_PY_QUESTIONS: ExamQuestion[] = [
  {
    id: "py-26",
    q: "What does \"a,b,c\".split(\",\") return?",
    options: ["\"a b c\"", "[\"a\", \"b\", \"c\"]", "(\"a\", \"b\", \"c\")", "abc"],
    answer: 1,
    why: "split() cuts the string at every comma and returns a LIST of the pieces.",
  },
  {
    id: "py-27",
    q: "What does \"-\".join([\"py\", \"js\", \"go\"]) return?",
    options: ["pyjs go", "py-js-go", "[\"py\", \"js\", \"go\"]", "go-js-py"],
    answer: 1,
    why: "join() glues the list items together with the separator string between each pair.",
  },
  {
    id: "py-28",
    q: "What does \"hello\".find(\"l\") return?",
    options: ["1", "2", "3", "-1"],
    answer: 1,
    why: "find() returns the position of the FIRST match — l sits at index 2 (h=0, e=1, l=2).",
  },
  {
    id: "py-29",
    q: "What does \"banana\".count(\"a\") return?",
    options: ["1", "2", "3", "6"],
    answer: 2,
    why: "banana has three a's — count() tallies how many times the substring appears.",
  },
  {
    id: "py-30",
    q: "grid = [[1, 2], [3, 4]] — what is grid[1][0]?",
    options: ["1", "2", "3", "4"],
    answer: 2,
    why: "grid[1] is the second row [3, 4]; then [0] picks its first item, 3.",
  },
  {
    id: "py-31",
    q: "Why store a team as a list of dicts instead of two parallel lists?",
    options: [
      "It runs faster",
      "Each record keeps its fields together, so data can't drift apart",
      "Dicts can hold more items",
      "Lists can't store strings",
    ],
    answer: 1,
    why: "With a dict per record, one player's name and goals always travel together — parallel lists must be updated in sync by hand.",
  },
  {
    id: "py-32",
    q: "How does linear search check whether an item is in a list?",
    options: [
      "It jumps directly to the item's position",
      "It sorts the list first, then looks",
      "It compares the target with each item in order, one by one",
      "It checks only the first and last items",
    ],
    answer: 2,
    why: "Linear search walks the list front to back, comparing every item until it finds a match.",
  },
  {
    id: "py-33",
    q: "In selection sort, what does each round of the algorithm do?",
    options: [
      "Swaps every neighbouring pair once",
      "Finds the smallest remaining item and moves it to the sorted result",
      "Deletes the smallest item",
      "Reverses the whole list",
    ],
    answer: 1,
    why: "Each pass selects the minimum of what's left and appends it to the result — after enough rounds the list is sorted.",
  },
  {
    id: "py-34",
    q: "counts = {} — what does counts[x] = counts.get(x, 0) + 1 do?",
    options: [
      "Sets counts[x] to 1 always",
      "Crashes when x is new",
      "Increases x's tally by 1, starting from 0 the first time",
      "Deletes the key x",
    ],
    answer: 2,
    why: ".get(x, 0) returns the current count (or 0 if unseen), then + 1 stores the new tally — the classic dict-counter line.",
  },
  {
    id: "py-35",
    q: "What does math.sqrt(9) return?",
    options: ["3", "3.0", "9.0", "81"],
    answer: 1,
    why: "sqrt always returns a float, even for perfect squares — so 3.0.",
  },
  {
    id: "py-36",
    q: "Which pair matches math.floor(3.9) and math.ceil(3.1)?",
    options: ["4 and 3", "3 and 4", "3 and 3", "4 and 4"],
    answer: 1,
    why: "floor rounds DOWN (3.9 → 3), ceil rounds UP (3.1 → 4).",
  },
  {
    id: "py-37",
    q: "Why re-ask for input inside a while loop instead of calling int(input()) once?",
    options: [
      "int() only works inside loops",
      "The loop turns a crash into a conversation — bad input gets asked again",
      "It makes the program faster",
      "input() forgets values outside loops",
    ],
    answer: 1,
    why: "int(\"abc\") would crash; checking with .isdigit() and re-asking keeps the program alive until the input is usable.",
  },
  {
    id: "py-38",
    q: "What stops a recursive function from calling itself forever?",
    options: [
      "The return type",
      "The base case — a condition where it answers without calling itself",
      "The print() calls",
      "Recursive functions always run forever",
    ],
    answer: 1,
    why: "The base case (e.g. factorial(1) = 1 or countdown stopping at 0) is the exit that ends the self-calls.",
  },
  {
    id: "py-39",
    q: "What does random.seed(42) do in a guessing game?",
    options: [
      "Makes the random numbers more random",
      "Speeds up randint()",
      "Makes the random sequence identical every run — same secret each time",
      "Limits the game to 42 guesses",
    ],
    answer: 2,
    why: "A fixed seed replays the exact same \"random\" results — essential for testable, gradable games.",
  },
  {
    id: "py-40",
    q: "In a while True game loop, how do you exit after a correct guess?",
    options: [
      "return the loop",
      "Call break inside the winning branch",
      "Set while to False",
      "Use continue",
    ],
    answer: 1,
    why: "while True runs forever until a break executes — the winning branch prints the celebration and breaks.",
  },
];
