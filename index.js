const options = [
  {
    value: "rock",
    losesTo: "paper",
    beats: "scissors",
  },
  {
    value: "paper",
    losesTo: "scissors",
    beats: "rock",
  },
  {
    value: "scissors",
    losesTo: "rock",
    beats: "paper",
  },
];

const score = {
  Player: 0,
  Computer: 0,
}

function createAttachDisplayDiv(text, parentDiv) {
  const div = document.createElement("div");
  div.classList.add("moves");
  div.innerText = text;
  parentDiv.appendChild(div);
  return div;
}

function playAsComputer(moves) {
  const randomNum = Math.floor(Math.random() * moves.length);
  return moves[randomNum].value;
}

function determineRoundWinner(playerSelection, computerSelection) {
  const capitalizedWord = playerSelection.value[0].toUpperCase() + playerSelection.value.substring(1);
  if (playerSelection.losesTo === computerSelection) {
    score.Computer++;
    if (playerSelection.value === "scissors") {
      return `You lose! ${capitalizedWord} lose to ${computerSelection}`;
    } else {
      return `You lose! ${capitalizedWord} loses to ${computerSelection}`;
    }
  } else if (playerSelection.beats === computerSelection) {
    score.Player++;
    if (playerSelection.value === "scissors") {
      return `You win! ${capitalizedWord} beat ${computerSelection}`;
    } else {
      return `You win! ${capitalizedWord} beats ${computerSelection}`;
    }
  }
}

function playRound(moves, radioSelection, parentDiv) {
  const playerMove = moves.find(item => item.value === radioSelection);
  let computerMove = playAsComputer(moves);
  while (computerMove === radioSelection) {
    computerMove = playAsComputer(moves);
  }
  const round = determineRoundWinner(playerMove, computerMove);
  createAttachDisplayDiv(round, parentDiv);
}

const gameDiv = document.querySelector(".game");
const submitButton = document.querySelector("button");
const radioInputNodes = document.querySelectorAll(".radio input");

let playerSelection = "";
let counter = 5;

radioInputNodes.forEach(node => node.addEventListener("change", () => {
  playerSelection = node.value;
}));

submitButton.addEventListener("click", () => {
  if (counter > 0 && playerSelection.length > 0) {
    counter--;
    playRound(options, playerSelection, gameDiv);
    if (counter === 0) {
      const sortedScore = Object.entries(score).sort((a, b) => b[1] - a[1]);
      const text = `${sortedScore[0][0]} wins ${sortedScore[0][1]} to ${sortedScore[1][1]}!`;
      createAttachDisplayDiv(text, gameDiv).classList.add("final_score");
    } else {
      const currentlyCheckedRadio = document.querySelector(`input[value="${playerSelection}"]`);
      currentlyCheckedRadio.checked = false;
      playerSelection = "";
    }
  }
});
