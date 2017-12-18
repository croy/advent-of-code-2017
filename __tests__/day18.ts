import * as fs from "fs";
import {part1} from "../src/day18";

describe("sample inputs", () => {
  test("part1 should be 4", () => {
    expect(part1(fs.readFileSync("day18-sample.txt", "utf-8").split("\n"))).toBe(4);
  });
});

console.log(part1(fs.readFileSync("day18-input.txt", "utf-8").split("\n")));