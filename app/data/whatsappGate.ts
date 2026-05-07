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
      {
        id: "js-4",
        prompt: "Which method adds an item to the end of an array?",
        options: ["push()", "pop()", "shift()", "slice()"],
        answer: "push()",
      },
      {
        id: "js-5",
        prompt: "Which symbol is commonly used for strict equality?",
        options: ["===", "=", "=>", "!="],
        answer: "===",
      },
      {
        id: "js-6",
        prompt: "What does const mean for a variable binding?",
        options: [
          "The binding cannot be reassigned",
          "The value is always a string",
          "The code runs only once",
          "The variable becomes global",
        ],
        answer: "The binding cannot be reassigned",
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
      {
        id: "ts-4",
        prompt: "Which type represents true or false?",
        options: ["boolean", "string", "number", "array"],
        answer: "boolean",
      },
      {
        id: "ts-5",
        prompt: "What does an interface usually describe?",
        options: [
          "The shape of an object",
          "A browser tab",
          "A package manager",
          "A CSS animation",
        ],
        answer: "The shape of an object",
      },
      {
        id: "ts-6",
        prompt: "Which syntax marks a property as optional?",
        options: ["name?: string", "name!: string", "optional name", "name -> string"],
        answer: "name?: string",
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
      {
        id: "py-4",
        prompt: "Which data type stores ordered items in square brackets?",
        options: ["list", "dict", "tuple-only", "set-only"],
        answer: "list",
      },
      {
        id: "py-5",
        prompt: "Which keyword is used for a conditional branch?",
        options: ["if", "when", "check", "caseonly"],
        answer: "if",
      },
      {
        id: "py-6",
        prompt: "What does len() commonly return?",
        options: ["The length of a value", "The current time", "A random number", "A file path"],
        answer: "The length of a value",
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
      {
        id: "java-4",
        prompt: "Which keyword creates a new object?",
        options: ["new", "make", "object", "create"],
        answer: "new",
      },
      {
        id: "java-5",
        prompt: "Which type stores true or false values?",
        options: ["boolean", "String", "int", "char"],
        answer: "boolean",
      },
      {
        id: "java-6",
        prompt: "Which statement is commonly used for console output?",
        options: ["System.out.println()", "console.log()", "print.out()", "echo()"],
        answer: "System.out.println()",
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
      {
        id: "cpp-4",
        prompt: "Which symbol ends most C++ statements?",
        options: [";", ".", ":", ","],
        answer: ";",
      },
      {
        id: "cpp-5",
        prompt: "Which keyword declares an integer variable?",
        options: ["int", "num", "integer", "number"],
        answer: "int",
      },
      {
        id: "cpp-6",
        prompt: "Which function is the usual program entry point?",
        options: ["main()", "start()", "run()", "init()"],
        answer: "main()",
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
