import { readFileSync } from "fs";
import { resolve } from "path";

const input = readFileSync(resolve("20/input.txt"), "utf-8");

const getMove = (num: number, count: number) => {
  let n = num % count;
  if (n < 0) n = count + n;

  return n;
};

const mix = (numbers: number[], times: number): number[] => {
  const entries: { number: number }[] = numbers.map(number => ({ number }));
  const mixed = [...entries];

  for (let j = 0; j < times; j++) {
    for (let i = 0; i < entries.length; i++) {
      const num = entries[i];
      const idx = mixed.indexOf(num);

      if (num.number === 0) {
        continue;
      }

      // Remove
      mixed.splice(idx, 1);
      // Move to new position
      mixed.splice(
        (idx + getMove(num.number, mixed.length)) % mixed.length,
        0,
        num
      );
    }
  }

  return mixed.map(e => e.number);
};

const coords = (numbers: number[]) => {
  const zeroIndex = numbers.indexOf(0);
  const a = numbers[(zeroIndex + 1000) % numbers.length];
  const b = numbers[(zeroIndex + 2000) % numbers.length];
  const c = numbers[(zeroIndex + 3000) % numbers.length];

  return a + b + c;
};

const encrypted = input.split("\n").map(line => parseInt(line));
const p1 = coords(mix(encrypted, 1));

const KEY = 811589153;
const decrypted = input.split("\n").map(s => Number(s) * KEY);

const p2 = coords(mix(decrypted, 10));

console.log(p1, p2);
