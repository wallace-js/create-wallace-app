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

/**
 * Asks a chain of questions, then calls the callback with the collected answers.
 *
 * @param {Array} questions - array of objects to pass to getValidAnswer().
 * @param {*} callback - callback to call once all questions are answered.
 */
function chainQuestions(questions, callback) {
  const answers = {};
  questions.forEach((question) => {
    answers[question.name] = getValidAnswer(
      question.message,
      question.error,
      question.validate
    );
  });
  callback(answers);
}

module.exports = { getValidAnswer, chainQuestions };
