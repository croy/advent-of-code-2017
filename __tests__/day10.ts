import {part1, part2} from "../src/day10";

describe("sample data", () => {
    describe("part 1", () => {
        test("3, 4, 1, 5 to be 12", () => {
            expect(part1(5)(3, 4, 1, 5)).toBe(12);
        });
    });
    describe("part 2", () => {
        test.skip('""', () => {
            expect(part2("")).toBe("a2582a3a0e66e6e86e3812dcb672a272");
        });
        test("AoC 2017", () => {
            expect(part2("AoC 2017")).toBe("33efeb34ea91902bb2f59c9920caa6cd");
        });
        test.skip("1,2,3", () => {
            expect(part2("1,2,3")).toBe("3efbe78a8d82f29979031a4aa0b16a9d");
        });
        test.skip("1,2,4", () => {
            expect(part2("1,2,4")).toBe("63960835bcdc130f0b66d7ff4f6a5a8e")
        });
    });
});

//console.log(part1(256)(165,1,255,31,87,52,24,113,0,91,148,254,158,2,73,153));
console.log(part2("165,1,255,31,87,52,24,113,0,91,148,254,158,2,73,153"));