// Timer
var questionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var optionEl = document.getElementById("options");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var highscoreInitialEl = document.getElementById("initials");
var solutionEl = document.getElementById("solution");




function quiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    questionsEl.removeAttribute("class");

    // start timer
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;

    question();
}

function question() {
    // current question
    var pregunta = questionAndAnswerArray[questionIndex];

    var questionEl = document.getElementById("question");
    questionEl.textContent = pregunta.question;

    optionEl.innerHTML = "";


    pregunta.options.forEach(function(option, i) {
        
        var optioinNode = document.createElement("button");
        optioinNode.setAttribute("class", "options");
        optioinNode.setAttribute("value", option);

        optioinNode.textContent = i + 1 + ". " + option;
        optioinNode.onclick = questionClick;
        optionEl.appendChild(optioinNode);
    });
    
}



function questionClick() {

    console.log(this.value);
    // check if user guessed wrong
    if (this.value !== questionAndAnswerArray[questionIndex].correctAnswer) {
        // penalize time
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        // display new time on page
        timerEl.textContent = time;

        solutionEl.textContent = "Wrong!";
    } else {
        solutionEl.textContent = "Correct!";
    }

    solutionEl.setAttribute("class", "solution");
    setTimeout(function () {
        solutionEl.setAttribute("class", "solution hide");
    }, 1000);

    // Next question
    questionIndex++;

    // check if we've run out of questions
    if (questionIndex === questionAndAnswerArray.length) {
        endQuiz();
    } else {
        getQuestion();
    }
}

function endQuiz() {
    // stop timer
    clearInterval(timerId);

    // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    // hide questions section
    questionsEl.setAttribute("class", "hide");
}
function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;

    // check if user ran out of time
    if (time <= 0) {
        endQuiz();
    }
}

function saveHighscore() {

    var initials = highscoreInitialEl.value.trim();


    if (initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            score: time,
            initials: initials
        };
        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

startBtn.onclick = quiz;


