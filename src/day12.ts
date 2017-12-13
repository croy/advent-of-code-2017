import * as fs from "fs";
import * as _ from "lodash";

type Graph = { [index: string] : string[] }

const parseLine = (line: string): {from: string, to: string}[] => {
    const [from, tos] = _.split(line, "<->");
    return _(tos)
        .split(",")
        .map(to => _.trim(to))
        .map(to => ({
            from: _.trim(from),
            to,
        }))
        .value();
}

const parseFile = (inputFile: string): Graph => {
    return _(fs.readFileSync(inputFile))
        .split("\n")
        .flatMap(parseLine)
        .groupBy(x => x.from)
        .mapValues(x => _.map(x, 'to'))
        .value();
}

const djikstra = (g: Graph, start: string): { [index: string]: number } => {
    let seen = new Set();
    const Q = [start];
    const result: { [index: string]: number } = {};
    let current = Q.shift();

    while (current) {
        seen = seen.add(current);
        g[current].forEach((from => {
            result[from] = result[from] || result[current] + 1;
            if (!seen.has(from)) {
                Q.push(from);
            }
        }));
        current = Q.shift();
    }

    return result;
}

export const part1 = (inputFile: string): number => {
    const parsedInput = parseFile(inputFile);

    return _.keys(djikstra(parsedInput, "0")).length;
};

export const part2 = (inputFile: string): number => {
    const parsedInput = parseFile(inputFile);
    const rootMap: {[index: string] : string} = {};

    _.forEach(_.keys(parsedInput), (node) => {
        if (rootMap[node]) {
            return;
        }
        rootMap[node] = node;
        let Q: string[] = parsedInput[node];
        let current = Q.shift();
        while (current) {
            if (!rootMap[current]) {
                rootMap[current] = node;
                _.forEach(parsedInput[current], (node) => Q.push(node));
            }
            current = Q.shift();
        }
    });

    return _(rootMap).values().uniq().value().length;
}