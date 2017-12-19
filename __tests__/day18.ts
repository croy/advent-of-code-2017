import * as fs from "fs";
import {part1, part2} from "../src/day18";

describe("sample inputs", () => {
  test.skip("part1 should be 4", () => {
    expect(part1(fs.readFileSync("day18-sample.txt", "utf-8").split("\n"))).toBe(4);
  });
  test("part2 should be 3", () => {
    expect(part2(fs.readFileSync("day18-sample-2.txt", "utf-8").split("\n"))).toBe(3);
  });
});

//console.log(part1(fs.readFileSync("day18-input.txt", "utf-8").split("\n")));
console.log(part2(fs.readFileSync("day18-input.txt", "utf-8").split("\n")));
