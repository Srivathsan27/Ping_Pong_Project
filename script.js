
KeyW
script.js:57  KeyA
script.js:57  KeyS
script.js:57  KeyD
script.js:57  ArrowUp
script.js:57  ArrowLeft
script.js:57  ArrowDown
script.js:57  ArrowRight
*/

const ball = document.querySelector(".ball");
const field = document.querySelector(".board-container");
const board1 = document.querySelector(".board-1");
const board2 = document.querySelector(".board-2");
const player1 = document.getElementById("player-1");
const player2 = document.getElementById("player-2");
const hitContainer = document.querySelector(".number-of-hits");

let ballProperties = ball.getBoundingClientRect();
let fieldProperties = field.getBoundingClientRect();
let board1Properties = board1.getBoundingClientRect();
let board2Properties = board2.getBoundingClientRect();
let hit = 0;

let xAmount = 5;
let yAmount = 10;

hitContainer.textContent = 0;
const changeBallPos = function (xAmount, yAmount) {
  ballProperties = ball.getBoundingClientRect();
  ball.style.bottom = `${
    Math.trunc(fieldProperties.bottom - ballProperties.bottom) + yAmount
  }px`;
  ball.style.left = `${
    board1Properties.width +
    Math.trunc(ballProperties.left - fieldProperties.left) +
    xAmount
  }px`;
};

document.addEventListener("keydown", function (e) {
  board1Properties = board1.getBoundingClientRect();
  board2Properties = board2.getBoundingClientRect();
  if (e.code === "ArrowUp" || e.code === "ArrowDown") {
    if (
      board1Properties.top >= fieldProperties.top &&
      board1Properties.bottom <= fieldProperties.bottom
    ) {
      board1.style.bottom = `${
        Math.trunc(fieldProperties.bottom - board1Properties.bottom) +
        (e.code == "ArrowUp" ? 5 : -5)
      }px`;
    } else if (board1Properties.top < fieldProperties.top) {
      if (e.code === "ArrowDown")
        board1.style.bottom = `${
          Math.trunc(fieldProperties.bottom - board1Properties.bottom) - 5
        }px`;
    } else {
      if (e.code === "ArrowUp")
        board1.style.bottom = `${
          Math.trunc(fieldProperties.bottom - board1Properties.bottom) + 5
        }px`;
    }
  } else {
    if (
      board2Properties.top >= fieldProperties.top &&
      board2Properties.bottom <= fieldProperties.bottom
    ) {
      board2.style.bottom = `${
        Math.trunc(fieldProperties.bottom - board2Properties.bottom) +
        (e.code == "KeyW" ? 5 : -5)
      }px`;
    } else if (board2Properties.top < fieldProperties.top) {
      if (e.code === "KeyS")
        board2.style.bottom = `${
          Math.trunc(fieldProperties.bottom - board2Properties.bottom) - 5
        }px`;
    } else {
      if (e.code === "KeyW")
        board2.style.bottom = `${
          Math.trunc(fieldProperties.bottom - board2Properties.bottom) + 5
        }px`;
    }
  }
});

let t = setInterval(function () {
  ballProperties = ball.getBoundingClientRect();
  hitContainer.textContent = hit;
  if (
    ballProperties.top <= fieldProperties.top ||
    ballProperties.bottom >= fieldProperties.bottom
  ) {
    yAmount *= -1;
  }
  if (ballProperties.right > fieldProperties.right) {
    if (
      ballProperties.top >= board2Properties.top &&
      ballProperties.bottom <= board2Properties.bottom
    ) {
      xAmount *= -1;
      yAmount *= 2 * Math.random();
      hit++;
    } else {
      player1.textContent = "Winner!!!";
      clearInterval(t);
    }
  } else if (ballProperties.left < fieldProperties.left) {
    if (
      ballProperties.top >= board1Properties.top &&
      ballProperties.bottom <= board1Properties.bottom
    ) {
      xAmount *= -1;
      yAmount *= 2 * Math.random();
      hit++;
    } else {
      player2.textContent = "Winner!!!";
      clearInterval(t);
    }
  }
  changeBallPos(xAmount, yAmount);
}, 60);
