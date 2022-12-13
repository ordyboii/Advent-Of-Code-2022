import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("12/input.txt"), "utf-8");

// Parse input into 2d grid
const grid = input.split("\n").map(line => line.split(""));

// Define types
type Point = { x: number; y: number };

let start: Point = { x: 0, y: 0 };
let end: Point = { x: 0, y: 0 };

// Loop through columns get start and end points
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    const point = grid[row][col];
    if (point === "S") start = { x: col, y: row };
    if (point === "E") end = { x: col, y: row };
  }
}

// Define an object to convert for lookups
const letterToNumber = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,

  S: 0,
  E: 25
};

// Create a new grid of numbers
const numberGrid = grid.map(row =>
  row.map(tile => letterToNumber[tile as keyof typeof letterToNumber])
);

// Check each up, down, right, left position against the condition in the problem
const checkNeighbours = (point: Point) => {
  const { x, y } = point;

  const allMoves = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 }
  ];

  return allMoves.filter(move => {
    const { x: x2, y: y2 } = move;

    if (x2 < 0 || y2 < 0) return false;
    if (x2 >= numberGrid[0].length || y2 >= numberGrid.length) return false;

    // Part 1
    // Here we add one as we can only move one letter up in the alphabet or any below
    // return numberGrid[y2][x2] <= numberGrid[point.y][point.x] + 1;

    // Part 2
    // Here we minus one as we're going back from the end point in part 2
    return numberGrid[y2][x2] >= numberGrid[point.y][point.x] - 1;
  });
};

// NOTES FOR NEXT TIME:

// Djistrika's algorythm most of this was lifted from other solutions as I didn't know how to write it
// An algorythm to find the sorted path to other nodes in a graph, in this case a grid

// We create a set and a queue from where we start in the grid, part 1 is from the start, part 2 is from the end
// While the queue isn't empty we create the a newPaths array and loop through each path in the queue (which is an array of numbers from start to end),
// For the first time it starts the loop with the start coordinates, or end if part 2

// We get the last element in the path and check it's neighbours and then loop through every point returned from the neighbours
// The check neighbours function returns an array of all possible moves which we filter out the ones we can't do based on the condition of the problem
// In this case we can't move to neighbours one letter above in the alphabet but we can move one greater and any before
// The letterToNumber function makes this way easier as we check against integers not letters as we can't do if "a" < "b"

// For each point in the neighbours array has that was returned we check if we visited it before in this path if so continue to the next point in the neighbours
// Otherwise we add it to visited, since it's a set we only get unique value. Since Typescript is quirky we need this as a string
// We then construct a new path by taking a copy of the current path we're looping through and pushing the point to this new path
// We then check if this point is the coordinates of the end point and if so we print the path to the end point and exit the process
// If not we push the new constructed path to the newPaths and set that to the next item in the queue to check through

// Once every new path is out of the queue the while loop finishes.
const visited = new Set<string>([`${start.x},${start.y}`]);
// Part 1
// let queue: Point[][] = [[start]];
// Part 2
let queue: Point[][] = [[end]];

while (queue.length > 0) {
  const newPaths: Point[][] = [];

  for (const path of queue) {
    const last = path[path.length - 1];
    const neighbours = checkNeighbours(last);

    for (const point of neighbours) {
      if (visited.has(`${point.x},${point.y}`)) continue;
      visited.add(`${point.x},${point.y}`);

      const newPath = [...path];
      newPath.push(point);

      const aPoint = numberGrid[point.y][point.x];

      // Part 1
      // if (point.x === end.x && point.y === end.y) {
      //   console.log("Found path", newPath.length - 1);
      //   process.exit();
      // } else {
      //   newPaths.push(newPath);
      // }

      // Part 2
      if (aPoint === 0) {
        console.log("Found path", newPath.length - 1);
        process.exit();
      } else {
        newPaths.push(newPath);
      }
    }
  }
  queue = newPaths;
}
