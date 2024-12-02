import fs from "fs";

const returnSumOfSafeReports = () => {
  const data = fs
    .readFileSync("src/inputs/day-2-input.txt", {
      encoding: "utf8",
      flag: "r",
    })
    .split("\n");

  const finalAmount = data.reduce((prev, curr) => {
    const arrayOfNums = curr.split(" ").map((n) => parseInt(n));
    // arrayOfNums.sort((a, b) => b - a);

    let success = false;
    let counter = 0;

    const isAsc = arrayOfNums.every((v, i, a) => !i || a[i - 1] <= v);
    const isDesc = arrayOfNums.every((v, i, a) => !i || a[i - 1] >= v);

    if (!isDesc && !isAsc) {
      return 0;
    }

    arrayOfNums.sort((a, b) => b - a);

    while (counter < arrayOfNums.length) {
      // const isSorted = arr => arr.every((v,i,a) => !i || a[i-1] <= v);

      if (
        1 <= arrayOfNums[counter] - arrayOfNums[counter + 1] &&
        arrayOfNums[counter] - arrayOfNums[counter + 1] <= 3
      ) {
        success = true;
      }

      counter++;
    }

    if (success) {
      return (prev += 1);
    }

    return 0;
  }, 0);

  console.log(finalAmount);
};

returnSumOfSafeReports();
