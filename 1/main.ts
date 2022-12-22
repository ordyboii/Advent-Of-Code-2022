import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.resolve("1/input.txt"), "utf-8")
  .split("\n\n");

const groups = input.map(line => line.split("\n").map(str => parseInt(str)));
const totals = groups.map(group =>
  group.reduce((sum, value) => sum + value, 0)
);

console.log("Highest Total Calories", Math.max(...totals));

const combinedTotals = totals
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b, 0);

console.log("Combined Total", combinedTotals);
