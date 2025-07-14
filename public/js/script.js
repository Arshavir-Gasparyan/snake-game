import { keyMap } from "../constant.js";
import { crashed, moveSnake } from "./snake.js";
import { generateRandomFood, getIndex } from "./utils.js";

const sizeSelect = document.getElementById("board-size");
const startBtn = document.getElementById("start-button");
const board = document.getElementById("game-board");
const scoreElement = document.getElementById("score");
const gameOverMessage = document.getElementById("game-over");
const speedSelect = document.getElementById("speed-select");

let boardSize = Number(sizeSelect.value);
let snake = [];
let food = {};
let direction = "right";
let score = 0;
let speed = 150;
let isOver = false;
let timer = null;
const grid = [];

setupBoard(boardSize);

speedSelect.addEventListener("change", () => {
  speed = Number(speedSelect.value);
});

sizeSelect.addEventListener("change", () => {
  boardSize = Number(sizeSelect.value);
  setupBoard(boardSize);
});

startBtn.addEventListener("click", startGame);

document.addEventListener("keydown", handleKeyPress);

function setupBoard(size) {
  board.innerHTML = "";
  grid.length = 0;

  board.style.width = board.style.height = `${size * 20}px`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    board.appendChild(cell);
    grid.push(cell);
  }
}

function startGame() {
  clearInterval(timer);
  resetGameState();
  timer = setInterval(update, speed);
  draw();
}

function draw() {
  clearGrid();
  drawSnake();
  drawFood();
}

function clearGrid() {
  grid.forEach((cell) => (cell.className = "cell"));
}

function drawSnake() {
  snake.forEach((part) => {
    const index = getIndex(part.x, part.y, boardSize);
    if (grid[index]) {
      grid[index].classList.add("snake");
    }
  });
}

function drawFood() {
  const foodIndex = getIndex(food.x, food.y, boardSize);
  if (grid[foodIndex]) {
    grid[foodIndex].classList.add("food");
  }
}

function update() {
  if (isOver) {
    clearInterval(timer);
    gameOverMessage.style.display = "block";
    return;
  }

  const head = moveSnake(snake, direction);
  const isCrashed = crashed(head, snake, boardSize);

  if (isCrashed) {
    isOver = true;
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    food = generateRandomFood(snake, boardSize);
  } else {
    snake.pop();
  }

  draw();
}

function resetGameState() {
  const mid = Math.floor(boardSize / 2);
  snake = [
    { x: 4, y: mid },
    { x: 3, y: mid },
    { x: 2, y: mid },
  ];
  direction = "right";
  score = 0;
  isOver = false;
  food = generateRandomFood(snake, boardSize);

  scoreElement.textContent = `Score: ${score}`;
  scoreElement.style.display = "block";
  gameOverMessage.style.display = "none";
}

function handleKeyPress(e) {
  if (isOver) return;
  const move = keyMap[e.key];

  if (move && direction !== move.opposite) {
    direction = move.direction;
  }
}
