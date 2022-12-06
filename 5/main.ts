import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.resolve("5/input.txt"), "utf-8")
  .split("\n\n");

const diagram = input[0].split("\n").reverse().slice(1);
const stacks: string[][] = [];

diagram.forEach(line => {
  let idx = 0;
  let craneIdx = 0;

  while (idx < line.length) {
    if (stacks.length <= craneIdx) stacks.push([]);

    if (line[idx].startsWith("[")) {
      const character = line.charAt(idx + 1);
      stacks[craneIdx].push(character);
    }

    idx += 4;
    craneIdx += 1;
  }
});

const commands = input[1].split("\n");

commands.forEach(line => {
  const tokens = line.split(" ");
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
const newStacks: string[][] = [];

diagram.forEach(line => {
  let idx = 0;
  let craneIdx = 0;

  while (idx < line.length) {
    if (newStacks.length <= craneIdx) newStacks.push([]);

    if (line[idx].startsWith("[")) {
      const character = line.charAt(idx + 1);
      newStacks[craneIdx].push(character);
    }

    idx += 4;
    craneIdx += 1;
  }
});

commands.forEach(line => {
  const tokens = line.split(" ");
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
const newMessage = newStacks.map(stack => stack[stack.length - 1]).join("");
console.log("New reconfiguration message", newMessage);
