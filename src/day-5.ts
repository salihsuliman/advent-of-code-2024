import fs from "fs";

// Read input from file
const input = fs.readFileSync("src/inputs/day-5-input.txt", "utf-8");
const [rulesSection, updatesSection] = input.split("\n\n");

// Parse the rules and updates
const rules = rulesSection.split("\n").map((rule) => rule.split("|"));
const updates = updatesSection.split("\n").map((update) => update.split(","));

console.log({
  rules,
  updates,
});
const isUpdateCorrectlyOrdered = (
  update: string[],
  rules: string[][]
): boolean => {
  for (const [x, y] of rules) {
    const xIndex = update.indexOf(x);
    const yIndex = update.indexOf(y);

    // If both X and Y are in the update, ensure X comes before Y
    if (xIndex !== -1 && yIndex !== -1 && xIndex > yIndex) {
      return false;
    }
  }
  return true;
};

const correctArray = (update: string[], rules: string[][]): string[] => {
  let hasSwapped = true;

  // Continue processing until no swaps are required
  while (hasSwapped) {
    hasSwapped = false;

    for (const [x, y] of rules) {
      const xIndex = update.indexOf(x);
      const yIndex = update.indexOf(y);

      // If both X and Y are in the update, and X appears after Y, swap them
      if (xIndex !== -1 && yIndex !== -1 && xIndex > yIndex) {
        // Swap the two elements
        [update[xIndex], update[yIndex]] = [update[yIndex], update[xIndex]];
        hasSwapped = true; // Mark that a swap occurred
      }
    }
  }

  return update;
};

const getMiddleNumber = (update: string[]): number => {
  const middleIndex = Math.floor(update.length / 2);
  return parseInt(update[middleIndex], 10);
};

// Process each update and calculate the total middle number sum
let totalMiddleSum = 0;

for (const update of updates) {
  if (!isUpdateCorrectlyOrdered(update, rules)) {
    const array = correctArray(update, rules);
    if (isUpdateCorrectlyOrdered(array, rules)) {
      totalMiddleSum += getMiddleNumber(update);
    }
  }
}

console.log("Total middle sum:", totalMiddleSum);

// test commit
