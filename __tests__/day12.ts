import {part1, part2} from "../src/day12";

describe("sample input", () => {
    test("part1 gives 6", () => {
        expect(part1("day12-sample.txt")).toBe(6);
    });

    test("part2 gives 2", () => {
        expect(part2("day12-sample.txt")).toBe(2);
    })
});
console.log(part1("day12-input.txt"));
console.log(part2("day12-input.txt"));