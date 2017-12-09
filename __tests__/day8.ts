import {part1, part2} from "../src/day8";

describe("given examples", () => {
    test("part1 sample gives sample answer", () => {
        expect(part1("day8-sample.txt")).toBe(1);
    });
    test("part2 sample gives sample answer", () => {
        expect(part2("day8-sample.txt")).toBe(10);
    });
});


console.log(part1("day8-input.txt"));
console.log(part2("day8-input.txt"));