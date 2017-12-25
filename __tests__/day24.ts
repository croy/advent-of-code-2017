import * as fs from "fs";
import {part1, part2} from "../src/day24";

describe("sample input", () => {
  const sample = fs.readFileSync("day24-sample.txt", "utf-8").split("\n");

  test("part 1 should be 31", () => {
    expect(part1(sample)).toBe(31);
  });

  test("part 2 should be 19", () => {
    expect(part2(sample)).toBe(19);
  })
});

describe("actuals", () => {
  const input = fs.readFileSync("day24-input.txt", "utf-8").split("\n");
  
    test.skip("part 1", () => {
      console.log(part1(input));
    });

    test("part 2", () => {
      console.log(part2(input));
    });
})