export type TaskLanguage = "javascript" | "typescript" | "python" | "java" | "cpp";

export type LanguageQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
};

export type LanguageTask = {
  key: TaskLanguage;
  label: string;
  badge: string;
  title: string;
  goal: string;
  hint: string;
  questions: LanguageQuestion[];
};

export const defaultTaskLanguage: TaskLanguage = "javascript";

export const whatsappGateTasks: Record<TaskLanguage, LanguageTask> = {
  javascript: {
    key: "javascript",
    label: "JavaScript",
    badge: "Web",
    title: "Answer a few JavaScript basics",
    goal: "Pick the right answers to unlock the invite.",
    hint: "Focus on the fundamentals people use every day.",
    questions: [
      {
        id: "js-1",
        prompt: "Which keyword is used to declare a function in JavaScript?",
        options: ["function", "define", "method", "func"],
        answer: "function",
      },
      {
        id: "js-2",
        prompt: "What does console.log() usually do?",
        options: [
          "Prints a value to the console",
          "Stops the program",
          "Creates a variable",
          "Formats HTML",
        ],
        answer: "Prints a value to the console",
      },
      {
        id: "js-3",
        prompt: "Which value is a boolean?",
        options: ["'true'", "1", "true", "yes"],
        answer: "true",
      },
    ],
  },
  typescript: {
    key: "typescript",
    label: "TypeScript",
    badge: "Typed",
    title: "Answer a few TypeScript basics",
    goal: "Choose the correct answers and continue.",
    hint: "Think about type safety and editor support.",
    questions: [
      {
        id: "ts-1",
        prompt: "What does TypeScript add on top of JavaScript?",
        options: [
          "Static types",
          "A new browser",
          "A database engine",
          "Native mobile rendering",
        ],
        answer: "Static types",
      },
      {
        id: "ts-2",
        prompt: "Which annotation gives a variable a number type?",
        options: ["value: number", "value => number", "number(value)", "value :: number"],
        answer: "value: number",
      },
      {
        id: "ts-3",
        prompt: "Why do many teams use TypeScript?",
        options: [
          "To catch mistakes earlier",
          "To remove all testing",
          "To avoid browsers",
          "To replace HTML",
        ],
        answer: "To catch mistakes earlier",
      },
    ],
  },
  python: {
    key: "python",
    label: "Python",
    badge: "Scripting",
    title: "Answer a few Python basics",
    goal: "Choose the right Python answers to keep going.",
    hint: "Remember the clean syntax Python is known for.",
    questions: [
      {
        id: "py-1",
        prompt: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "fn", "lambda"],
        answer: "def",
      },
      {
        id: "py-2",
        prompt: "What is important for Python blocks like loops and functions?",
        options: ["Indentation", "Semicolons", "Curly braces", "Angle brackets"],
        answer: "Indentation",
      },
      {
        id: "py-3",
        prompt: "Which function is commonly used to show output in Python?",
        options: ["echo()", "console.log()", "print()", "write()"],
        answer: "print()",
      },
    ],
  },
  java: {
    key: "java",
    label: "Java",
    badge: "JVM",
    title: "Answer a few Java basics",
    goal: "Choose the correct Java answers and unlock access.",
    hint: "Think about classes, the JVM, and the main entry point.",
    questions: [
      {
        id: "java-1",
        prompt: "Java programs run on which platform layer?",
        options: ["JVM", "DOM", "NPM", "Vite"],
        answer: "JVM",
      },
      {
        id: "java-2",
        prompt: "Which method is the usual entry point of a Java program?",
        options: ["start()", "main()", "run()", "init()"],
        answer: "main()",
      },
      {
        id: "java-3",
        prompt: "Java code is organized mainly inside what?",
        options: ["Classes", "Sheets", "Routes", "Views"],
        answer: "Classes",
      },
    ],
  },
  cpp: {
    key: "cpp",
    label: "C++",
    badge: "Native",
    title: "Answer a few C++ basics",
    goal: "Get the basics right and continue to the invite.",
    hint: "Think about compiled code and standard output.",
    questions: [
      {
        id: "cpp-1",
        prompt: "Which stream is commonly used for standard output in C++?",
        options: ["std::cout", "println", "console.log", "echo"],
        answer: "std::cout",
      },
      {
        id: "cpp-2",
        prompt: "Which header is commonly included for basic console output?",
        options: ["<iostream>", "<script>", "<output>", "<console>"],
        answer: "<iostream>",
      },
      {
        id: "cpp-3",
        prompt: "C++ is generally known as what kind of language?",
        options: ["Compiled", "Markup", "Spreadsheet", "Query-only"],
        answer: "Compiled",
      },
    ],
  },
};

export const majorStates = [
  "Kerala",
  "Tamil Nadu",
  "Karnataka",
  "Maharashtra",
  "Delhi",
  "Telangana",
  "Gujarat",
  "West Bengal",
  "Other"
];

export const whatsappGateTaskList = Object.values(whatsappGateTasks);
