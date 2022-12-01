import fs from "fs/promises";
import path from "path";

// PART 1
// Split the input on each new line to create groups
// Loop over the split input and create an array of the values until a new line
// Total that group and store in another array of totals
// Reset the group array for the next loop
// Find the highest value in the totals array

(async () => {
  const input = await fs.readFile(path.join(__dirname, "./input.txt"), "utf-8");
  const calories = input.split("\n");

  let group: string[] = [];
  let totals: number[] = [];

  calories.forEach(calorie => {
    // Checks for empty string created by splitting on a new line
    if (calorie === "") {
      const groupTotal = group.reduce((a, calorie) => a + parseInt(calorie), 0);
      totals.push(groupTotal);

      // Reset group array to make room for the next one
      group = [];
    }

    if (calorie !== "") group.push(calorie);
  });

  const highestTotal = Math.max(...totals);
  console.log("Highest Total Calories", highestTotal);

  // PART 2
  // Loop 3 times over the array to find the highest value each time
  // Find the index of the highest total in the loop which matches the totals array
  // Remove the value from the totals array for the next loop
  // Store 3 highest totals in another array
  // Total that array

  let highestTotals: number[] = [];

  for (let num = 0; num < 3; num++) {
    const highestTotal = Math.max(...totals);
    highestTotals.push(highestTotal);

    const totalIndex = totals.findIndex(total => total === highestTotal);
    totals.splice(totalIndex, 1);
  }

  const combinedHighestTotals = highestTotals.reduce(
    (a, total) => a + total,
    0
  );

  console.log("Three Highest Calorie Groups", highestTotals);
  console.log(
    "Combined Total of Three Highest Calorie Groups",
    combinedHighestTotals
  );
})();
