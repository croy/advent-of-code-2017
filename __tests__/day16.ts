import * as fs from "fs";
import * as _ from "lodash";

import {part1, part2} from "../src/day16";

describe("sample data", () => {
  test.skip("part1", () => {
    expect(part1(["s1", "x3/4", "pe/b"], "abcde")).toBe("baedc");
  });
});

//console.log(part1(_.split(fs.readFileSync("day16-input.txt", "utf-8"), ",")));
console.log(part2(_.split(fs.readFileSync("day16-input.txt", "utf-8"), ",")));
