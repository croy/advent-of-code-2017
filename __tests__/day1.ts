import {part1, ring} from "../src/day1";

describe("ring", () => {
  test("returns index value when index is within bounds", () => {
    expect(ring([1, 2, 3])(1)).toBe(2);
  });

  test("returns modulus entry value when index is larger than collection length", () => {
    expect(ring([1, 2, 3])(3)).toBe(1);
  });

  test("returns appropriate entry value when index is negative", () => {
    expect(ring([1, 2, 3])(-1)).toBe(3);
  });
});

describe("part 1", () => {
  test("1122 should be 3", () => {
    expect(part1("1122")).toBe(3);
  });

  test("1111 should be 4", () => {
    expect(part1("1111")).toBe(4);
  });

  test("1234 should be 0", () => {
    expect(part1("1234")).toBe(0);
  });

  test("91212129 should be 9", () => {
    expect(part1("91212129")).toBe(9);
  });
});
