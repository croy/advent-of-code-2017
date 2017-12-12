import {part1, part2} from "../src/day11";
import * as fs from "fs";
import * as _ from "lodash";


describe("given inputs", () => {
    test("ne,ne,ne should be 3", () => {
        expect(part1("ne","ne","ne")).toBe(3);
    });
    test("ne,ne,sw,swshould be 0", () => {
        expect(part1("ne","ne","sw","sw")).toBe(0);
    });
    test("ne,ne,s,s should be 2", () => {
        expect(part1("ne","ne","s","s")).toBe(2);
    });
    test("se,sw,se,sw,sw should be 3", () => {
        expect(part1("se","sw","se","sw","sw")).toBe(3);
    });
});

const input = _.split(fs.readFileSync("day11-input.txt", "utf-8"), ",");

console.log(part1(...input));
console.log(part2(...input));