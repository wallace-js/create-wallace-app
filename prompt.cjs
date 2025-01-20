const readline = require("readline-sync");

/**
 * Repeatedly asks a question until a valid answer is obtained.
 *
 * @param {string} question - the question to ask.
 * @param {string} error - the error message.
 * @param {*} validate - the validation function.
 * @returns string
 */
function getValidAnswer(question, error, validate) {
  while (true) {
    let answer = readline.question(question + `: `);
    if (validate(answer)) {
      return answer;
    }
    console.log(error);
  }
}

function chainQuestions(questions, callback) {
  const answers = {};
  questions.forEach((question) => {
    answers[question.name] = getValidAnswer(
      question.message,
      question.error,
      question.validate,
    );
  });
  callback(answers);
}

module.exports = chainQuestions