//questions variable
let questionsArr = [
  {
    question: "What is the correct syntax for referring to an external script?",
    choices: [
      'a. <script rel="script.js">',
      'b. <script href="script.js">',
      'c. <script src="script.js">',
      'd. <script id="script.js">',
    ],
    answer: 'c. <script src="script.js">',
  },
  {
    question: "If a function is part of an object, it is called a:",
    choices: ["a. property", "b. method", "c. array", "d. value"],
    answer: "b. method",
  },
  {
    question:
      "How do you select a DOM element with class attribute of 'hello'?",
    choices: [
      "a. querySelector(.hello)",
      "b. querySelector($hello)",
      "c. querySelector('.hello')",
      "d. querySelector('#hello')",
    ],
    answer: "c. querySelector('.hello')",
  },
  {
    question: "Which language is used for styling web pages?",
    choices: ["a. HTML", "c. Python", "b. Microsoft paint", "d. CSS"],
    answer: "d. CSS",
  },
  {
    question: "Which of the following statements is true?",
    choices: [
      "a. the sky is blue",
      "b. HTML stands for Hypertext Markup Language",
      "c. I only cried 3 times doing this challenge",
      "d. all of the above",
    ],
    answer: "d. all of the above",
  },
];
//start page/questions variables
let startBtnEl = document.getElementById("start-btn");
let startPageEl = document.getElementById("start-page");
let highscoreLinkEl = document.getElementById("highscoreLink");
let timer = document.getElementById("timer");
let timeRemaining = 60;
let timeInterval;
let score = 0;
let quizPageEl = document.querySelector(".quizPage");
let quizQuestionEl = document.querySelector(".quizQ");
let questionEl = document.createElement("h2");
let choicesContainerEl = document.querySelector(".choices");
let q = 0;
let alertEl = document.querySelector(".alert");
//enter score variables
let submitBtnEl = document.getElementById("submit-btn");
let finalScoreEl = document.querySelector("#finalScore");
let enterInitialsPageEl = document.querySelector(".enterInitials-page");
let initialsInput = document.querySelector("#initials");
let highscorePageEl = document.querySelector(".highscore-page");
let playerHighscoreEl = document.querySelector(".playerHighscores");
let highscoreArr = [];
let savedHighscoreArr;
let homeBtnEl = document.getElementById("home");
let clearScoreBtnEl = document.getElementById("clearScores");

//start quiz: start timer and unhide questions
function startQuiz() {
  timer.textContent = "Time: 60";
  startPageEl.classList.add("hidden");
  quizPageEl.classList.remove("hidden");
  countdown();
  getQuestion();
}

function countdown() {
  timeInterval = setInterval(function () {
    if (timeRemaining <= 0) {
      timer.textContent = "";
      clearInterval(timeInterval);
      enterScore();
      //GO TO HIGHSCORE PAGE
    } else if (timeRemaining >= 1) {
      timer.textContent = "Time: " + timeRemaining;
      timeRemaining--;
    }
  }, 1000);
}

//show questions and choices
function getQuestion() {
  currentQuestion = questionsArr[q];
  let currentQuestionText = document.createTextNode(
    currentQuestion["question"]
  );
  questionEl.appendChild(currentQuestionText);
  quizQuestionEl.appendChild(questionEl);

  for (i = 0; i < currentQuestion["choices"].length; i++) {
    let choiceText = currentQuestion.choices;
    let choice = document.getElementById("btn" + i);
    choice.textContent = choiceText[i];
  }
}

//check answer
function checkAnswer(event) {
  // console.log(event);
  var selectedAnswer = event.target.textContent;
  if (selectedAnswer === currentQuestion.answer) {
    //display alert
    alertEl.setAttribute("id", "correct");
    alertEl.textContent = "you got it!";
    score += 5;
    nextQuestion();
  } else {
    alertEl.setAttribute("id", "incorrect");
    alertEl.textContent = "wrong :(";
    console.log("Incorrect!");
    timeRemaining -= 10;
    nextQuestion();
  }
}

//remove old question/choices/alert and add new. if no new questions, go to page to enter score
function nextQuestion() {
  q += 1;
  if (q < questionsArr.length) {
    questionEl.textContent = "";
    getQuestion();
  } else {
    enterScore();
  }
}

//highscore pages
function enterScore() {
  clearInterval(timeInterval);
  quizPageEl.classList.add("hidden");
  enterInitialsPageEl.classList.remove("hidden");
  finalScoreEl.textContent = score;
}

function saveHighscore() {
  if (!initialsInput.value) {
    alert("You need to add your initials!");
    return false;
  }
  var playerHighscore = {
    playerName: initialsInput.value.toUpperCase(),
    playerScore: score,
  };
  console.log(playerHighscore);
  highscoreArr.push(playerHighscore);
  localStorage.setItem("highscoreStorage", JSON.stringify(highscoreArr));

  enterInitialsPageEl.classList.add("hidden");
  highscorePageEl.classList.remove("hidden");
  loadHighscore();
}

function loadHighscore() {
  //reset page if user accesses using view highscore link
  startPageEl.classList.add("hidden");
  quizPageEl.classList.add("hidden");
  enterInitialsPageEl.classList.add("hidden");
  highscorePageEl.classList.remove("hidden");
  clearInterval(timeInterval);
  //retrieve highscores from storage
  savedHighscoreArr = localStorage.getItem("highscoreStorage");
  savedHighscoreArr = JSON.parse(savedHighscoreArr);
  //sort array by highest to lowest scores
  savedHighscoreArr.sort(function (a, b) {
    return b.playerScore - a.playerScore;
  });

  //create element for each object saved in highscore array
  for (var i = 0; i < savedHighscoreArr.length; i++) {
    let highscoreListEl = document.getElementById("hs" + i);
    highscoreListEl.classList.remove("hidden");
    highscoreListEl.innerHTML =
      i +
      1 +
      ".      " +
      savedHighscoreArr[i].playerName +
      " | " +
      savedHighscoreArr[i].playerScore +
      "PTS";
  }
}

// reset stats and go back to start screen
function resetQuiz() {
  highscorePageEl.classList.add("hidden");
  startPageEl.classList.remove("hidden");
  timer.textContent = "";
  q = 0;
  score = 0;
  timeRemaining = 60;
  alertEl.textContent = "";
}

//start quiz event listener
startBtnEl.addEventListener("click", startQuiz);

//select answer
choicesContainerEl.addEventListener("click", checkAnswer);

//submit highscore
submitBtnEl.addEventListener("click", saveHighscore);

//view highscores with link
highscoreLinkEl.addEventListener("click", loadHighscore);

//home
homeBtnEl.addEventListener("click", resetQuiz);

//clear high scores
clearScoreBtnEl.addEventListener("click", function () {
  localStorage.clear();
  for (var i = 0; i < savedHighscoreArr.length; i++) {
    let highscoreListEl = document.getElementById("hs" + i);
    highscoreListEl.classList.add("hidden");
  }
  highscoreArr = [];
  savedHighscoreArr = [];
  resetQuiz();
});
