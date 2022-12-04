import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.resolve("4/input.txt"), "utf-8")
  .split("\n")
  .map(line => line.split(","));

let contained = 0;
let overlaps = 0;

input.forEach(pair => {
  const [s1, e1] = pair[0].split("-").map(s => parseInt(s));
  const [s2, e2] = pair[1].split("-").map(s => parseInt(s));

  // the inner range is contained within the outer range
  if (s1 >= s2 && e1 <= e2) contained++;
  // the second range is contained within the first range
  else if (s2 >= s1 && e2 <= e1) contained++;

  // Overlaps
  const overlapStart = Math.max(s1, s2);
  const overlapEnd = Math.min(e1, e2);

  if (overlapStart <= overlapEnd) overlaps++;
});

console.log("Total contained", contained);
console.log("Total overlaped", overlaps);
