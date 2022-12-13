import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("11/input.txt"), "utf-8");
const groups = input.split("\n\n").map(group => group.split("\n"));

const monkeys = groups.map(line => ({
  inspected: 0,
  items: line[1]
    .split(":")
    .filter(parts => parts[0])
    .splice(1, 1)[0]
    .split(",")
    .map(num => parseInt(num)),
  operation: (item: number) => {
    const operation = line[2].split(":")[1].split("=").splice(1, 1)[0];
    if (operation.includes("*")) {
      const valueToCalc = operation.split("*")[1];
      if (valueToCalc.includes("old")) return item * item;

      return item * parseInt(valueToCalc);
    } else if (operation.includes("+")) {
      const valueToCalc = operation.split("+")[1];
      if (valueToCalc.includes("old")) return item + item;

      return item + parseInt(valueToCalc);
    }

    return item;
  },
  test: (bored: number, divisible: number) => {
    const monkeyTrue = parseInt(line[4].split(":")[1].split(" ")[4]);
    const monkeyFalse = parseInt(line[5].split(":")[1].split(" ")[4]);

    // Returns monkey to throw item too
    if (bored % divisible === 0) {
      return monkeyTrue;
    }
    return monkeyFalse;
  },
  divisibleNumber: parseInt(line[3].split(":")[1].split(" ")[3])
}));

const modular = monkeys.reduce((a, b) => a * b.divisibleNumber, 1);

for (let i = 0; i < 10000; i++) {
  for (const monkey of monkeys) {
    for (const item of monkey.items) {
      monkey.inspected++;
      // Part 1 the worry level is divided by 3
      // const worry = Math.floor(monkey.operation(item) / 3);
      // Part 2 we use a modular amount to keep the numbers from getting to high
      const worry = monkey.operation(item) % modular;
      const monkeyToPass = monkey.test(worry, monkey.divisibleNumber);
      monkeys[monkeyToPass].items.push(worry);
    }
    // All items passed on
    monkey.items = [];
  }
}

const sorted = monkeys.sort((a, b) => b.inspected - a.inspected).splice(0, 2);

console.log("Monkey sum", sorted[0].inspected * sorted[1].inspected);
