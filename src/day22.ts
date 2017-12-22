import * as _ from "lodash";

const UP: IDirection = {name: "UP", x: 0, y: -1};
const DOWN: IDirection = {name: "DOWN", x: 0, y: 1};
const LEFT: IDirection = {name: "LEFT", x: -1, y: 0};
const RIGHT: IDirection = {name: "RIGHT", x: 1, y: 0};

const rightTurn: ITurn = {DOWN: LEFT, LEFT: UP, RIGHT: DOWN, UP: RIGHT};
const leftTurn: ITurn = {DOWN: RIGHT, LEFT: DOWN, RIGHT: UP, UP: LEFT};
const forward: ITurn = {UP, LEFT, DOWN, RIGHT};
const reverse: ITurn = {UP: DOWN, LEFT: RIGHT, DOWN: UP, RIGHT: LEFT};

interface IDirection {
  name: string;
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
}

interface ITurn {
  [index: string]: IDirection;
}

interface IRule {
  next: string;
  action: string;
  nextDirLookup: ITurn;
}

const simulate = (grid: string[][], steps: number, rules: {[index: string]: IRule}) => {
  const currentPos = {
    x: Math.floor(grid.length / 2),
    y: Math.floor(grid.length / 2),
  };
  const result: {[index: string]: number} = _(rules)
  .values()
  .map("action")
  .reduce((acc, val) => _.set(acc, val, 0), {});

  let currentDirection = UP;

  for (let i = 0; i < steps; i++) {
    const currentSquare = _.get(grid, [currentPos.y, currentPos.x], ".");
    const rule = rules[currentSquare];

    _.set(grid, [currentPos.y, currentPos.x], rule.next);

    currentDirection = rule.nextDirLookup[currentDirection.name];

    result[rule.action]++;

    currentPos.x += currentDirection.x;
    currentPos.y += currentDirection.y;
  }

  return result;
};

export const part1 = (input: string[], steps = 10000) => {
  const grid = input.map((line) => line.split(""));
  return simulate(grid, steps, {
    "#": {
      action: "cleaned",
      next: ".",
      nextDirLookup: rightTurn,
    },
    ".": {
      action: "infected",
      next: "#",
      nextDirLookup: leftTurn,
    },
  });
};

export const part2 = (input: string[], steps = 10000000) => {
  const grid = input.map((line) => line.split(""));
  return simulate(grid, steps, {
    "#": {
      action: "flagged",
      next: "f",
      nextDirLookup: rightTurn,
    },
    ".": {
      action: "weakened",
      next: "w",
      nextDirLookup: leftTurn,
    },
    "f": {
      action: "cleaned",
      next: ".",
      nextDirLookup: reverse,
    },
    "w": {
      action: "infected",
      next: "#",
      nextDirLookup: forward,
    },
  });
};
