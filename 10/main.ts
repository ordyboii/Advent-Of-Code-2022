import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("10/input.txt"), "utf-8");
const lines = input.split("\n");

let register = 1;
let cycle = 1;

const signalStrengths: number[] = [];
const addSignalStrength = () => {
  if (cycle === 20 && signalStrengths.length <= 0) {
    signalStrengths.push(cycle * register);
  } else if (cycle === 60 && signalStrengths.length <= 1) {
    signalStrengths.push(cycle * register);
  } else if (cycle === 100 && signalStrengths.length <= 2) {
    signalStrengths.push(cycle * register);
  } else if (cycle === 140 && signalStrengths.length <= 3) {
    signalStrengths.push(cycle * register);
  } else if (cycle === 180 && signalStrengths.length <= 4) {
    signalStrengths.push(cycle * register);
  } else if (cycle === 220 && signalStrengths.length <= 5) {
    signalStrengths.push(cycle * register);
  }
};

const CRTS: string[][] = [];
CRTS.push([]);

let currentCRTRow = 0;
let currentPixel = 0;

const trackCRTRow = () => {
  if (cycle === 40) {
    CRTS.push([]);
    currentCRTRow = 1;
    currentPixel = 0;
  } else if (cycle === 80) {
    CRTS.push([]);
    currentCRTRow = 2;
    currentPixel = 0;
  } else if (cycle === 120) {
    CRTS.push([]);
    currentCRTRow = 3;
    currentPixel = 0;
  } else if (cycle === 160) {
    CRTS.push([]);
    currentCRTRow = 4;
    currentPixel = 0;
  } else if (cycle === 200) {
    CRTS.push([]);
    currentCRTRow = 5;
    currentPixel = 0;
  } else if (cycle === 240) {
    CRTS.push([]);
    currentCRTRow = 6;
    currentPixel = 0;
  }
};

const drawPixel = () => {
  console.log(register, currentPixel, cycle);
  if (
    currentPixel === register ||
    currentPixel - 1 === register ||
    currentPixel + 1 === register
  ) {
    CRTS[currentCRTRow][currentPixel] = "#";
  } else {
    CRTS[currentCRTRow][currentPixel] = " ";
  }
};

for (const line of lines) {
  const [instruction, value] = line.split(" ");
  const numValue = parseInt(value);

  // Checks every cycle
  addSignalStrength();
  trackCRTRow();
  drawPixel();

  if (instruction === "addx") {
    // Iterate again due to the addx instruction
    cycle++;
    currentPixel++;

    // Checks every cycle
    addSignalStrength();
    trackCRTRow();

    register += numValue;
    drawPixel();
  }
  // Increment cycle
  cycle++;
  currentPixel++;
}

const sum = signalStrengths.reduce((sum, strength) => sum + strength, 0);

console.log("Sum of strengths", sum);
CRTS.forEach(row => console.log("Image rendered", row.join("")));
