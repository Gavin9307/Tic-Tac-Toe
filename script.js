let gameInfo = document.querySelector("[data-gameInfo]");
let gameContainer = document.querySelector("game-container");
let boxes = document.querySelectorAll(".box");
let newGameButton = document.querySelector(".btn");

let currentPlayer;
let gameBoard;
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameInfo.innerText = `Current User - ${currentPlayer}`;
  newGameButton.classList.remove("active");
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
  });
}

initGame();

function swapTurn() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current User - ${currentPlayer}`;
}

function goalTest() {
  let answer = "";
  winningPositions.forEach((position) => {
    if (
      (gameBoard[position[0]] != "" ||
        gameBoard[position[1]] != "" ||
        gameBoard[position[2]] != "") &&
      gameBoard[position[0]] == gameBoard[position[1]] &&
      gameBoard[position[1]] == gameBoard[position[2]]
    ) {
      if (gameBoard[position[0]] == "X") {
        answer = "X";
      } else {
        answer = "O";
      }
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  if (answer != "") {
    if (currentPlayer=='X'){
        currentPlayer='O';
    }
    else {
        currentPlayer='X';
    }
    gameInfo.innerText = `Winner Player - ${currentPlayer}`;
    newGameButton.classList.add("active");
  }

  // Draw Condition
  let n = 0;
  gameBoard.forEach((box)=>{
    if(box != ""){
        n++;
    }
  })
  if(n==9 && answer == ""){
    gameInfo.innerText = `Draw`;
    newGameButton.classList.add("active");
  }

}

function handleClick(index) {
  if (gameBoard[index] == "") {
    boxes[index].innerText = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    gameBoard[index] = currentPlayer;
    swapTurn();
    goalTest();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameButton.addEventListener("click", () => {
  initGame();
  boxes.forEach((box) => {
    box.classList.remove("win");
  });
});
