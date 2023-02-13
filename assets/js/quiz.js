// starting point for this commentary,

console.log("Sam, your questions");

const startButton = document.getElementById('start-button')
// const nextButton = document.getElementById('next-button')
var submitButton = document.querySelector("#submit");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons');
const clock = document.getElementById('clock')
var initialsElement = document.querySelector("#initials");

let currentQuestion = 0;
let time = 99;
let timer;
let timeout;


  // create the question elements
var questions = [
  {
    questionTitle: "Commonly used data types DO NOT include:",
    options: ["1.strings", "2.booleans", "3.alerts", "4.numbers"],
    answer: "3.alerts",

  },
  {
    questionTitle: "Commonly the condition is an if / else statement is enclosed within",
    options: ["1.quotes", "2.curly brackets", "3.parentheses", "4.square brackets"],
    answer: "3.parentheses",

  },

  {
    questionTitle: "Arrays in JavaScript can be used to store _____",
    options: ["1.numbers and strings", "2.other arrays", "3.booleans", "4.all of the above"],
    answer: "4.all of the above",

  },

  {
    questionTitle: "String values must be enclosed within ______ when being assigned to variables.",
    options: ["1.commas", "2.curly brackets", "3.quotes", "4.parentheses"],
    answer: "3.quotes",

  },

  {
    questionTitle: "A very useful tool used during development and debugging for printing content to the debugger is",
    options: ["1.Javascript" , " 2.terminal / bash" , "3.for loops", "4.console.log"],
    answer: "4.console.log",

  },

]


startButton.addEventListener('click', startGame)


function startGame() {
  console.log('Start game');
  startButton.classList.add('hide');
  questionContainerElement.classList.remove('hide');
  startTimer();
  setNextQuestion();
}


function startTimer() {
  timer = setInterval(function () {
    if (time === 0){
    clearInterval(timer)
  }
  else{time--;
    clock.textContent = time;}
    

  }, 1000);

  // if (time < 0) {
  //   time = 0; 
  //   }
}


function endTimer() {
  if (time === 0) {
    clearInterval(timer)
    endQuiz();
  }
  if (time <= 0) {
    clearInterval(timer)
    endQuiz();
  }
}




function setNextQuestion() {
  questionElement.textContent = questions[currentQuestion].questionTitle;
  answerButtonsElement.textContent = "";

  for (let i = 0; i < questions[currentQuestion].options.length; i++) {
    let answerButton = document.createElement("button");
    answerButton.setAttribute("class", "button");
    answerButton.addEventListener('click', selectAnswer);
    answerButton.setAttribute("data-value", questions[currentQuestion].options[i]);
    answerButton.textContent = questions[currentQuestion].options[i];
    answerButtonsElement.appendChild(answerButton);

  }
}




function selectAnswer() {
  console.log(this.dataset.value);
  if (this.dataset.value === questions[currentQuestion].answer){
    currentQuestion++;
    setNextQuestion();

  }

  if (this.dataset.value !== questions[currentQuestion].answer){
  time = time - 10;
  }


  // clock.textContent = time;

  if (currentQuestion == questions.length) {
    endQuiz();
  } else {
    setNextQuestion();
  }
}

function endQuiz() {
  // stop timer
  clearInterval(timer);

  // show end screen
  var endScreenElement = document.getElementById("end-screen");
  endScreenElement.removeAttribute("class");

  // show final score
  var finalScoreElement = document.getElementById("final-score");
  finalScoreElement.textContent = time;

  // hide questions section
  questionContainerElement.setAttribute("class", "hide");
}




function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

  }

  highscores.forEach(function(score) {
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // display on page
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  })
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit initials
submitButton.addEventListener('click', saveHighscore);


