import * as _ from "lodash";
import * as fs from "fs";

interface Program {
  name: string,
  weight: number,
  holds: string[]
}

const parseLine = (line: string): Program => {
  const lineRegex = /^([^\s]+) \((\d+)\)(?: -> (.+))?$/;
  const match = lineRegex.exec(line);
  if (!match) {
    throw "no match";
  }
  
  const holds = <string[]><any>(_(match[3]).split(",").map(_.trim).compact().value());

  return {
    name: match[1],
    weight: parseInt(match[2], 10),
    holds,
  };
}

export const part1 = (filename: string): string => {
  const parsed = _(fs.readFileSync(filename, "utf-8"))
  .split("\n")
  .map(parseLine)
  .value();

  const programNames = _.map(parsed, program => program.name);
  const heldPrograms = _.flatMap(parsed, program => program.holds);
  
  return _.difference(programNames, heldPrograms)[0];
}

export const part2 = (filename: string): number => {
  const parsed = _(fs.readFileSync(filename, "utf-8"))
  .split("\n")
  .map(parseLine)
  .value();

  const programMap = _.keyBy(parsed, 'name');
  const weightCache: {[index: string]: number} = {};

  const weight = (name: string): number => {
    if (weightCache[name]) {
      return weightCache[name];
    }
    const program = programMap[name];
    const weightValue: number = program.weight + _.sum(_.map(program.holds, weight));
    weightCache[name] = weightValue;
    return weightValue;
  }

  const evaluate = (program: Program, targetWeight?: number) => {
    const groupedWeights = _.groupBy(program.holds, weight);
    const [x, y] = _.toPairs(groupedWeights);

    if (!y) {
      //current program must be wrong
      const heldWeight = x[0] * x[1].length;
      return program.weight + (targetWeight - (heldWeight + program.weight));
    } else {
      const wrongWeight = x[0].length === 1 ? x[1] : y[1];
      const rightWeight = x[0].length > 1 ? x[0] : y[0];
      return evaluate(programMap[wrongWeight], rightWeight);
    }
  }

  return evaluate(programMap[part1(filename)])
}