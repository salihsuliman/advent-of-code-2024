import fs from "fs";

// const filterArrays = (arrayOfNums: number[]): number[] | 0 => {
//   const isAsc = arrayOfNums.every((v, i, a) => {
//     if ((!i || a[i - 1] <= v) === false) {
//       return arrayOfNums
//         .filter((_, index) => index === i)
//         .every((v, i, a) => !i || a[i - 1] <= v);
//     }

//     return !i || a[i - 1] <= v;
//   });
//   const isDesc = arrayOfNums.every((v, i, a) => {
//     if ((!i || a[i - 1] <= v) === false) {
//       return arrayOfNums
//         .filter((_, index) => index === i)
//         .every((v, i, a) => !i || a[i - 1] >= v);
//     }

//     return !i || a[i - 1] <= v;
//   });

//   if (isAsc || isDesc) {
//     return arrayOfNums;
//   }

//   return 0;
// };

// const loopArray = (arrayOfNums: number[], retry = true): boolean => {
//   let success = false;
//   let counter = 0;

//   while (counter < arrayOfNums.length) {
//     // const isSorted = arr => arr.every((v,i,a) => !i || a[i-1] <= v);

//     if (
//       1 <= arrayOfNums[counter] - arrayOfNums[counter + 1] &&
//       arrayOfNums[counter] - arrayOfNums[counter + 1] <= 3
//     ) {
//       success = true;
//     } else if (retry) {
//       success = loopArray(
//         arrayOfNums.filter((_, i) => i === counter),
//         false
//       );
//     }

//     counter++;
//   }

//   return success;
// };

const filterReport = (report: number[], index: number, retried = false) => {
  const a = report[index];
  const b = report[index + 1];

  const diff = b - a;
  const direction = report[1] - report[0] < 0 ? "desc" : "asc";
  const last = index + 1 === report.length;

  if (
    diff === 0 ||
    Math.abs(diff) > 3 ||
    (diff > 0 && direction === "desc") ||
    (diff < 0 && direction === "asc")
  ) {
    if (retried) {
      return false;
    }

    if (last) {
      return true;
    }

    const removeBeforeValue = filterReport(
      report.toSpliced(Math.max(index - 1, 0), 1),
      Math.max(0, index - 2),
      true
    );

    if (removeBeforeValue) {
      return true;
    }

    const removeCurrentValue = filterReport(
      report.toSpliced(Math.max(index, 0), 1),
      Math.max(0, index - 1),
      true
    );

    if (removeCurrentValue) {
      return true;
    }

    const removeNextValue = filterReport(
      report.toSpliced(index + 1, 1),
      index,
      true
    );

    if (removeNextValue) {
      return true;
    }

    return false;
  }

  if (last) {
    return true;
  }

  return filterReport(report, index + 1, retried);
};

const returnSumOfSafeReports = () => {
  const reports = fs
    .readFileSync("src/inputs/day-2-input.txt", {
      encoding: "utf8",
      flag: "r",
    })
    .split("\n")
    .map((line) => line.split(/\s+/).map(Number));

  let safe = 0;
  reports.forEach((report) => {
    if (filterReport(report, 0)) {
      safe++;
    }
  });

  console.log(safe);
};

returnSumOfSafeReports();
