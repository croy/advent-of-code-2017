import {part1, part2} from "../src/day15";

describe("sample data", () => {
  describe("part1", () => {
    test("sample 5 steps", () => {
      expect(part1(65, 8921, 5)).toBe(1);
    });

    test("sample 40,000,000 steps", () => {
      expect(part1(65, 8921, 40000000)).toBe(588);
    });
  });

  describe("part2", () => {
    test("sample 5 steps", () => {
      expect(part2(65, 8921, 5)).toBe(0);
    });

    test("sample 5,000,000 steps", () => {
      expect(part2(65, 8921, 5000000)).toBe(309);
    });
  });

});

console.log(part1(722, 354, 40000000));
console.log(part2(722, 354, 5000000));