import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("2/input.txt"), "utf-8").split("\n");

const scores = { win: 6, draw: 3, lost: 0, rock: 1, paper: 2, scissors: 3 };
const opponent = { rock: "A", paper: "B", scissors: "C" };
const me = { rock: "X", paper: "Y", scissors: "Z" };

let score = 0;
let strategyScore = 0;

input.forEach(val => {
  const opponentChoice = val.split(" ")[0];
  const myChoice = val.split(" ")[1];

  if (opponentChoice === opponent["rock"]) {
    if (myChoice === me["rock"]) {
      strategyScore += scores["scissors"] + scores["lost"];
      score += scores["rock"] + scores["lost"];
    }
    if (myChoice === me["paper"]) {
      strategyScore += scores["rock"] + scores["draw"];
      score += scores["paper"] + scores["win"];
    }
    if (myChoice === me["scissors"]) {
      strategyScore += scores["paper"] + scores["win"];
      score += scores["scissors"] + scores["lost"];
    }
  }

  if (opponentChoice === opponent["paper"]) {
    if (myChoice === me["rock"]) {
      strategyScore += scores["rock"] + scores["lost"];
      score += scores["rock"] + scores["lost"];
    }
    if (myChoice === me["paper"]) {
      strategyScore += scores["paper"] + scores["draw"];
      score += scores["paper"] + scores["draw"];
    }
    if (myChoice === me["scissors"]) {
      strategyScore += scores["scissors"] + scores["win"];
      score += scores["scissors"] + scores["win"];
    }
  }

  if (opponentChoice === opponent["scissors"]) {
    if (myChoice === me["rock"]) {
      strategyScore += scores["paper"] + scores["lost"];
      score += scores["rock"] + scores["win"];
    }
    if (myChoice === me["paper"]) {
      strategyScore += scores["scissors"] + scores["draw"];
      score += scores["paper"] + scores["lost"];
    }
    if (myChoice === me["scissors"]) {
      strategyScore += scores["rock"] + scores["win"];
      score += scores["scissors"] + scores["draw"];
    }
  }
});

console.log("My Total Score", score);
console.log("Strategy Score", strategyScore);
