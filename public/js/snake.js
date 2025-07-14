export function moveSnake(snake, direction) {
  const head = { ...snake[0] };
  if (direction === "up") head.y--;
  if (direction === "down") head.y++;
  if (direction === "left") head.x--;
  if (direction === "right") head.x++;
  return head;
}

export function crashed(head, snake, size) {
  return (
    head.x < 0 ||
    head.x >= size ||
    head.y < 0 ||
    head.y >= size ||
    snake.some((part) => part.x === head.x && part.y === head.y)
  );
}
