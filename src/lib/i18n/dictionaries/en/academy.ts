// TEKA NEXUS — en dictionary: "academy" namespace (TEKA Academy).
// English is the source of truth; every other locale implements this shape.

export const academy = {
  // Hub
  hubTitle: "TEKA Academy",
  hubSubtitle: "Learn Python and HTML by building real things — free forever, right in your browser.",
  freeBadge: "100% free",
  progressLabel: "Your progress",
  lessonsDone: "{done} of {total} lessons",
  startCourse: "Start course",
  continueCourse: "Continue",
  reviewCourse: "Review",
  minutesShort: "min",
  lessonsCount: "{count} lessons",
  loginPrompt: "Sign in to save your progress, earn XP and unlock certificates.",
  certificatesTitle: "Your certificates",
  viewCertificate: "View certificate",
  downloadPng: "Download PNG",
  leaderboardTitle: "Top learners",
  leaderboardYou: "You",
  leaderboardLessons: "{count} lessons",

  // Player
  moduleLabel: "Module {n}",
  lessonLabel: "Lesson {n}",
  stepOf: "Step {current} of {total}",
  next: "Next",
  back: "Back",
  finishLesson: "Finish lesson",
  goalLabel: "After this lesson you can:",

  // Quiz
  quizTitle: "Quick check",
  quizCheck: "Check answer",
  quizCorrect: "Correct! 🎯",
  quizWrong: "Not quite — here's why:",
  quizTryAgain: "Try another",
  quizComplete: "Quiz complete — nice work!",

  // Challenge / runner
  challengeLabel: "Challenge",
  missionLabel: "Your mission",
  run: "Run",
  running: "Running…",
  output: "Output",
  inputLabel: "Input (one line per input())",
  inputHint: "Each input() call reads the next line from here.",
  checkSolution: "Check solution",
  checking: "Checking…",
  passed: "Challenge passed! 🎉",
  xpRepToast: "+{xp} XP · +{rep} REP",
  notYet: "Not yet — your output doesn't match.",
  notYetHint: "Compare your output with the expected one, then try again.",
  expectedOutput: "Expected output",
  yourOutput: "Your output",
  showExpected: "Show expected output",
  hideExpected: "Hide expected output",
  hintReveal: "Reveal hint {n} of {total}",
  showSolution: "Show solution",
  hideSolution: "Hide solution",
  resetCode: "Reset code",
  previewTitle: "Live preview",
  previewHint: "Your page renders here — every change refreshes it.",
  pythonError: "Python says no",
  lineLabel: "Line {n}",
  playgroundTitle: "Free playground",
  playgroundHint: "No grading, no pressure — just you and the language. Experiment wildly.",

  // Completion
  courseCompleteTitle: "Course complete! 🏆",
  courseCompleteBody: "You finished every lesson. Your certificate is ready.",
  lessonDoneToast: "Lesson complete! +{xp} XP",
  courseDoneToast: "Course bonus +{xp} XP — certificate unlocked! 🏆",
  certLabel: "Certificate of Completion",
  certBody: "has successfully completed the free course",
  certCode: "Certificate code",
  certIssued: "Issued",
};

export type AcademyDict = typeof academy;
