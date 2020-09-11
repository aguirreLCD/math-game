const problemElement = document.querySelector(".problem");
const ourForm = document.querySelector(".our-form");
const ourField = document.querySelector(".our-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const progressBar = document.querySelector(".progress-inner");
const endMessage = document.querySelector(".end-message");
const resetButton = document.querySelector(".reset-button");

// store state
let stateProblem = {
  score: 0,
  wrongAnswers: 0,
};

// generate a new problem, store in state and then render it to the user intarface
function updateProblem() {
  stateProblem.currentProblem = generateProblem();
  problemElement.innerHTML = `${stateProblem.currentProblem.firstNumber} ${stateProblem.currentProblem.operator} ${stateProblem.currentProblem.secondNumber}`;

  //clear up the input to make empty
  ourField.value = "";
  ourField.focus();
}

updateProblem();

function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}

function generateProblem() {
  return {
    firstNumber: generateNumber(10),
    secondNumber: generateNumber(10),
    operator: ["+", "-", "x"][generateNumber(2)],
  };
}

ourForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  let correctAnswer;

  const actualProblem = stateProblem.currentProblem;

  if (stateProblem.currentProblem.operator == "+")
    correctAnswer = actualProblem.firstNumber + actualProblem.secondNumber;
  if (stateProblem.currentProblem.operator == "-")
    correctAnswer = actualProblem.firstNumber - actualProblem.secondNumber;
  if (stateProblem.currentProblem.operator == "x")
    correctAnswer = actualProblem.firstNumber * actualProblem.secondNumber;

  if (parseInt(ourField.value, 10) === correctAnswer) {
    stateProblem.score++;
    pointsNeeded.textContent = 10 - stateProblem.score;
    updateProblem();
    renderProgressBar();
  } else {
    stateProblem.wrongAnswers++;
    mistakesAllowed.textContent = 2 - stateProblem.wrongAnswers;
    problemElement.classList.add("animate-wrongAnswer");
    setTimeout(
      () => problemElement.classList.remove("animate-wrongAnswer"),
      420
    );
  }

  // logic to win / lose
  checkLogic();
}

function checkLogic() {
  // if you won
  if (stateProblem.score === 10) {
    endMessage.textContent = "Bravo! You won! Congrats!";
    document.body.classList.add("overlay-is-open");
    setTimeout(() => resetButton.focus(), 331);
  }

  // if you lost
  if (stateProblem.wrongAnswers === 3) {
    endMessage.textContent =
      "Sorry! You just lost the game. But you can try again!";
    document.body.classList.add("overlay-is-open");
    setTimeout(() => resetButton.focus(), 331);
  }
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
  document.body.classList.remove("overlay-is-open");
  updateProblem();
  stateProblem.score = 0;
  stateProblem.wrongAnswers = 0;
  pointsNeeded.textContent = 10;
  mistakesAllowed.textContent = 2;
  renderProgressBar();
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${stateProblem.score / 10})`;
}
