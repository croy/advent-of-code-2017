import * as _ from "lodash";

const bottomRightCorner = (ring: number, x: number, y: number) => x === ring && y === -ring;
const topRightCorner = (ring: number, x: number, y: number) => x === ring && y === ring;
const topLeftCorner = (ring: number, x: number, y: number) => x === -ring && y === ring;
const bottomLeftCorner = (ring: number, x: number, y: number) => x === -ring && y === -ring;

function *spiralWalk() {
  let curRing = 0;
  while (true) {
    yield* ringSquares(curRing);
    curRing++;
  }
}

function *ringSquares(ring: number) {
  let x = ring;
  let y = ring === 0 ? 0 : -ring + 1;
  let direction = [0, 1];

  while (!bottomRightCorner(ring, x, y)) {
    yield { x, y };

    if (topRightCorner(ring, x, y)) {
      direction = [-1, 0];
    } else if (topLeftCorner(ring, x, y)) {
      direction = [0, -1];
    } else if (bottomLeftCorner(ring, x, y)) {
      direction = [1, 0];
    }
    x += direction[0];
    y += direction[1];
  }
  yield { x, y };
}

export const part1 = (num: number) => {
  let curVal = 1;
  for (const step of spiralWalk()) {
    if (curVal === num) {
      return Math.abs(step.x) + Math.abs(step.y);
    }
    curVal++;
  }
};

const adjacentSquares = (square: {x: number, y: number}) => {
  const posMods: number[][] = [
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  return _.map(posMods, (mod: number[]) => ({
    x: square.x + mod[0],
    y: square.y + mod[1],
  }));
};

export const part2 = (num: number) => {
  const grid: {[index: string]: number}  = {};
  for (const step of spiralWalk()) {
    const curVal = _(adjacentSquares(step))
    .map((pos: {x: number, y: number}) => `${pos.x},${pos.y}`)
    .map((coordsString: string) => _.get(grid, coordsString))
    .compact()
    .sum() || 1;

    grid[`${step.x},${step.y}`] = curVal;

    if (curVal > num) {
      return curVal;
    }
  }
};
