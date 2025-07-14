export function getIndex(x, y, size) {
  return y * size + x;
}

export function generateRandomFood(snake, size) {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
    };
  } while (snake.some((part) => part.x === food.x && part.y === food.y));
  return food;
}
