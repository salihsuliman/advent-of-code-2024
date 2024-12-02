import fs from "fs";

const sortArraysAndFindDifference = (
  leftSide: number[],
  rightSide: number[]
) => {
  const multipleArray: number[] = [];

  leftSide.forEach((left) => {
    const filteredArray = rightSide.filter((right) => left === right);

    multipleArray.push(filteredArray.length);
  });

  let finalAmount = 0;
  let counter = 0;

  while (counter < leftSide.length) {
    finalAmount += leftSide[counter] * multipleArray[counter];

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
