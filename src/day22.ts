import * as _ from "lodash";

const UP = {
  name: "UP",
  x: 0,
  y: -1,
};

const DOWN = {
  name: "DOWN",
  x: 0,
  y: 1,
};

const LEFT = {
  name: "LEFT",
  x: -1,
  y: 0,
};

const RIGHT = {
  name: "RIGHT",
  x: 1,
  y: 0,
};

const rightTurn = {
  UP: RIGHT,
  RIGHT: DOWN,
  DOWN: LEFT,
  LEFT: UP
};

const leftTurn = {
  UP: LEFT,
  LEFT: DOWN,
  DOWN: RIGHT,
  RIGHT: UP
};

export const part1 = (input: string[], steps = 10000) => {
  const grid = input.map((line) => line.split(""));
  let currentPos = {
    x: Math.floor(grid.length / 2),
    y: Math.floor(grid.length / 2),
  };
  let currentDirection = UP;
  const result = {
    cleaned: 0,
    infected: 0,
  };

  for (let i = 0; i < steps; i++) {
    const currentSquare = _.get(grid, [currentPos.y, currentPos.x], ".");
    if (currentSquare === ".") {
      _.set(grid, [currentPos.y, currentPos.x], "#");
      result.infected++;
      currentDirection = leftTurn[currentDirection.name];
    } else {
      _.set(grid, [currentPos.y, currentPos.x], ".");
      result.cleaned++;
      currentDirection = rightTurn[currentDirection.name];
    }
    //console.log(`${currentPos.x},${currentPos.y}: ${currentSquare} -> ${currentDirection.name}`);
    currentPos.x += currentDirection.x;
    currentPos.y += currentDirection.y;
  }

  return result;
};
