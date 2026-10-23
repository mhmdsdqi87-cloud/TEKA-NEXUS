// TEKA NEXUS — TEKA Academy SECURE EXAM question bank. SERVER-ONLY.
//
// ⚠️ This module must NEVER be imported by a client component: it contains the
// correct answers. Only API routes under src/app/api/academy/exam/* may import
// it. The GET exam response strips `answer` and `why` — those are graded and
// revealed server-side only.
//
// Beginner-level, practical understanding. ids are stable (grading reads by id
// from the exam record), options are exactly 4, `answer` is the option index.

import { EXTRA_PY_QUESTIONS } from "./exam-extra-python";
import { EXTRA_HT_QUESTIONS } from "./exam-extra-html";

export type ExamQuestion = {
  /** Stable id, e.g. "py-07" / "ht-12". */
  id: string;
  q: string;
  options: [string, string, string, string];
  /** Index of the correct option (0-3). */
  answer: number;
  /** One-line explanation shown after grading. */
  why: string;
};

// ─── Python bank (print / variables / f-strings / if / loops / lists / functions)

export const PYTHON_EXAM_BANK: ExamQuestion[] = [
  {
    id: "py-01",
    q: "Which line prints Hello! to the screen?",
    options: ["echo(\"Hello!\")", "print(\"Hello!\")", "console.log(\"Hello!\")", "show \"Hello!\""],
    answer: 1,
    why: "print() is Python's built-in function for writing text to the output.",
  },
  {
    id: "py-02",
    q: "What does this code output?\n\nname = \"Ada\"\nprint(f\"Hi, {name}!\")",
    options: ["Hi, {name}!", "Hi, name!", "Hi, Ada!", "f\"Hi, Ada!\""],
    answer: 2,
    why: "The f prefix turns the string into an f-string, so {name} is replaced by the variable's value.",
  },
  {
    id: "py-03",
    q: "Which name is a VALID Python variable name?",
    options: ["2fast", "my-score", "user_name", "class"],
    answer: 2,
    why: "Names may contain letters, digits and underscores (but can't start with a digit), and can't be keywords like class.",
  },
  {
    id: "py-04",
    q: "What is the value of x after this runs?\n\nx = 7\nx = x + 3",
    options: ["7", "10", "3", "73"],
    answer: 1,
    why: "x + 3 is computed first (10) and then stored back into x.",
  },
  {
    id: "py-05",
    q: "Which type does input() always return?",
    options: ["int", "float", "str (text)", "bool"],
    answer: 2,
    why: "input() returns text (a string) — wrap it with int() to work with numbers.",
  },
  {
    id: "py-06",
    q: "How do you write a comment that Python ignores?",
    options: ["// like this", "# like this", "<!-- like this -->", "/* like this */"],
    answer: 1,
    why: "Everything after a # on a line is a comment.",
  },
  {
    id: "py-07",
    q: "What does this print?\n\nage = 20\nif age >= 18:\n    print(\"adult\")\nelse:\n    print(\"kid\")",
    options: ["kid", "adult", "adult kid", "Nothing — it's an error"],
    answer: 1,
    why: "20 >= 18 is True, so the if branch runs and prints adult.",
  },
  {
    id: "py-08",
    q: "In Python, how do you mark the block of code that belongs to an if?",
    options: ["Curly braces { }", "Parentheses ( )", "Indentation (spaces)", "The keyword end"],
    answer: 2,
    why: "Python uses indentation to group statements — the indented lines belong to the if.",
  },
  {
    id: "py-09",
    q: "What does this loop print?\n\nfor i in range(3):\n    print(i)",
    options: ["1 2 3", "0 1 2", "0 1 2 3", "3 3 3"],
    answer: 1,
    why: "range(3) yields 0, 1, 2 — it starts at 0 and stops before the end value.",
  },
  {
    id: "py-10",
    q: "How many times does a while loop with the condition `while energy > 0` repeat if energy starts at 2 and the body decreases it by 1 each pass?",
    options: ["1 time", "2 times", "3 times", "Forever"],
    answer: 1,
    why: "The body runs while the condition is true: energy = 2, then 1 — two passes, then it stops at 0.",
  },
  {
    id: "py-11",
    q: "Which keyword immediately exits a loop?",
    options: ["stop", "exit", "break", "return"],
    answer: 2,
    why: "break jumps out of the nearest enclosing loop right away.",
  },
  {
    id: "py-12",
    q: "What is `len([\"a\", \"b\", \"c\"])`?",
    options: ["2", "3", "4", "\"abc\""],
    answer: 1,
    why: "len() returns the number of items in the list — here 3.",
  },
  {
    id: "py-13",
    q: "How do you get the FIRST item of `nums = [10, 20, 30]`?",
    options: ["nums[1]", "nums[0]", "nums.first", "nums(0)"],
    answer: 1,
    why: "Python lists are zero-indexed: the first item is at index 0.",
  },
  {
    id: "py-14",
    q: "What does `nums.append(4)` do to the list `nums`?",
    options: ["Replaces the last item with 4", "Adds 4 to the end of the list", "Inserts 4 at the start", "Removes the number 4"],
    answer: 1,
    why: "append() adds a new item at the end of the list.",
  },
  {
    id: "py-15",
    q: "What does this print?\n\nletters = [\"x\", \"y\", \"z\"]\nprint(letters[-1])",
    options: ["x", "y", "z", "Error"],
    answer: 2,
    why: "Negative indexes count from the end: -1 is the last item, z.",
  },
  {
    id: "py-16",
    q: "Which keyword starts a function definition?",
    options: ["func", "function", "def", "define"],
    answer: 2,
    why: "Functions are defined with def, e.g. def greet():",
  },
  {
    id: "py-17",
    q: "What does this print?\n\ndef double(n):\n    return n * 2\n\nprint(double(5))",
    options: ["5", "10", "25", "None"],
    answer: 1,
    why: "double(5) returns 5 * 2 = 10, which print() then outputs.",
  },
  {
    id: "py-18",
    q: "What happens if a function has no return statement?",
    options: ["It returns None", "It returns 0", "It returns an empty string", "Python raises an error"],
    answer: 0,
    why: "Functions without return give back None by default.",
  },
  {
    id: "py-19",
    q: "What does this print?\n\nprint(f\"{3 + 4}\")",
    options: ["{3 + 4}", "3 + 4", "7", "34"],
    answer: 2,
    why: "Inside an f-string the expression is evaluated first, so 3 + 4 becomes 7.",
  },
  {
    id: "py-20",
    q: "Which comparison checks whether a value is EQUAL to 5?",
    options: ["x = 5", "x == 5", "x === 5", "x equals 5"],
    answer: 1,
    why: "= assigns a value; == compares two values.",
  },
  {
    id: "py-21",
    q: "What is the output?\n\nfor c in \"hi\":\n    print(c)",
    options: ["hi", "h then i (two lines)", "\"hi\"", "Error"],
    answer: 1,
    why: "Looping over a string yields one character at a time: first h, then i.",
  },
  {
    id: "py-22",
    q: "Which line correctly turns the text \"12\" into the number 12?",
    options: ["int(\"12\")", "str(12)", "number(\"12\")", "\"12\".to_int()"],
    answer: 0,
    why: "int() converts a string of digits into an integer.",
  },
  {
    id: "py-23",
    q: "What does this print?\n\nx = 10\nif x > 5 and x < 20:\n    print(\"middle\")",
    options: ["middle", "Nothing", "True", "Error — `and` is not valid"],
    answer: 0,
    why: "Both conditions are true (10 > 5 and 10 < 20), so the branch runs.",
  },
  {
    id: "py-24",
    q: "What does `print(type(3.0))` show?",
    options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'num'>"],
    answer: 1,
    why: "3.0 has a decimal point, so it is a float.",
  },
  {
    id: "py-25",
    q: "How do you read the LAST item of `names = [\"a\", \"b\", \"c\"]` using a negative index?",
    options: ["names[-3]", "names[0]", "names[-1]", "names[last]"],
    answer: 2,
    why: "Index -1 always points at the last item of a list.",
  },
  // Task 15 expansion — modules m6-m8 (Going Deeper / Algorithms / Level Up)
  ...EXTRA_PY_QUESTIONS,
];

// ─── HTML bank (structure / tags / links / lists / css basics / selectors)

export const HTML_EXAM_BANK: ExamQuestion[] = [
  {
    id: "ht-01",
    q: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "HyperText Markup Language", "Home Tool Markup Language", "Hyperlink and Text Management Language"],
    answer: 1,
    why: "HTML = HyperText Markup Language — the structure language of the web.",
  },
  {
    id: "ht-02",
    q: "Which tag holds the VISIBLE content of a page?",
    options: ["<head>", "<body>", "<html>", "<title>"],
    answer: 1,
    why: "Everything the user sees lives inside <body>; <head> holds metadata.",
  },
  {
    id: "ht-03",
    q: "Which tag creates the LARGEST heading?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    answer: 2,
    why: "Headings go from <h1> (largest/most important) down to <h6>.",
  },
  {
    id: "ht-04",
    q: "Which tag starts a PARAGRAPH?",
    options: ["<p>", "<par>", "<text>", "<pg>"],
    answer: 0,
    why: "<p>…</p> wraps a block of paragraph text.",
  },
  {
    id: "ht-05",
    q: "How do you write a correct closing tag for <div>?",
    options: ["</div>", "<div/>", "<\\div>", "[/div]"],
    answer: 0,
    why: "Closing tags repeat the tag name after a forward slash: </div>.",
  },
  {
    id: "ht-06",
    q: "Which tag is a VOID element (no closing tag)?",
    options: ["<br>", "<p>", "<ul>", "<h3>"],
    answer: 0,
    why: "<br> is a line break and has no content, so it needs no closing tag.",
  },
  {
    id: "ht-07",
    q: "Which attribute makes a link open in a NEW tab?",
    options: ["href=\"new\"", "target=\"_blank\"", "open=\"tab\"", "new-tab"],
    answer: 1,
    why: "target=\"_blank\" tells the browser to open the linked page in a new tab.",
  },
  {
    id: "ht-08",
    q: "What is the correct tag for a link?",
    options: ["<link href=\"…\">Go</link>", "<a href=\"…\">Go</a>", "<url>Go</url>", "<href>Go</href>"],
    answer: 1,
    why: "The <a> (anchor) element with an href attribute creates a hyperlink.",
  },
  {
    id: "ht-09",
    q: "Which attribute of <a> holds the destination URL?",
    options: ["src", "to", "link", "href"],
    answer: 3,
    why: "href=\"https://…\" is the anchor's destination; src is for images/media.",
  },
  {
    id: "ht-10",
    q: "Which tag creates an UNORDERED (bulleted) list?",
    options: ["<list>", "<ol>", "<ul>", "<bullets>"],
    answer: 2,
    why: "<ul> is a bulleted list; <ol> is a numbered list.",
  },
  {
    id: "ht-11",
    q: "What tag marks ONE item inside a list?",
    options: ["<item>", "<li>", "<list-item>", "<entry>"],
    answer: 1,
    why: "Each entry in a <ul> or <ol> is an <li> (list item).",
  },
  {
    id: "ht-12",
    q: "How many levels of headings does HTML define?",
    options: ["3", "5", "6", "Unlimited"],
    answer: 2,
    why: "There are exactly six: <h1> through <h6>.",
  },
  {
    id: "ht-13",
    q: "Where should the <title> tag live?",
    options: ["Inside <body>", "Inside <head>", "Right after <p>", "Anywhere — it doesn't matter"],
    answer: 1,
    why: "<title> is page metadata, so it belongs in <head> (it names the browser tab).",
  },
  {
    id: "ht-14",
    q: "Which tag embeds an image?",
    options: ["<image src=\"cat.png\">", "<img src=\"cat.png\">", "<pic src=\"cat.png\">", "<src=\"cat.png\">"],
    answer: 1,
    why: "<img> with a src attribute embeds an image; it's a void element.",
  },
  {
    id: "ht-15",
    q: "What does the alt attribute on <img> do?",
    options: ["Adds a tooltip on hover", "Describes the image for screen readers and broken loads", "Changes the image size", "Links the image somewhere"],
    answer: 1,
    why: "alt text is the accessible description shown when the image can't load or is read aloud.",
  },
  {
    id: "ht-16",
    q: "Where can you write CSS for a whole page?",
    options: ["Inside a <style> tag in <head>", "Only in a separate .css file", "Inside <!-- --> comments", "Inside the <html> attribute"],
    answer: 0,
    why: "A <style> block in <head> (or a linked .css file) holds page-wide CSS.",
  },
  {
    id: "ht-17",
    q: "Which CSS rule makes ALL paragraphs red?",
    options: ["p { color: red; }", ".p { color: red; }", "#p { color: red; }", "paragraph { color: red; }"],
    answer: 0,
    why: "A bare tag name in the selector targets every <p> element.",
  },
  {
    id: "ht-18",
    q: "What does the CSS selector `.card` match?",
    options: ["The <card> tag", "Every element with class=\"card\"", "The element with id=\"card\"", "All elements"],
    answer: 1,
    why: "A dot selects by class; # selects by id.",
  },
  {
    id: "ht-19",
    q: "Which CSS property changes TEXT color?",
    options: ["background-color", "text-color", "color", "font-color"],
    answer: 2,
    why: "color sets the text color; background-color paints the element's background.",
  },
  {
    id: "ht-20",
    q: "How do you connect an external stylesheet `style.css`?",
    options: ["<style src=\"style.css\">", "<link rel=\"stylesheet\" href=\"style.css\">", "<css href=\"style.css\">", "<script src=\"style.css\">"],
    answer: 1,
    why: "External CSS is attached with a <link rel=\"stylesheet\"> tag in <head>.",
  },
  {
    id: "ht-21",
    q: "What is the correct full skeleton of a page?",
    options: ["<html><head></head><body></body></html>", "<head><html></html></head><body>", "<body><head></head><html></html></body>", "<html><body></body><head></head></html>"],
    answer: 0,
    why: "The document is one <html> root containing <head> then <body>.",
  },
  {
    id: "ht-22",
    q: "What does the DOCTYPE declaration do?",
    options: ["Imports the page's CSS", "Tells the browser this is a modern HTML document", "Creates the first heading", "Links JavaScript"],
    answer: 1,
    why: "<!DOCTYPE html> switches the browser into standards mode — always the first line.",
  },
  {
    id: "ht-23",
    q: "Which tag is best for a BLOCK QUOTE of cited text?",
    options: ["<quote>", "<blockquote>", "<bq>", "<cite-text>"],
    answer: 1,
    why: "<blockquote> marks a longer quotation lifted from another source.",
  },
  {
    id: "ht-24",
    q: "What does `#header` select in CSS?",
    options: ["Every element with class=\"header\"", "The single element with id=\"header\"", "The <header> tag only", "The first child of body"],
    answer: 1,
    why: "# matches the id attribute — ids must be unique on the page.",
  },
  {
    id: "ht-25",
    q: "Which snippet makes the text IMPORTANT (bold + semantic)?",
    options: ["<important>text</important>", "<strong>text</strong>", "<bold>text</bold>", "<b-text>text</b-text>"],
    answer: 1,
    why: "<strong> marks importance (rendered bold); <b> is purely visual, and <important> doesn't exist.",
  },
  // Task 15 expansion — modules m6-m8 (Layouts / Pro Components / Ship It)
  ...EXTRA_HT_QUESTIONS,
];

const BANKS: Record<string, ExamQuestion[]> = {
  "python-basics": PYTHON_EXAM_BANK,
  "html-basics": HTML_EXAM_BANK,
};

export function examBankFor(courseId: string): ExamQuestion[] | undefined {
  return BANKS[courseId];
}

export function examQuestionById(courseId: string, qid: string): ExamQuestion | undefined {
  return BANKS[courseId]?.find((q) => q.id === qid);
}
