// THIS DIDN'T WORK, USED A SIMPLER AND FASTER SOLUTION USING MAPS

import { readFileSync } from "fs";
import { resolve } from "path";

const input = readFileSync(resolve("14/input.txt"), "utf-8");

const scan = input
  .split("\n")
  .map(line =>
    line.split(" -> ").map(pair => pair.split(",").map(num => parseInt(num)))
  );

const xScanCoords: number[] = [];
const scanYCoords: number[] = [];

scan.forEach(line => {
  for (const coord of line) {
    xScanCoords.push(coord[0]);
    scanYCoords.push(coord[1]);
  }
});

const minRowSize = Math.min(...xScanCoords);
const maxRowSize = Math.max(...xScanCoords);
const maxX = maxRowSize - minRowSize;
const maxH = Math.max(...scanYCoords);

const drawLine = (start: number[], end: number[], grid: string[][]) => {
  let [x1, y1] = start;
  let [x2, y2] = end;

  // If the line is vertical, make sure the second point has a higher x coordinate
  if (x1 === x2 && y1 > y2) [y1, y2] = [y2, y1];
  // If the line is horizontal, make sure the second point has a higher y coordinate
  if (y1 === y2 && x1 > x2) [x1, x2] = [x2, x1];

  // Check if the line is vertical
  if (x1 === x2) {
    for (let y = y1; y <= y2; y++) grid[y][x1] = "#";
  } else if (y1 === y2) {
    for (let x = x1; x <= x2; x++) grid[y1][x] = "#";
  }

  return grid;
};

const fillCave = (grid: string[][]) => {
  scan.forEach(line => {
    for (let i = 1; i < line.length; i++) {
      const [x1, y1] = line[i - 1];
      const [x2, y2] = line[i];

      // Check if we get the last value as it will modulus to zero so we put it to the end instead
      let translatedX = (x1 - minRowSize) % maxX;
      if (x1 - minRowSize >= maxX) translatedX = maxX;
      // Gives index position on the row range;
      // e.g. 494 -> 503 is length of 9 therefore 500 would be index 6
      const start = [translatedX, y1];
      const end = [(x2 - minRowSize) % maxX, y2];

      drawLine(start, end, grid);
    }
  });

  return grid;
};

const simulateSand = (grid: string[][]) => {
  const sand = [(500 - minRowSize) % maxX, 0];
  grid[sand[1]][sand[0]] = "+";

  let startX = sand[0];
  let startY = sand[1];

  let sandCount = 0;

  while (startY < grid.length) {
    if (
      startY === grid.length - 1 ||
      startY < 0 ||
      startX > grid[0].length - 1 ||
      startX < 0
    )
      break;

    if (grid[startY + 1][startX] === ".") {
      startY += 1;
    } else if (grid[startY + 1][startX - 1] === ".") {
      startY += 1;
      startX -= 1;
    } else if (grid[startY + 1][startX + 1] === ".") {
      startY += 1;
      startX += 1;
    } else if (startY >= grid.length - 1 || startX === 0) {
      break;
    } else {
      grid[startY][startX] = "o";
      sandCount++;

      startX = sand[0];
      startY = sand[1];

      const debug = cave.forEach(row => console.log(row.join(" ")));
      console.log(debug, sandCount);
    }
  }

  return sandCount;
};

const grid: string[][] = Array.from({ length: maxH + 1 }, () =>
  Array(maxX + 1).fill(".")
);

const cave = fillCave(grid);
const count = simulateSand(cave);

console.log(count);
