// TEKA Academy — Task 15-c-2 exam add-on for the HTML course expansion
// (modules m6–m8: CSS Grid, position, media queries, details/summary,
//  badges & progress bars, timeline, accessibility, meta tags & SEO,
//  big-page organization, landing page).
// English-only, beginner level, ids continue from the base bank (ht-26…).

import type { ExamQuestion } from "./exam-bank";

export const EXTRA_HT_QUESTIONS: ExamQuestion[] = [
  {
    id: "ht-26",
    q: "Which declaration turns a container into a grid?",
    options: ["display: flex;", "grid-template-columns: 1fr;", "display: grid;", "gap: 10px;"],
    answer: 2,
    why: "display: grid switches the container into grid mode; grid-template-columns only describes the columns after that switch.",
  },
  {
    id: "ht-27",
    q: "What does grid-template-columns: 1fr 2fr create?",
    options: [
      "Two equal columns",
      "Two columns, the second twice as wide as the first",
      "Two rows, the first twice as tall",
      "Three columns of equal width",
    ],
    answer: 1,
    why: "Each fr is one share of the free width — the values map left to right, so 1fr 2fr gives the second column double the width.",
  },
  {
    id: "ht-28",
    q: "What does gap: 16px do on a grid container?",
    options: [
      "Adds 16px of padding inside every cell",
      "Adds 16px of margin around the whole grid",
      "Adds 16px of space between all rows and columns",
      "Makes every cell 16px wide",
    ],
    answer: 2,
    why: "gap is the spacing BETWEEN tracks (rows and columns); spacing inside a cell is padding on the child.",
  },
  {
    id: "ht-29",
    q: "An element with position: absolute pins to…",
    options: [
      "Always the browser window",
      "The nearest ancestor with a position (usually one marked relative)",
      "Its original spot in the normal flow",
      "The center of the page",
    ],
    answer: 1,
    why: "absolute measures from the nearest positioned ancestor — if none exists, it falls back to the whole page (a classic bug).",
  },
  {
    id: "ht-30",
    q: "What does position: relative do on its own (no top/left values)?",
    options: [
      "Moves the element slightly down the page",
      "Nothing visible — it turns the element into an anchor for absolute children",
      "Makes the element stay fixed while scrolling",
      "It centers the element",
    ],
    answer: 1,
    why: "relative keeps the element in its normal spot but makes it the reference frame for absolutely positioned descendants.",
  },
  {
    id: "ht-31",
    q: "Which position value keeps an element glued to the browser window while the page scrolls?",
    options: ["relative", "absolute", "fixed", "static"],
    answer: 2,
    why: "position: fixed measures from the viewport and survives scrolling — that is how cookie banners and floating buttons work.",
  },
  {
    id: "ht-32",
    q: "When do the rules inside @media (max-width: 600px) { … } apply?",
    options: [
      "When the window is 600px wide or narrower",
      "When the window is wider than 600px",
      "Always, on every screen size",
      "Only when the page is printed",
    ],
    answer: 0,
    why: "max-width means 'up to this width', so the wrapped rules win on small screens — the heart of responsive design.",
  },
  {
    id: "ht-33",
    q: "Why must <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> be present for media queries to work on phones?",
    options: [
      "It makes CSS load faster on mobile networks",
      "Without it the phone pretends to be a wide desktop screen, so the queries never match",
      "It is required to display Persian text",
      "It only matters for tablets",
    ],
    answer: 1,
    why: "The viewport meta reports the real device width — the exact number media queries measure against.",
  },
  {
    id: "ht-34",
    q: "What do <details> and <summary> create together?",
    options: [
      "A dropdown menu of options",
      "A collapsible box: the summary stays visible, the rest toggles on click",
      "A popup window",
      "A table with hidden rows",
    ],
    answer: 1,
    why: "It is the native HTML accordion — click-to-open/collapse with zero JavaScript.",
  },
  {
    id: "ht-35",
    q: "How do you make a details box start already expanded?",
    options: ["<details expanded>", "<details visible>", "<details open>", "It is impossible"],
    answer: 2,
    why: "The bare boolean attribute open means the box starts expanded; clicking still toggles it.",
  },
  {
    id: "ht-36",
    q: "What is the job of the alt attribute on an image?",
    options: [
      "It describes the image for screen readers and shows if the image fails to load",
      "It makes the image load faster",
      "It adds a caption below the image",
      "It is the image's file name",
    ],
    answer: 0,
    why: "alt is the text version of the image — screen readers speak it, and browsers display it when the image cannot load.",
  },
  {
    id: "ht-37",
    q: "A <label for='email'> is correctly connected to the input by…",
    options: [
      "The input's class='email'",
      "The input's id='email' — for must exactly equal the id",
      "Placing them on the same line",
      "The input's name='email'",
    ],
    answer: 1,
    why: "The for attribute must match the input's id exactly; then clicking the label focuses the input and screen readers announce it.",
  },
  {
    id: "ht-38",
    q: "When is aria-label needed on a button?",
    options: [
      "On every button without exception",
      "Never — buttons cannot be labeled",
      "Only when the button is red",
      "When the button has no visible text, like an icon-only button",
    ],
    answer: 3,
    why: "aria-label gives the button an accessible name when there is nothing visible to read — essential for 🔍 or 🛒 icon buttons.",
  },
  {
    id: "ht-39",
    q: "What do <meta property=\"og:title\"> and <meta property=\"og:description\"> control?",
    options: [
      "The browser tab text",
      "The preview card shown when the link is shared in social and chat apps",
      "The page's font",
      "The Google search headline",
    ],
    answer: 1,
    why: "og: tags are Open Graph metadata — they draw the share card in Telegram, WhatsApp, X and friends.",
  },
  {
    id: "ht-40",
    q: "What does <html lang=\"fa\"> tell the browser?",
    options: [
      "To translate the page into Persian",
      "To use a bigger font for Persian",
      "The page's language — screen readers pronounce it correctly and search engines classify it",
      "To align the page to the left",
    ],
    answer: 2,
    why: "lang declares the content's language for screen readers, translation tools and search engines — it declares, it does not translate.",
  },
];
