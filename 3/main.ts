import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("3/input.txt"), "utf-8").split("\n");

const getNumberForLetter = (letter: string) => {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const index = letters.indexOf(letter);

  if (index === -1) return 0;

  return index + 1;
};

let sum = 0;

input.forEach(line => {
  const half = line.length / 2;
  const firstHalf = line.substring(0, half);
  const secondHalf = line.substring(half, line.length);

  const firstHalfArr = firstHalf.split("");
  const secondHalfArr = secondHalf.split("");

  let letterMatch = 0;

  firstHalfArr.forEach(letter => {
    const num = getNumberForLetter(letter);
    if (secondHalfArr.includes(letter)) letterMatch = num;
  });

  sum += letterMatch;
});

let groupSum = 0;

for (let i = 0; i < input.length; i += 3) {
  const group = input.slice(i, i + 3);
  const letterArrays = group.map(str => str.split(""));

  let letterMatch = 0;

  letterArrays[0].forEach(letter => {
    if (letterArrays[1].includes(letter) && letterArrays[2].includes(letter))
      letterMatch = getNumberForLetter(letter);
  });

  groupSum += letterMatch;
}

console.log("Sum of priorities", sum);
console.log("Sum of groups", groupSum);
