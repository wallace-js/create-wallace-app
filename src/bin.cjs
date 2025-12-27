#!/usr/bin/env node
const path = require("path");

const isValidPath = require("is-valid-path");
const { getValidAnswer, chainQuestions } = require("./prompt.cjs");
const generateProject = require("./generate.cjs");

const name_re = /^[\w\d\s-]+$/;

const questions = [
  {
    name: "dir",
    message: "Where should I create the project? (enter '.' for current dir)",
    error: "Directory must be a valid path.",
    validate: (answer) => isValidPath(answer),
  },
  {
    name: "language",
    message: "TypeScript or JavaScript? (enter 'js' or 'ts')",
    error: "Invalid choice.",
    validate: (answer) => ["ts", "js"].includes(answer),
  },
  {
    name: "name",
    message: "Project name",
    error: "Name may only contain letters, spaces, dashes or underscores.",
    validate: (answer) => name_re.test(answer),
  },
];

console.log(`
  -------------------------------------------------------------------------
  -------------------------  CREATE WALLACE APP  --------------------------
  -------------------------------------------------------------------------
`);

chainQuestions(questions, (answers) => {
  const destDir = path.resolve(answers.dir);
  const details = [
    `Name: ${answers.name}`,
    `Language: ${answers.language}`,
    `Directory: ${destDir}`,
  ].join("\n   ");
  getValidAnswer(
    `Creating project:\n\n   ${details}\n\nType "ok" to proceed`,
    "Invalid answer.",
    (answer) => answer.toLowerCase() === "ok"
  );
  generateProject(answers, destDir);
});
