import { readFileSync } from "fs";
import { resolve } from "path";

const input = readFileSync(resolve("14/input.txt"), "utf-8");
const lines = input.split("\n");

const map = new Map<string, string>();
let highestRow = 0;

for (const line of lines) {
  const parts = line.split(" -> ");

  for (let i = 1; i < parts.length; i++) {
    const [startCol, startRow] = parts[i - 1].split(",").map(Number);
    const [endCol, endRow] = parts[i].split(",").map(Number);

    if (startCol !== endCol) {
      for (
        let j = Math.min(startCol, endCol);
        j <= Math.max(startCol, endCol);
        j++
      ) {
        map.set(JSON.stringify({ row: startRow, col: j }), "#");
      }
    } else {
      for (
        let j = Math.min(startRow, endRow);
        j <= Math.max(startRow, endRow);
        j++
      ) {
        map.set(JSON.stringify({ row: j, col: startCol }), "#");
      }
    }

    if (endRow > highestRow) {
      highestRow = endRow;
    }

    if (startRow > highestRow) {
      highestRow = startRow;
    }
  }
}

// Simulate sand
let fallingIntoAbyss = false;
let sandBits = 0;

while (!fallingIntoAbyss) {
  let sand = { row: 0, col: 500 };
  let resting = false;

  while (!resting) {
    const below = { row: sand.row + 1, col: sand.col };

    if (below.row > highestRow) {
      fallingIntoAbyss = true;
      break;
    }

    if (!map.has(JSON.stringify(below))) {
      sand = below;
      continue;
    }

    const belowLeft = { row: sand.row + 1, col: sand.col - 1 };
    if (!map.has(JSON.stringify(belowLeft))) {
      sand = belowLeft;
      continue;
    }

    const belowRight = { row: sand.row + 1, col: sand.col + 1 };
    if (!map.has(JSON.stringify(belowRight))) {
      sand = belowRight;
      continue;
    }

    resting = true;
    map.set(JSON.stringify(sand), "o");
    sandBits++;
  }
}

console.log(map);
console.log("Sand resting", sandBits);
