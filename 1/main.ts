import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("1/input.txt"), "utf-8").split("\n");

let group: string[] = [];
let totals: number[] = [];

input.forEach(calorie => {
  // Checks for empty string created by splitting on a new line
  if (calorie === "") {
    const groupTotal = group.reduce((a, b) => a + parseInt(b), 0);
    totals.push(groupTotal);
    // Reset group array to make room for the next one
    group = [];
  }
  if (calorie !== "") group.push(calorie);
});

console.log("Highest Total Calories", Math.max(...totals));

const combinedTotals = totals
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b, 0);

console.log("Combined Total", combinedTotals);
