import {part1, part2} from "../src/day6";

describe("part 1", () => {
  test.skip("sample data should take 5 steps", () => {
    expect(part1([0,2,7,0])).toBe(5);
  });
});

describe("part 2", () => {
  test("sample data should have a cycle of 4", () => {
    expect(part2([0,2,7,0])).toBe(4);
  });
});

console.log(part1([10,3,15,10,5,15,5,15,9,2,5,8,5,2,3,6]));
console.log(part2([10,3,15,10,5,15,5,15,9,2,5,8,5,2,3,6]));
