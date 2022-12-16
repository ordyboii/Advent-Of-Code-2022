import { readFileSync } from "fs";
import { resolve } from "path";

const input = readFileSync(resolve("16/input.txt"), "utf-8");
const lines = input.split("\n");

type Valve = { flowRate: number; tunnels: string[]; opened: boolean };
const valves = new Map<string, Valve>();

for (const line of lines) {
  const parts = line.split(";");
  const tunnel = parts[0].split(" ")[1];
  const flowRate = parseInt(parts[0].split("=")[1]);
  const connected = parts[1]
    .split(" ")
    .filter(str => str === str.toUpperCase())
    .filter(str => str !== "")
    .map(str => str.replace(",", ""));

  valves.set(tunnel, { flowRate, tunnels: connected, opened: false });
}

// Need to have a function that finds the shortest path with the highest value
let minute = 0;
let totalPressure = 0;
let opening = false;
let currentValve = { key: "AA", ...valves.get("AA") };

while (minute < 30) {
  minute++;

  if (opening && !currentValve.opened) {
    const pressure = minute * currentValve.flowRate!;
    totalPressure += pressure;
    opening = false;
    continue;
  }

  if (currentValve.flowRate! === 0) {
    // Find next best path
  } else {
    // Find next best path or use current flow rate
    // Handle the case where the current flow rate is higher than the next best path
  }
}

console.log("Total pressure in 30", totalPressure);
