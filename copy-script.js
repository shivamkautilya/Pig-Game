//variable/constant declarations
const s0 = document.getElementById("score--0");
const s1 = document.getElementById("score--1");
const cs1 = document.getElementById("current--0");
const cs2 = document.getElementById("current--1");
const diceClassEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let currentScore = 0;
let activePlayer = 0;
let notActivePlayer = 1;
let scores = [0, 0];

//FUNCTIONS
//function to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  diceClassEl.classList.add("hidden");
  activePlayer = activePlayer === 0 ? 1 : 0;
  notActivePlayer = notActivePlayer === 1 ? 0 : 1;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  document
    .querySelector(`.player--${notActivePlayer}`)
    .classList.remove("player--active");
};
//rolldice function
const rollDice = function () {
  if (scores[activePlayer] < 100) {
    //1. Generate dice number between 1-6
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // console.log(diceNumber);
    //2.Display Dice Image in center
    diceClassEl.classList.remove("hidden");
    diceClassEl.src = `pig-game-img/dice-${diceNumber}.png`;
    //3. Show and add current score if dice != 1
    //4. If score is below 100 then let it work

    if (diceNumber != 1) {
      currentScore += diceNumber;
      // cs1.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  } else {
    winner();
  }
};
//function to declare winner
function winner() {
  console.log("Game Has Ended.");
  console.log(`Player ${activePlayer + 1} is winner.`);
  diceClassEl.classList.add("hidden");
  alert(`Player ${activePlayer + 1} is winner.`);
}

const btnHoldFunction = function () {
  // console.log("Hold button clicked");
  //1 Store currentscore into respected Player Score
  //verify if score = 100
  if (scores[activePlayer] < 100) {
    scores[activePlayer] += currentScore;
    if (activePlayer == 0) {
      // scores[0] += currentScore;
      if (scores[0] >= 100) {
        document.getElementById(`score--0`).textContent = scores[0];
        document
          .querySelector(".player--0")
          .classList.add("player--winner", "name");
        winner();
      } else {
        document.getElementById(`score--${activePlayer}`).textContent =
          scores[0];
        switchPlayer();
      }
    } else if (activePlayer == 1) {
      // scores[1] += currentScore;
      if (scores[1] >= 100) {
        document.getElementById(`score--1`).textContent = scores[1];
        document
          .querySelector(".player--1")
          .classList.add("player--winner", "name");
        winner();
      } else {
        document.getElementById(`score--${activePlayer}`).textContent =
          scores[1];
        switchPlayer();
      }
    } else {
      console.log(
        "Unknown Error:activePlayer value is more than 1.It should be either 0 or 1."
      );
    }
  } else {
    winner();
  }
};

const newGame = function () {
  s0.textContent = 0;
  s1.textContent = 0;
  cs1.textContent = 0;
  cs2.textContent = 0;
  diceClassEl.classList.add("hidden");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner", "name");
};
//setting default values to 0
s0.textContent = 0;
s1.textContent = 0;
diceClassEl.classList.add("hidden");

btnRoll.addEventListener("click", rollDice);
btnNew.addEventListener("click", newGame);
btnHold.addEventListener("click", btnHoldFunction);
