import * as fs from "fs";
import * as _ from "lodash";
import {part1} from "../src/day19";

const sampleData = _(fs.readFileSync("day19-sample.txt", "utf-8"))
  .split("\n")
  .map((line) => _.split(line, ""))
  .value();

const inputData = _(fs.readFileSync("day19-input.txt", "utf-8"))
  .split("\n")
  .map((line) => _.split(line, ""))
  .value();

describe("sample input", () => {

  test("part1 should be ABCDEF", () => {
    expect(part1(sampleData).seen).toBe("ABCDEF");
  });

  test("part2 should be 38", () => {
    expect(part1(sampleData).steps).toBe(38);
  });
});

const result = part1(inputData);

console.log(result.seen);
console.log(result.steps);