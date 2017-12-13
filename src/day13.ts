import * as _ from "lodash";
import * as fs from "fs";

type Scanner = {range: number, depth: number}

export const isScannerIn0th = (time: number, range: number): boolean => time % scannerPeriod(range) === 0;

const scannerPeriod = (range: number): number => (range - 1) * 2

const parseLine = (line: string): Scanner => {
    const [depthStr, rangeStr] = _.split(line, /:\s+/);
    return {
        depth: parseInt(depthStr),
        range: parseInt(rangeStr)
    }
}

const readInput = (fileName: string): Scanner[] => _(fs.readFileSync(fileName, "utf-8"))
    .split("\n")
    .map(parseLine)
    .value();

export const part1 = (fileName: string) : number => _(readInput(fileName))
    .filter(scanner => isScannerIn0th(scanner.depth, scanner.range))
    .map(scanner => scanner.depth * scanner.range)
    .sum();

const caught = (scanners: Scanner[], delay: number) => _(scanners)
    .some(scanner => isScannerIn0th(scanner.depth+delay, scanner.range));

export const part2 = (fileName: string) : number => {
    let delay = 0;
    const scanners = readInput(fileName);
    while (caught(scanners, delay)){
        delay++;
    }
    return delay;
};