#!/usr/bin/env node

const isValidPath = require("is-valid-path");
const chainQuestions = require("./prompt.cjs");

const name_re = /^[\w\d\s-]+$/

const questions = [
  {
    name: "dir",
    message: "Where to create the project? (enter '.' for current dir)",
    error: "Directory must be a valid path.",
    validate: (answer) => isValidPath(answer),
  },
  {
    name: "name",
    message: "Project name",
    error: "Name may only contain letters, spaces, dashes or underscores.",
    validate: (answer) => name_re.test(answer),
  },
];

console.log(`
  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
  wwwwwwwwwwwwwwwwwwwwwwwww  CREATE WALLACE APP  wwwwwwwwwwwwwwwwwwwwwwwwww
  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
`);

chainQuestions(questions, (answers) => {
  console.log(answers);
});
