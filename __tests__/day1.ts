import {ring} from "../src/day1";

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
