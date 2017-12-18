import * as _ from "lodash";

export const part1 = (steps: number): number => {
  const ring: number[] = [0];
  let currPos = 0;
  _.forEach(_.range(1, 2018), (i) => {
    _.forEach(_.range(0, steps), (j) => {
      currPos = (currPos + 1) % ring.length;
    });
    currPos += 1;
    ring.splice(currPos, 0, i);
  });
  return ring[(currPos + 1) % ring.length];
};
/*
export const part2 = (steps: number, iterations: number): number => {
  interface INode {
    val: number;
    next: INode | null;
  }
  const start: INode = {
    next: null,
    val: 0,
  };
  let current = start;
  for (let i = 1; i <= iterations; i++ ) {
    for (let j = 0; j < steps; j++) {
      current = (current.next) || start;
    }
    current.next = {
      next: current.next,
      val: i,
    };
  }
  return (start.next || start).val;
};
*/

export const part2 = (steps: number, iterations: number): number | null => {
  let valueAfterZero = null;
  let currentPos = 0;
  for (let i = 1; i <= iterations; i++ ) {
    currentPos = (steps + currentPos) % (i);
    if (currentPos === 0) {
      valueAfterZero = i;
    }
    currentPos++;
  }
  return valueAfterZero;
};
