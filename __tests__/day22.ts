import * as fs from "fs";
import {part1, part2} from "../src/day22";

describe("sample data", () => {
  const sample = fs.readFileSync("day22-sample.txt", "utf-8").split("\n");

  test("part1 should be 5587", () => {
    expect(part1(sample).infected).toBe(5587);
  });

  test("part2 should be 2511944", () => {
    expect(part2(sample).infected).toBe(2511944);
  });

});

describe("actual data", () => {
  const input = fs.readFileSync("day22-input.txt", "utf-8").split("\n");

  test("part1", () => {
    console.log(`part1 : ${part1(input).infected}`);
  });

  test("part2", () => {
    console.log(`part2 : ${part2(input).infected}`);
  });
});
