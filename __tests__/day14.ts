import {part1, part2} from "../src/day14";

describe("sample input", () => {
  test.skip("part 1 flqrgnkx should be 8108", () => {
    expect(part1("flqrgnkx")).toBe(8108);
  });
  test("part 2 flqrgnkx should be 1242", () => {
    expect(part2("flqrgnkx")).toBe(1242);
  });

});

//console.log(part1("xlqgujun"));
console.log(part2("xlqgujun"));