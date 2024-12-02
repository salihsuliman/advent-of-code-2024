import fs from "fs";

const sortArraysAndFindDifference = (
  leftSide: number[],
  rightSide: number[]
) => {
  leftSide.sort((a, b) => a - b);
  rightSide.sort((a, b) => a - b);

  let counter = 0;
  let finalAmount = 0;

  while (counter < leftSide.length) {
    if (leftSide[counter] < rightSide[counter]) {
      finalAmount += rightSide[counter] - leftSide[counter];
    } else {
      finalAmount += leftSide[counter] - rightSide[counter];
    }

    counter++;
  }

  return finalAmount;
};

const returnSumOfTotalDistance = () => {
  const data = fs
    .readFileSync("src/inputs/day-1-input.txt", {
      encoding: "utf8",
      flag: "r",
    })
    .split("\n");

  const leftSide: number[] = [];
  const rightSide: number[] = [];

  data.forEach((line) => {
    const splitLine = line.split("   ");
    // console.log("split logic", splitLine);
    leftSide.push(parseInt(splitLine[0]));
    rightSide.push(parseInt(splitLine[1]));
  });

  const finalAmount = sortArraysAndFindDifference(leftSide, rightSide);

  console.log(finalAmount);
};

returnSumOfTotalDistance();
