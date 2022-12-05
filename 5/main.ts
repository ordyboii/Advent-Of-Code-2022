import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.resolve("5/input.txt"), "utf-8")
  .split("\n\n");

const drawing = input[0].split("\n");
const stacks: string[][] = Array(9).map(() => []);

const parseFourthCharacter = (str: string) => {
  let result = "";
  for (let i = 1; i < str.length; i += 4) result += str[i];

  return result;
};

for (let i = 0; i < 8; i++) {
  const line = drawing[i];
  const crates = parseFourthCharacter(line);

  for (let j = 0; j < crates.length; j++) {
    if (!stacks[j]) stacks[j] = [];
    if (crates[j] !== " ") stacks[j].push(crates[j]);
  }
}

// Reverse stacks to get the order in the drawing
stacks.map(stack => stack.reverse());

const commands = input[1].split("\n");

commands.forEach(line => {
  const tokens = line.split(" ");
  // Parse the commands
  const num = parseInt(tokens[1]);
  const from = parseInt(tokens[3]) - 1;
  const to = parseInt(tokens[5]) - 1;

  for (let i = 0; i < num; i++) {
    // Remove last element from stack and append to another stack
    const crateToMove = stacks[from].pop();
    stacks[to].push(crateToMove!);
  }
});

// Get last element of array, map over it and join it into a string with no spaces
const message = stacks.map(stack => stack[stack.length - 1]).join("");
console.log("Reconfiguration message", message);

// Part 2 needs a new stack as the previous stacks array has been modified
const newStacks: string[][] = Array(9).map(() => []);

for (let i = 0; i < 8; i++) {
  const line = drawing[i];
  const crates = parseFourthCharacter(line);

  for (let j = 0; j < crates.length; j++) {
    if (!newStacks[j]) newStacks[j] = [];
    if (crates[j] !== " ") newStacks[j].push(crates[j]);
  }
}

// Reverse stacks to get the order in the drawing
newStacks.map(stack => stack.reverse());

commands.forEach(line => {
  const tokens = line.split(" ");
  // Parse the commands
  const num = parseInt(tokens[1]);
  const from = parseInt(tokens[3]) - 1;
  const to = parseInt(tokens[5]) - 1;

  // Create a temporary array to hold the crates to be moved
  const cratesToMove: string[] = [];

  for (let i = 0; i < num; i++) {
    // Remove last element from stack and append to temporary array
    const crateToMove = newStacks[from].pop();
    cratesToMove.push(crateToMove!);
  }

  for (let i = 0; i < num; i++) {
    // Pop last element from temporary array and push onto destination stack
    const crateToMove = cratesToMove.pop();
    newStacks[to].push(crateToMove!);
  }
});

// Get last element of array, map over it and join it into a string with no spaces
const betterMessage = newStacks.map(stack => stack[stack.length - 1]).join("");
console.log("Better reconfiguration message", betterMessage);
