import fs from "fs";

const lines = fs
  .readFileSync("src/inputs/day-4-input.txt", {
    encoding: "utf8",
    flag: "r",
  })
  .split("\n");

const right = (i: number, j: number) => {
  try {
    return lines[i][j] + lines[i][j + 1] + lines[i][j + 2] + lines[i][j + 3];
  } catch {
    return "";
  }
};

const down = (i: number, j: number) => {
  try {
    return lines[i][j] + lines[i + 1][j] + lines[i + 2][j] + lines[i + 3][j];
  } catch {
    return "";
  }
};

const bottomRight = (i: number, j: number) => {
  try {
    return (
      lines[i][j] +
      lines[i + 1][j + 1] +
      lines[i + 2][j + 2] +
      lines[i + 3][j + 3]
    );
  } catch {
    return "";
  }
};

const topRight = (i: number, j: number) => {
  try {
    return (
      lines[i][j] +
      lines[i - 1][j + 1] +
      lines[i - 2][j + 2] +
      lines[i - 3][j + 3]
    );
  } catch {
    return "";
  }
};

const returnTotalXmas = () => {
  let totalXmas: number = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      right(i, j) === "XMAS" && totalXmas++;
      right(i, j) === "SAMX" && totalXmas++;
      down(i, j) === "XMAS" && totalXmas++;
      down(i, j) === "SAMX" && totalXmas++;
      bottomRight(i, j) === "SAMX" && totalXmas++;
      bottomRight(i, j) === "XMAS" && totalXmas++;
      topRight(i, j) === "SAMX" && totalXmas++;
      topRight(i, j) === "XMAS" && totalXmas++;
    }
  }

  console.log("total Xmas:", totalXmas);
};

returnTotalXmas();
