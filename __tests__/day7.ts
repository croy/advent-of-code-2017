import {part1, part2} from "../src/day7"

describe("part 1", () => {
  test.skip("sample data should give expected result", () => {
    expect(part1("day7-sample.txt")).toBe("tknk");
  });
});

describe("part 2", () => {
  test("sample data should give expected result", () => {
    expect(part2("day7-sample.txt")).toBe(60);
  });
});

console.log(part1("day7-input.txt"));
console.log(part2("day7-input.txt"));