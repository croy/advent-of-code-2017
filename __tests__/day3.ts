import {part1, part2} from "../src/day3";

describe("part 1", () => {
  test("square 1 should take 0 steps", () => {
    expect(part1(1)).toBe(0);
  });

  test("square 12 should take 3 steps", () => {
    expect(part1(12)).toBe(3);
  });

  test("square 23 should take 2 steps", () => {
    expect(part1(23)).toBe(2);
  });

  test("square 1024 should take 31 steps", () => {
    expect(part1(1024)).toBe(31);
  });
});

console.log(`part 1: ${part1(265149)}`)
console.log(`part 2: ${part2(265149)}`)
