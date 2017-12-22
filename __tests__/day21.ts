import * as fs from "fs";
import {advanceRow, buildSquares, convertRules, part1} from "../src/day21";

describe.skip("sample input", () => {
  const sample = fs.readFileSync("day21-sample.txt", "utf-8").split("\n");

  test("part1 sample should be 12", () => {
    expect(part1(sample, 2)).toBe(12);
  });

});

describe("build squares", () => {
  test("", () => {
    expect(buildSquares(["...###", "...###", "...###"])).toEqual([".../.../...", "###/###/###"]);
  });
});

describe("convert rules", () => {
  test("rule should include input data exactly", () => {
    expect(convertRules(["../.# => ##./#../..."])).toMatchObject({
      "../.#": "##./#../...",
    });
  });

  test("rule should convert multiple rules", () => {
    expect(convertRules(["../.# => ##./#../...", "../.. => .../.../..." ])).toMatchObject({
      "../..": ".../.../...",
    });
  });

  test("rule should include all rotations on input data", () => {
    const rules = convertRules(["../.# => ##./#../..."]);

    expect(rules).toMatchObject({
      "../.#": "##./#../...",
      "../#.": "##./#../...",
      "#./..": "##./#../...",
      ".#/..": "##./#../...",
    });
  });
});

describe("actuals", () => {
  const input = fs.readFileSync("day21-input.txt", "utf-8").split("\n");
  test("part1", () => {
    console.log(part1(input, 5));
  });

  test("part2", () => {
    console.log(part1(input, 18));
  });
});
