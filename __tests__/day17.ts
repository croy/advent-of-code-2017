import {part1, part2} from "../src/day17";

describe("sample data", () => {
  test.skip("part1: 3 should be 638", () => {
    expect(part1(3)).toBe(638);
  });
  test("part2: 3, 9 should be 9", () => {
    expect(part2(3, 9)).toBe(9);
  });
  test("part2: 3, 1 should be 1", () => {
    expect(part2(3, 1)).toBe(1);
  });
});

//console.log(part1(382));
console.log(part2(382, 50000000));