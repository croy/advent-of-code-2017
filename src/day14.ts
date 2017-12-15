import * as _ from "lodash";
import {part2 as knotHash} from "./day10";

const toBitString = (rowHash: string): string => _(rowHash)
  .map((char) => parseInt(char, 16))
  .map((x) => x.toString(2))
  .map((x) => _.padStart(x, 4, "0"))
  .join("");

const grid = (key: string): string[] => _(_.range(0, 128))
  .map((row) => `${key}-${row}`)
  .map(knotHash)
  .map(toBitString)
  .value();

export const part1 = (key: string): number => _(grid(key))
  .sumBy((str) => _.sumBy(str, (char) => parseInt(char, 2)));

export const part2 = (key: string): number => {
  const g = grid(key);
  const region: {[index: string]: string} = {};
  
  for (const r of _.range(0, 128)) {
    for (const c of _.range(0, 128)) {

      const coord = `${r},${c}`;

      if (region[coord] || _.get(g, [r, c]) !== "1") {
        continue;
      }

      const stack: Array<[number, number]> = [];
      stack.push([r, c]);

      while (stack.length > 0) {
        const [rc, cc] = stack.pop();
        const currCoord = `${rc},${cc}`;
        if (_.get(g, [rc, cc]) === "1" && !region[currCoord]) {
          stack.push([rc + 1, cc]);
          stack.push([rc - 1, cc]);
          stack.push([rc, cc + 1]);
          stack.push([rc, cc - 1]);
          region[currCoord] = coord;
        }
      }
    }
  }

  return _(region).values().uniq().value().length;
};
