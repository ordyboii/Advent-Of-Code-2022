import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("6/input.txt"), "utf-8");

for (let i = 0; i < input.length; i++) {
  const characters = new Set<string>(input.substring(i, i + 4).split(""));
  if (characters.size === 4) {
    console.log("The first package position", i + 4);
    break;
  }
}

for (let i = 0; i < input.length; i++) {
  const characters = new Set<string>(input.substring(i, i + 14).split(""));
  if (characters.size === 14) {
    console.log("The first message position", i + 14);
    break;
  }
}
