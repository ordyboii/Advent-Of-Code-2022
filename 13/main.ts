import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("13/input.txt"), "utf-8");

const pairs = input
  .split("\n\n")
  .map(group => group.split("\n").map(line => JSON.parse(line)));

const compare = (left: any[] | number, right: any[] | number) => {
  if (Array.isArray(left) && typeof right === "number") right = [right];
  if (Array.isArray(right) && typeof left === "number") left = [left];

  if (typeof left === "number" && typeof right === "number") {
    if (left < right) return 1;
    if (left === right) return 0;
    return -1;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    let i = 0;

    while (i < left.length && i < right.length) {
      const ans = compare(left[i], right[i]);
      if (ans === 1) return 1;
      if (ans === -1) return -1;

      i++;
    }

    if (i === left.length) {
      if (i === right.length) return 0;
      return 1;
    }

    if (i === right.length) return -1;

    return 0;
  }
};

let answer = 0;
let packets: number[] = [];

for (let i = 0; i < pairs.length; i++) {
  const [left, right] = pairs[i];
  packets.push(left);
  packets.push(right);

  if (compare(left, right) === 1) {
    answer += i + 1;
  }
}

console.log("Indicies in order", answer);

packets.push([[2]] as any);
packets.push([[6]] as any);

const sorted = packets
  .sort((a, b) => {
    const sort = compare(a, b);

    if (sort === 1) return 1;
    if (sort === -1) return -1;
    else return 0;
  })
  .reverse();

let divider1Index = 0;
let divider2Index = 0;

sorted.forEach((packet, idx) => {
  const packetJSON = JSON.stringify(packet);

  if (packetJSON === "[[2]]") divider1Index += idx + 1;
  if (packetJSON === "[[6]]") divider2Index += idx + 1;
});

console.log("Divider indicies sorted", divider1Index * divider2Index);
