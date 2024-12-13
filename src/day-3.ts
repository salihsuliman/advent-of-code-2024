import fs from "fs";

const returnSumOfSafeReports = () => {
  const reports = fs
    .readFileSync("src/inputs/day-3-input.txt", {
      encoding: "utf8",
      flag: "r",
    })
    .split("\n");

  const mulRegex = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g;

  const finalValue = reports.reduce((prev, curr) => {
    const foundMul = curr.match(mulRegex);
    let skip = false;

    if (foundMul) {
      prev += foundMul.reduce((prevVal, currVal) => {
        if (currVal === "don't()") {
          skip = true;
          return prevVal;
        }

        if (currVal === "do()") {
          skip = false;
          return prevVal;
        }

        if (!skip) {
          console.log("currVal", currVal);

          const nums = currVal
            .slice(4, currVal.length - 1)
            .split(",")
            .map(Number);

          prevVal += nums[0] * nums[1];
        } else {
          console.log("nah", currVal);
        }

        return prevVal;
      }, 0);

      return prev;
    }

    return prev;
  }, 0);

  console.log("finalValue", finalValue);
};

returnSumOfSafeReports();
