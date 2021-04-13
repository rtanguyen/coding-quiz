let timer = 60;
let score = 0;
let quizPageEl = document.querySelector(".quizPage");
let choicesContainerEl = document.querySelector("#choicesContainer");
let questionEl = document.createElement("h2");
let q = 0;
let questionsArr = [
  {
    question: "What is the correct syntax for referring to an external script?",
    choices: [
      'a. <script rel="script.js">',
      'b. <script href="script.js">',
      'c. <script src="script.js">',
      'd. <script id="script.js">',
    ],
    // choiceA: 'a. <script rel="script.js">',
    // choiceB: 'b. <script href="script.js">',
    // choiceC: 'c. <script src="script.js">',
    // choiceD: 'd. <script id="script.js">',
    answer: 'c. <script src="script.js">',
  },
  {
    question: "If a function is part of an object, it is called a:",
    choiceA: "a. property",
    choiceB: "b. method",
    choiceC: "c. array",
    choiceD: "d. value",
    answer: "b. method",
  },
];

//show questions
function quizQuestions() {
  // for (var questionIndex = 0; questionIndex < questionsArr.length; questionIndex++) {
  //show question
  currentQuestion = questionsArr[q];
  let currentQuestionText = document.createTextNode(
    currentQuestion["question"]
  );
  console.log(currentQuestionText);
  questionEl.appendChild(currentQuestionText);
  quizPageEl.appendChild(questionEl);

  for (i = 0; i < currentQuestion["choices"].length; i++) {}
  let choicesEl = document.createElement("button");
  choicesEl.className = "btn";
  let currentChoiceText = document.createTextNode(currentQuestion.choices[i]);
  console.log(currentChoiceText);

  //   document.querySelector("#currentQuestion").textContent =
  //     currentQuestion.question;
  //   document.querySelector("#choiceA").textContent = currentQuestion.choiceA;
  //   document.querySelector("#choiceB").textContent = currentQuestion.choiceB;
  //   document.querySelector("#choiceC").textContent = currentQuestion.choiceC;
  //   document.querySelector("#choiceD").textContent = currentQuestion.choiceD;
}

//check answer
function checkAnswer(event) {
  var selectedAnswer = event.target.textContent;
  console.log(selectedAnswer);
  console.log(currentQuestion.answer);

  if (selectedAnswer === currentQuestion.answer) {
    console.log("Correct!");
    score += 5;
  } else {
    console.log("Incorrect!");
    timer -= 10;
  }
}

//select answer
// choicesEl.addEventListener("click", checkAnswer);

quizQuestions();
