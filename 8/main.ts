import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("8/input.txt"), "utf-8");

const grid = input
  .split("\n")
  .map(line => line.split("").map(num => parseInt(num)));

const isTreeHeightVisible = (x: number, y: number) => {
  const treeHeight = grid[x][y];
  let left = true;
  let right = true;
  let up = true;
  let down = true;

  for (let i = 0; i < x; i++) {
    if (x === i) continue;
    if (grid[i][y] >= treeHeight) left = false;
  }
  if (left) return true;

  for (let i = x; i < grid.length; i++) {
    if (x === i) continue;
    if (grid[i][y] >= treeHeight) right = false;
  }
  if (right) return true;

  for (let k = 0; k < y; k++) {
    if (y === k) continue;
    if (grid[x][k] >= treeHeight) up = false;
  }
  if (up) return true;

  for (let k = y; k < grid[x].length; k++) {
    if (y === k) continue;
    if (grid[x][k] >= treeHeight) down = false;
  }
  if (down) return true;

  return false;
};

let scenicScores: number[] = [];

const getScenicScore = (x: number, y: number) => {
  const treeHeight = grid[x][y];
  let left = 0;
  let right = 0;
  let up = 0;
  let down = 0;

  for (let j = x - 1; j >= 0; j--) {
    left++;
    if (grid[j][y] >= treeHeight) break;
  }

  for (let j = x + 1; j < grid.length; j++) {
    right++;
    if (grid[j][y] >= treeHeight) break;
  }

  for (let k = y - 1; k >= 0; k--) {
    up++;
    if (grid[x][k] >= treeHeight) break;
  }

  for (let k = y + 1; k < grid[x].length; k++) {
    down++;
    if (grid[x][k] >= treeHeight) break;
  }

  const scenicScore = left * right * up * down;
  scenicScores.push(scenicScore);
};

let treeHeightsVisible = 0;

for (let x = 0; x < grid.length; x++) {
  for (let y = 0; y < grid[x].length; y++) {
    // We want to know when a treeHeight is visible not how many times it's visible
    if (isTreeHeightVisible(x, y)) treeHeightsVisible++;
    getScenicScore(x, y);
  }
}

console.log("Tree heights visible", treeHeightsVisible);
console.log("Highest scenic score", Math.max(...scenicScores));
