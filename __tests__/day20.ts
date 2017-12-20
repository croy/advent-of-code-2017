import * as fs from "fs";
import {part1} from "../src/day20";

describe("samples", () => {
  const input = fs.readFileSync("day20-sample.txt", "utf-8").split("\n");

  test("part1 should be 0", () => {
    expect(part1(input)).toBe(0);
  });
});

describe("actuals", () => {
  const input = fs.readFileSync("day20-input.txt", "utf-8").split("\n");

  test("part 1 should be 243", () => {
    expect(part1(input)).toBe(243);
  });
});
