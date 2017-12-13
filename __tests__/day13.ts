import {part1, part2} from "../src/day13";

describe("sample input", () => {
    test("part1 sample input should result in 24", () => {
        expect(part1("day13-sample.txt")).toBe(24);
    });

    test("part2 sample input should result in 10", () => {
        expect(part2("day13-sample.txt")).toBe(10);
    });
});

console.log(part1("day13-input.txt"));
console.log(part2("day13-input.txt"));