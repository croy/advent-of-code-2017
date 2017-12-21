import * as fs from "fs";
import {part1, part2} from "../src/day20";

describe("samples", () => {
  const sample1 = fs.readFileSync("day20-sample.txt", "utf-8").split("\n");
  const sample2 = fs.readFileSync("day20-sample-2.txt", "utf-8").split("\n");

  test("part1 should be 0", () => {
    expect(part1(sample1)).toBe(0);
  });

  test("part2 should be 1", () => {
    expect(part2(sample2)).toBe(1);
  });
});

describe("actuals", () => {
  const input = fs.readFileSync("day20-input.txt", "utf-8").split("\n");

  test("part 1 should be 243", () => {
    expect(part1(input)).toBe(243);
  });

  test("part 2 should give an answer", () => {
    console.log(part2(input));
  });
});
