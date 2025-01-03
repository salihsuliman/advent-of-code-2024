import fs from "fs";

const lines = fs
  .readFileSync("src/inputs/day-4-input.txt", {
    encoding: "utf8",
    flag: "r",
  })
  .split("\n");

const right = (i: number, j: number) => {
  try {
    return lines[i][j] + lines[i][j + 2];
  } catch {
    return "";
  }
};

const down = (i: number, j: number) => {
  try {
    return lines[i][j] + lines[i + 2][j];
  } catch {
    return "";
  }
};

const bottomRight = (i: number, j: number) => {
  try {
    return lines[i][j] + lines[i + 1][j + 1] + lines[i + 2][j + 2];
  } catch {
    return "";
  }
};

const returnTotalXmas = () => {
  let totalXmas: number = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      right(i, j) === "MS" &&
        bottomRight(i, j) === "MAS" &&
        down(i, j) === "MM" &&
        totalXmas++;

      right(i, j) === "MM" &&
        bottomRight(i, j) === "MAS" &&
        down(i, j) === "MS" &&
        totalXmas++;

      right(i, j) === "SM" &&
        bottomRight(i, j) === "SAM" &&
        down(i, j) === "SS" &&
        totalXmas++;

      right(i, j) === "SS" &&
        bottomRight(i, j) === "SAM" &&
        down(i, j) === "SM" &&
        totalXmas++;
    }
  }

  console.log("total Xmas:", totalXmas);
};

returnTotalXmas();
