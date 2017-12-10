import * as fs from "fs";
import {part1, part2} from "../src/day9";

describe.skip("sample input matches", () => {
    test("part1", () => {
        expect(part1("{}")).toBe(1);
    });
    test("part1", () => {
        expect(part1("{{{}}}")).toBe(6);
    });
    test("part1", () => {
        expect(part1("{{},{}}")).toBe(5);
    });
    test("part1", () => {
        expect(part1("{{{},{},{{}}}}")).toBe(16);
    });
    test("part1", () => {
        expect(part1("{<a>,<a>,<a>,<a>}")).toBe(1);
    });
    test("part1", () => {
        expect(part1("{{<ab>},{<ab>},{<ab>},{<ab>}}")).toBe(9);
    });
    test("part1", () => {
        expect(part1("{{<!!>},{<!!>},{<!!>},{<!!>}}")).toBe(9);
    });
    test("part1", () => {
        expect(part1("{{<a!>},{<a!>},{<a!>},{<ab>}}")).toBe(3);
    });
    test.skip("part2", () => {
        expect(part2("day9-sample.txt")).toBe(1);
    });
});


console.log(part1(fs.readFileSync("day9-input.txt", "utf-8")));