import { readFileSync } from "fs";
import { resolve } from "path";

const input = readFileSync(resolve("21/input.txt"), "utf-8");
const lines = input.split("\n");

type Monkey = { value: number | null; operation: string[] | null };
const monkeys = new Map<string, Monkey>();

for (const line of lines) {
  const parts = line.split(":");
  const value = isNaN(parseInt(parts[1])) ? null : parseInt(parts[1]);
  const operation = isNaN(parseInt(parts[1]))
    ? parts[1].trim().split(" ")
    : null;

  monkeys.set(parts[0], { value, operation });
}

const getMonkeyValue = (key: string): number => {
  const monkey = monkeys.get(key);
  if (!monkey?.operation) return monkey?.value!;

  const monkeyLeft = monkey.operation[0];
  const monkeyRight = monkey.operation[2];
  const operation = monkey.operation[1];

  if (operation === "+") {
    return getMonkeyValue(monkeyLeft) + getMonkeyValue(monkeyRight);
  } else if (operation === "-") {
    return getMonkeyValue(monkeyLeft) - getMonkeyValue(monkeyRight);
  } else if (operation === "*") {
    return getMonkeyValue(monkeyLeft) * getMonkeyValue(monkeyRight);
  } else if (operation === "/") {
    return getMonkeyValue(monkeyLeft) / getMonkeyValue(monkeyRight);
  } else {
    throw Error("You monkey map is wrong");
  }
};

console.log("Root monkey value", getMonkeyValue("root"));
