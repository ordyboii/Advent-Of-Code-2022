import { readFileSync } from "fs";
import { resolve } from "path";

const input = readFileSync(resolve("25/input.txt"), "utf-8");
const lines = input.split("\n");

const decimals: number[] = [];
for (const line of lines) {
  const parts = line.split("");
  const decimal: number[] = [];

  for (let i = 0; i < parts.length; i++) {
    const pow = Math.pow(5, parts.length - 1 - i);

    if (!isNaN(parseInt(parts[i]))) {
      const num = parseInt(parts[i]);
      decimal.push(num * pow);
    } else if (parts[i] === "=") {
      decimal.push(-2 * pow);
    } else if (parts[i] === "-") {
      decimal.push(-1 * pow);
    }
  }

  const total = decimal.reduce((sum, num) => sum + num, 0);
  decimals.push(total);
}

const SNAFU: { [key: number]: string } = {
  "2": "2",
  "1": "1",
  "0": "0",
  "-1": "-",
  "-2": "="
};

const convertSNAFU = (num: number) => {
  let snafu = "";
  while (num > 0) {
    snafu += SNAFU[((num + 2) % 5) - 2];
    num = Math.round(num / 5);
  }

  return snafu.split("").reverse().join("");
};

const total = decimals.reduce((sum, decimal) => sum + decimal, 0);
console.log(convertSNAFU(total));
