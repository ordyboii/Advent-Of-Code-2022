import { readFileSync } from "fs";
import { resolve } from "path";

const input = readFileSync(resolve("18/input.txt"), "utf-8");
const lines = input.split("\n");

const stringify = (x: number, y: number, z: number) => `${x},${y},${z}`;

const rocks = new Set<string>();

for (const line of lines) {
  const [x, y, z] = line.split(",").map(str => parseInt(str));
  rocks.add(stringify(x, y, z));
}

const checkNeighbours = (x: number, y: number, z: number) => {
  const neighbours = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
  ];

  let counted = 0;
  for (const [dx, dy, dz] of neighbours) {
    if (!rocks.has(stringify(x + dx, y + dy, z + dz))) counted++;
  }

  return counted;
};

let surfaceArea = 0;
for (const rock of rocks) {
  const [x, y, z] = rock.split(",").map(str => parseInt(str));
  const count = checkNeighbours(x, y, z);
  surfaceArea += count;
}

console.log("Surface area", surfaceArea);

const cubeMap = [...rocks].map(rock => {
  const coords = rock.split(",").map(str => parseInt(str));
  return coords;
});

const minX = Math.min(...cubeMap.map(rock => rock[0]));
const maxX = Math.max(...cubeMap.map(rock => rock[0]));
const minY = Math.min(...cubeMap.map(rock => rock[1]));
const maxY = Math.max(...cubeMap.map(rock => rock[1]));
const minZ = Math.min(...cubeMap.map(rock => rock[2]));
const maxZ = Math.max(...cubeMap.map(rock => rock[2]));

// Flood fill
const reachesOutside = (x: number, y: number, z: number) => {
  const stack: number[][] = [[x, y, z]];
  const seen = new Set<string>();

  if (rocks.has(stringify(x, y, z))) return false;

  const neighbours = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
  ];

  while (stack.length > 0) {
    const last = stack.pop()!;

    if (rocks.has(stringify(last[0], last[1], last[2]))) {
      continue;
    }

    for (let coord = 0; coord < 3; coord++) {
      if (coord === 0) {
        if (last[coord] < minX || last[coord] > maxX) {
          return true;
        }
      } else if (coord === 1) {
        if (last[coord] < minY || last[coord] > maxY) {
          return true;
        }
      } else if (coord === 2) {
        if (last[coord] < minZ || last[coord] > maxZ) {
          return true;
        }
      }
    }

    if (seen.has(stringify(last[0], last[1], last[2]))) {
      continue;
    }
    seen.add(stringify(last[0], last[1], last[2]));

    for (const [dx, dy, dz] of neighbours) {
      stack.push([last[0] + dx, last[1] + dy, last[2] + dz]);
    }
  }

  return false;
};

const checkNeighboursAgain = (x: number, y: number, z: number) => {
  const neighbours = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
  ];

  let counted = 0;
  for (const [dx, dy, dz] of neighbours) {
    if (reachesOutside(x + dx, y + dy, z + dz)) counted++;
  }

  return counted;
};

let exterior = 0;
for (const rock of rocks) {
  const [x, y, z] = rock.split(",").map(str => parseInt(str));
  const count = checkNeighboursAgain(x, y, z);
  exterior += count;
}

console.log("Exterior surface area", exterior);
