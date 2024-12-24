import fs from "fs";

// Read input from file
const input = fs.readFileSync("src/inputs/day-6-input.txt", "utf-8");
const splitLines = input
  .toString()
  .split("\n")
  .map((val) => val.split(""));

const gridIndex = input.indexOf("^");
const y = Math.floor(gridIndex / splitLines[0].length);
const x = splitLines[y].indexOf("^");

type Direction = {
  [key: string]: {
    delY: number;
    delX: number;
    turn: string;
  };
};

const direction: Direction = {
  up: {
    delY: -1,
    delX: 0,
    turn: "right",
  },
  right: {
    delY: 0,
    delX: 1,
    turn: "down",
  },
  down: {
    delY: 1,
    delX: 0,
    turn: "left",
  },
  left: {
    delY: 0,
    delX: -1,
    turn: "up",
  },
};

let dir = direction.up;
let pos = {
  y,
  x,
};

const next = () => {
  return {
    y: pos.y + dir.delY,
    x: pos.x + dir.delX,
  };
};

const turn = () => {
  dir = direction[dir.turn];
};

const move = () => {
  pos = next();
};

const read = ({ y, x }: { y: number; x: number }) => {
  try {
    return splitLines[y][x];
  } catch (error) {
    return null;
  }
};

const mark = () => {
  splitLines[pos.y][pos.x] = "X";
};

mark();

while (true) {
  if (!read(next())) {
    break;
  }

  if (read(next()) === "#") {
    turn();
  }

  move();
  mark();
}

let count = 0;

splitLines.forEach((line) => {
  console.log(line.join(""));

  line.forEach((char) => {
    char === "X" && count++;
  });
});

console.log(count);
