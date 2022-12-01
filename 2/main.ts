import fs from "fs/promises";
import path from "path";

// PART 1

(async () => {
  const input = await fs.readFile(path.join(__dirname, "./input.txt"), "utf-8");
})();
