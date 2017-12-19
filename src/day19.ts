import * as _ from "lodash";

const LEFT: IDirection = {name: "LEFT", x: -1, y: 0};
const RIGHT: IDirection = {name: "RIGHT", x: 1, y: 0};
const UP: IDirection = {name: "UP", x: 0, y: -1};
const DOWN: IDirection = {name: "DOWN", x: 0, y: 1};

interface IDirection {
  name: string;
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
}

const leftTurns: {[index: string]: IDirection} = {
  DOWN: RIGHT,
  LEFT: DOWN,
  RIGHT: UP,
  UP: LEFT,
};

const rightTurns: {[index: string]: IDirection} = {
  DOWN: LEFT,
  LEFT: UP,
  RIGHT: DOWN,
  UP: RIGHT,
};

const Horizontal = "-";
const Vertical = "|";
const Empty = " ";

interface IPosition {
  x: number;
  y: number;
}

export const part1 = (grid: string[][]): {seen: string, steps: number} => {
  const getSquare = (pos: IPosition) => _.get(grid, [pos.y, pos.x], " ");
  const move = (pos: IPosition, direction: IDirection) => ({x: pos.x + direction.x, y: pos.y + direction.y});

  const seenLetters = [];
  let steps = 0;

  let currentPos = {y: 0, x: _.findIndex(grid[0], (square) => square === Vertical)};
  let currentDirection: IDirection = DOWN;

  while (getSquare(currentPos) !== " ") {
    const curSquare = getSquare(currentPos);

    if (/[A-Z]/.test(curSquare)) {
      seenLetters.push(curSquare);
    } else if (curSquare === "+") {
      const leftTurn = leftTurns[currentDirection.name];
      const rightTurn = rightTurns[currentDirection.name];
      const leftSquare = getSquare(move(currentPos, leftTurn));
      const rightSquare = getSquare(move(currentPos, leftTurn));
      if (currentDirection === UP || currentDirection === DOWN) {
        if (leftSquare === Horizontal || /[A-Z]/.test(leftSquare)) {
          currentDirection = leftTurn;
        } else {
          currentDirection = rightTurn;
        }
      } else {
        if (leftSquare === Vertical || /[A-Z]/.test(leftSquare)) {
          currentDirection = leftTurn;
        } else {
          currentDirection = rightTurn;
        }
      }
    }
    steps++;
    currentPos = move(currentPos, currentDirection);
  }
  return {
    seen: seenLetters.join(""),
    steps,
  };
};
