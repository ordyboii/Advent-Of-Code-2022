import { readFileSync } from "fs";
import { resolve } from "path";

const input = readFileSync(resolve("15/input.txt"), "utf-8");

type Line = { sx: number; sy: number; bx: number; by: number };
const lines = input.split("\n");
const parsedLines: Line[] = [];

for (const line of lines) {
  const parts = line.split(" ");

  const sx = parseInt(parts[2].split("=")[1]);
  const sy = parseInt(parts[3].split("=")[1]);
  const bx = parseInt(parts[8].split("=")[1]);
  const by = parseInt(parts[9].split("=")[1]);

  parsedLines.push({ sx, sy, bx, by });
}

// PART 1
const lineToFind = 2000000;
const invalidPoints = new Set<string>();
const beaconsToExclude = new Set<string>();

// Helper to calc Manhatten distance (the distance between two points measured along axes at right angles)
const getDistance = (line: Line) => {
  return Math.abs(line.sx - line.bx) + Math.abs(line.sy - line.by);
};

const getRemaining = (line: Line, distance: number, y: number) => {
  let remaining = 0;

  if (line.sy > y) {
    remaining = distance - (line.sy - lineToFind);
  } else {
    remaining = distance - (lineToFind - line.sy);
  }

  return remaining;
};

for (const line of parsedLines) {
  const { sx, bx, by } = line;

  if (by === lineToFind) {
    beaconsToExclude.add(`${by},${bx}`);
  }

  const distance = getDistance(line);
  const remaining = getRemaining(line, distance, lineToFind);

  if (remaining < 0) {
    continue;
  }

  for (let i = 0; i <= remaining; i++) {
    invalidPoints.add(`${sx + i}`);
    invalidPoints.add(`${sx - i}`);
  }
}

console.log("Beacon positions", invalidPoints.size - beaconsToExclude.size);

// PART 2
const skipOverLine = (line: Line, x: number, y: number) => {
  const distance = getDistance(line);
  const remaining = getRemaining(line, distance, y);

  if (x >= line.sx - remaining && x <= line.sx + remaining) {
    return line.sx + remaining + 1;
  }

  return x;
};

const max = 4000000;
for (let i = 0; i < max; i++) {
  let x = 0;
  while (x <= max) {
    let newX = x;
    for (const line of parsedLines) {
      newX = skipOverLine(line, x, i);
      if (x !== newX) {
        break;
      }
    }

    if (newX === x) {
      console.log("Tuning frequency", x * max + i);
      i = max + 1;
      break;
    }

    x = newX;
  }
}
