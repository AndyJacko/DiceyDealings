const gameSelector = document.getElementById("game-selector");
const newGameSelector = document.getElementById("new-game");

const oneP = document.getElementById("one-player");
const twoP = document.getElementById("two-player");
const onePGame = document.getElementById("game-container-one");
const twoPGame = document.getElementById("game-container-two");

const scoreContainer = document.getElementById("score-container");

const holdEl = document.getElementById("hold");
const holdingEl = document.getElementById("holding");

const dice = document.getElementById("dice-img");
const roll = document.getElementById("roll");
const message = document.getElementById("message");
const retry = document.getElementById("retry");

const diceroll = document.getElementById("dice-roll");
const win = document.getElementById("win");
const lose = document.getElementById("lose");

let p1score = 0;
let p2score = 0;
let holding = 0;
let gameType;

const newGame = () => {
  resetGame();
  onePGame.classList.add("hide");
  twoPGame.classList.add("hide");
  roll.classList.add("hide");
  newGameSelector.classList.add("hide");
  gameSelector.classList.remove("hide");

  if (gameType === 1) {
    const el = document.getElementById("one-player-score");
    scoreContainer.removeChild(el);
  } else {
    const el1 = document.getElementById("player-one-score");
    const el2 = document.getElementById("player-two-score");
    scoreContainer.removeChild(el1);
    scoreContainer.removeChild(el2);
  }
};

const whoWins = () => {
  if (p1score === p2score) {
    message.textContent = "ITS A DRAW";

    lose.pause();
    lose.currentTime = 0;
    lose.play();
  } else {
    if (p1score > p2score) {
      message.textContent = "PLAYER 1 WINS";
    } else {
      message.textContent = "PLAYER 2 WINS";
    }

    win.pause();
    win.currentTime = 0;
    win.play();
  }

  roll.classList.add("hide");
  holdingEl.classList.add("hide");
  message.classList.remove("hide");
  retry.classList.remove("hide");
  newGameSelector.classList.remove("hide");
};

const calculateScore = (num) => {
  if (gameType === 1) {
    if (num === 1) {
      roll.classList.add("hide");
      message.textContent = "YOU LOSE!";
      message.classList.remove("hide");
      retry.classList.remove("hide");
      newGameSelector.classList.remove("hide");

      lose.pause();
      lose.currentTime = 0;
      lose.play();
    } else {
      if (p1score >= 21) {
        roll.classList.add("hide");
        message.textContent = "YOU WIN!";
        message.classList.remove("hide");
        retry.classList.remove("hide");
        newGameSelector.classList.remove("hide");

        win.pause();
        win.currentTime = 0;
        win.play();
      }
    }
  } else {
    if (holding === 0) {
      if (num === 1) {
        console.log("Player 1 got 1...score reset...");
        const scoreEl = document.querySelector("#player-one-score .score");
        scoreEl.textContent = 0;
        p1score = 0;
        holding = 1;
      } else {
        if (p1score >= 15) {
          if (p1score >= 21) {
            hold();
          } else {
            if (holding === 0) {
              holdEl.classList.remove("hide");
            }
          }
        }
      }
    } else {
      if (num === 1) {
        console.log("Player 2 got 1...score reset...");
        const scoreEl = document.querySelector("#player-two-score .score");
        scoreEl.textContent = 0;
        p2score = 0;
        whoWins();
      } else {
        if (p2score >= 21) {
          whoWins();
        }
      }
    }
  }
};

const hold = () => {
  holdEl.classList.add("hide");
  holdingEl.classList.remove("hide");
  holding = 1;
};

const resetGame = () => {
  p1score = 0;
  p2score = 0;
  holding = 0;

  if (gameType === 1) {
    const scoreEl = document.getElementById("one-player-score");
    scoreEl.textContent = 0;
  } else {
    const scoreEl1 = document.querySelector("#player-one-score .score");
    const scoreEl2 = document.querySelector("#player-two-score .score");
    scoreEl1.textContent = 0;
    scoreEl2.textContent = 0;
  }

  dice.classList.add("hide");
  message.classList.add("hide");
  holdingEl.classList.add("hide");
  retry.classList.add("hide");
  newGameSelector.classList.add("hide");
  roll.classList.remove("hide");
  dice.src = `./images/dice/dice1.png`;
};

const rollDice = (p, el) => {
  const num = Math.ceil(Math.random() * 6);
  const scoreEl = document.querySelector(el);
  const interval = setInterval(() => {
    dice.src = `./images/dice/dice${Math.ceil(Math.random() * 6)}.png`;
  }, 100);

  holdEl.classList.add("hide");

  diceroll.pause();
  diceroll.currentTime = 0;
  diceroll.play();

  roll.classList.add("hide");
  setTimeout(() => {
    clearTimeout(interval);
    dice.src = `./images/dice/dice${num}.png`;
    roll.classList.remove("hide");

    if (p === 1) {
      p1score += num;
      scoreEl.textContent = p1score;
    } else {
      p2score += num;
      scoreEl.textContent = p2score;
    }

    calculateScore(num);
  }, 2000);
};

const playGame = () => {
  dice.classList.remove("hide");

  if (gameType === 1) {
    rollDice(1, "#one-player-score");
  } else {
    if (holding === 0) {
      rollDice(1, "#player-one-score .score");
    } else {
      rollDice(2, "#player-two-score .score");
    }
  }
};

oneP.addEventListener("click", () => {
  const onePScore = document.createElement("div");
  onePScore.id = "one-player-score";
  onePScore.classList.add("score");
  onePScore.textContent = "0";

  scoreContainer.appendChild(onePScore);

  gameType = 1;
  gameSelector.classList.add("hide");
  onePGame.classList.remove("hide");
  roll.classList.remove("hide");
});

twoP.addEventListener("click", () => {
  const pOneScore = document.createElement("div");
  const PlayerOne = document.createElement("p");
  const PlayerOneScore = document.createElement("p");
  pOneScore.id = "player-one-score";
  pOneScore.style.margin = "0 30px";
  PlayerOne.textContent = "PLAYER 1";
  PlayerOneScore.textContent = "0";
  PlayerOneScore.classList.add("score");

  pOneScore.appendChild(PlayerOne);
  pOneScore.appendChild(PlayerOneScore);

  const pTwoScore = document.createElement("div");
  const PlayerTwo = document.createElement("p");
  const PlayerTwoScore = document.createElement("p");
  pTwoScore.id = "player-two-score";
  pTwoScore.style.margin = "0 30px";
  PlayerTwo.textContent = "PLAYER 2";
  PlayerTwoScore.textContent = "0";
  PlayerTwoScore.classList.add("score");

  pTwoScore.appendChild(PlayerTwo);
  pTwoScore.appendChild(PlayerTwoScore);

  scoreContainer.appendChild(pOneScore);
  scoreContainer.appendChild(pTwoScore);

  gameType = 2;
  gameSelector.classList.add("hide");
  twoPGame.classList.remove("hide");
  roll.classList.remove("hide");
});
