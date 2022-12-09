import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("9/input.txt"), "utf-8");
const lines = input.split("\n");

const snake1 = Array.from({ length: 2 }, () => ({ row: 0, col: 0 }));
const snake2 = Array.from({ length: 10 }, () => ({ row: 0, col: 0 }));

const snake1Visited = new Set<string>();
const snake2Visited = new Set<string>();

snake1Visited.add(
  `${snake1[snake1.length - 1].row},${snake1[snake1.length - 1].col}`
);
snake2Visited.add(
  `${snake1[snake1.length - 1].row},${snake1[snake1.length - 1].col}`
);

const moveSnake = (
  direction: string,
  snake: typeof snake1,
  visited: typeof snake1Visited
) => {
  let head = snake[0];

  if (direction === "U") head = { row: head.row - 1, col: head.col };
  if (direction === "D") head = { row: head.row + 1, col: head.col };
  if (direction === "L") head = { row: head.row, col: head.col - 1 };
  if (direction === "R") head = { row: head.row, col: head.col + 1 };

  snake[0] = head;

  for (let i = 1; i < snake.length; i++) {
    let head = snake[i - 1];
    let tail = snake[i];

    const rowDiff = Math.abs(head.row - tail.row);
    const colDiff = Math.abs(head.col - tail.col);

    if (rowDiff > colDiff) {
      if (head.row - tail.row > 1) tail = { row: tail.row + 1, col: head.col };
      if (tail.row - head.row > 1) tail = { row: tail.row - 1, col: head.col };
    } else if (rowDiff < colDiff) {
      if (head.col - tail.col > 1) tail = { row: head.row, col: tail.col + 1 };
      if (tail.col - head.col > 1) tail = { row: head.row, col: tail.col - 1 };
    } else if (rowDiff > 1) {
      if (head.row - tail.row > 1) tail = { row: tail.row + 1, col: tail.col };
      if (tail.row - head.row > 1) tail = { row: tail.row - 1, col: tail.col };
      if (head.col - tail.col > 1) tail = { row: tail.row, col: tail.col + 1 };
      if (tail.col - head.col > 1) tail = { row: tail.row, col: tail.col - 1 };
    }

    snake[i] = tail;
    if (i === snake.length - 1) visited.add(`${tail.row},${tail.col}`);
  }
};

for (const line of lines) {
  const [dir, amount] = line.split(" ");
  const num = parseInt(amount);

  for (let i = 0; i < num; i++) {
    moveSnake(dir, snake1, snake1Visited);
    moveSnake(dir, snake2, snake2Visited);
  }
}

console.log("Total tail visits", snake1Visited.size);
console.log("Total tail visits", snake2Visited.size);
