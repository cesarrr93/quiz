// Setting all the variables needed for the Java script

var startEl = document.getElementById('start'); //start Div
var startBtn = document.getElementById('start-btn'); //start button
var startBtn2 = document.getElementById('start-btn2'); //start Over button
var timerEl = document.getElementById('countdown'); //timer
var containerEl = document.getElementById('containter') // container div
var quizEl = document.getElementById('quiz'); //quiz element encompassing question and answer
var questionsEl = document.getElementById('questions'); // put in content in the main
var choicesEl = document.getElementById('choices'); // put in content in the main
var firstChoice = document.getElementById('choice1'); // choice 1
var secondChoice = document.getElementById('choice2'); // choice 2
var thirdChoice = document.getElementById('choice3'); // choice 3
var fourthChoice = document.getElementById('choice4');// choice 4
var scoreEl = document.getElementById('score'); // score div
var answerStatusEl = document.getElementById('answerStatus');
var coundownEl = document.getElementById('countdown');
var timerPauseEl = document.getElementById('timerPause');
var highScoreSpan = document.querySelector("#high-score");
var initialInput = document.querySelector("#initials");
var highScorePageEl = document.getElementById('highScorePage');
var highScoreSubmitBtn = document.getElementById('submitBtn');
var listOfHighScoresEl = document.getElementById('listOfHighScores');
var highScorePageLinkEl = document.getElementById('highScoreLink');
var listOfInitialsEl = document.getElementById('listOfInitials');
var listOfScoresEL = document.getElementById('listOfScores');

// Array of Questions and answers and the right answer

var questionAndAnswerArray =
    [{
        question: "Which of the following is NOT a JavaScript Data Type?",
        choice1: "Undefined", choice2: "Number", choice3: "Float", choice4: "Boolean",
        correct: 'choice3'
    },
    {
        question: "What are the two basic groups of dataypes in JavaScript?",
        choice1: "Primitive", choice2: "Reference types", choice3: "All of the above", choice4: "None of the above",
        correct: 'choice3'
    },
    {
        question: "Which company developed JavaScript?",
        choice1: "Netscape", choice2: "Bell Labs", choice3: "Sun Microsystems ", choice4: "IBM",
        correct: 'choice1'
    },
    {
        question: "Which of the following is not Javascript frameworks or libraries?",
        choice1: "Polymer", choice2: "Meteor", choice3: "Cassandra", choice4: "jQuery",
        correct: 'choice3'
    },
    {
        question: "What does javascript use instead of == and !=?",
        choice1: "It uses bitwise checking", choice2: "it uses === and !== instead", choice3: "It uses equals() and notequals() instead", choice4: "It uses equalto()",
        correct: 'choice2'
    },
    {
        question: "Among the keywords below, which one is not a statement?",
        choice1: "if", choice2: "with", choice3: "debugger", choice4: "use strict",
        correct: 'choice4'
    },
    {
        question: "Which of them is not the looping structures in JavaScript?",
        choice1: "for", choice2: "while", choice3: "forwhich", choice4: "dowhile",
        correct: 'choice3'
    },
    {
        question: "What are the types of Pop up boxes available in JavaScript?",
        choice1: "Alert", choice2: "Prompt", choice3: "Confirm", choice4: "All of the above",
        correct: 'choice4'
    },
    {
        question: "Inside which HTML element do we put the JavaScript in?",
        choice1: "script", choice2: "head", choice3: "body", choice4: "style",
        correct: 'choice1'
    },
    {
        question: "What will happen if you reference document.location from within an object?",
        choice1: "Traverses the queue", choice2: "Finds the bugs", choice3: "Traverses the stack", choice4: "Traverses the array",
        correct: 'choice3'
    }
    ]

// Setting global variables for score and highscore

var score = 0;
var highScore = 0;

// Setting local Storage data

var highScoreArray = JSON.parse(localStorage.getItem("high-score")) || [];
var highScoreObj = {}
var timeLeft = 100;
var currentQuestionIndex = 0;
var finalQuestion = questionAndAnswerArray.length - 1;
var listOfHighScoresArr = [];
var initials = "";

// Timer that counts down from 100
function countdown() {

    var timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
            timerEl.textContent = "Time: " + timeLeft;
            timeLeft--;
        } else {
            clearInterval(timeInterval);
            renderScore()
            if (score === 0 || score === null) {
                timerEl.textContent = "Time: 0";
            }
        }
    }, 1000);
}

var renderQuiz = function () {
    var question = questionAndAnswerArray[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + question.question + "</p>";
    firstChoice.innerHTML = question.choice1;
    secondChoice.innerHTML = question.choice2;
    thirdChoice.innerHTML = question.choice3;
    fourthChoice.innerHTML = question.choice4; 
}

var renderScore = function () {
    quizEl.style.display = "none";
    coundownEl.style.display = "none";
    score = timeLeft;
    timerPauseEl.style.display = "block";
    scoreEl.style.display = "block";
    if (highScore !== null) {
        if (score > highScore) {
            highScore = score;
        }
    } else {
        highScore = score;
    }
    highScoreSpan.textContent = highScore;
    timerPauseEl.innerHTML = "Time Left: " + highScore;
}

var validateAnswer = function (answer) {
    if (answer == questionAndAnswerArray[currentQuestionIndex].correct) {
        correctAnswer();
        score++;
    } else {
        wrongAnswer();
        timeLeft -=10;
    }
    if ((currentQuestionIndex < finalQuestion) || (timeLeft < 0)) {
        currentQuestionIndex++;
        renderQuiz();
    } else {
        renderScore();
    }
}

// Answer Status

var correctAnswer = function() {
    answerStatusEl.innerHTML = "<p> Correct! </p>";
}

var wrongAnswer = function() {
    answerStatusEl.innerHTML = "<p> Wrong! </p>";
}

var startQuiz = function () {
    countdown();
    currentQuestionIndex = 0;
    finalQuestion = questionAndAnswerArray.length - 1;
    startEl.style.display = "none";
    highScorePageEl.style.display = "none";
    highScorePageLinkEl.style.display = "block";
    renderQuiz();
    quizEl.style.display = "block";
}

function compareHighScores (a,b) {
    return b["highScore"] - a["highScore"];
}

var highScorePage = function () {
    // Need to hide everything else and activate the high score page

    initials = initialInput.nodeValue;
    highScore = highScoreSpan.textContent;
    highScoreObj = { "Initials": initials, "highScore": highScore };

    // sorting score accurately 
    highScoreArray.push(highScoreObj);
    highScoreArray = highScoreArray.sort(compareHighScores);

    // Display top 10 scores
    highScoreArray.splice(10);

    // assigning high score to local store
    localStorage.setItem("high-score", JSON.stringify(highScoreArray));

    // display list of highScores
    listOfHighScoresArr = JSON.parse(localStorage.getItem("high-score"));
    console.log(listOfHighScoresArr);
    for (let i = 0; i < listOfHighScoresArr.length -1; i++) {
        listOfInitialsEl.append(listOfHighScoresArr[i].Initials);
        listOfScoresEL.append(listOfHighScoresArr[i].highScore);
    }
    alert("Please check application local storage using chrome Dev tools for you High Scores, the high score page is under construction")
    highScorePageEl.style.display = "block";
}

startEl.style.display = "block";
startBtn.addEventListener("click", startQuiz);
highScoreSubmitBtn.addEventListener("click", highScorePage);
highScorePageLinkEl.addEventListener("click", highScorePage);