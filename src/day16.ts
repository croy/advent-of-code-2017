import * as _ from "lodash";

const apply = (state: string[], instruction: string): string[] => {
  switch (instruction[0]) {
    case "s":
      return applySpin(state, instruction);
    case "x":
      return applyExchange(state, instruction);
    case "p":
      return applyPartner(state, instruction);
    default:
      return state;
  }
};

const applySpin = (state: string[], instruction: string): string[] => {
  const size = parseInt(instruction.substr(1), 10);
  return _.concat(
    _.slice(state, state.length - size),
    _.slice(state, 0, state.length - size));
};
const applyExchange = (state: string[], instruction: string): string[] => {
  const [a, b] = _.split(instruction, "/");
  const aPos = parseInt(a.substr(1), 10);
  const bPos = parseInt(b, 10);
  const result = [...state];
  result[aPos] = state[bPos];
  result[bPos] = state[aPos];
  return result;
};
const applyPartner = (state: string[], instruction: string): string[] => {
  const eq = (a) => (b) => a === b;
  const [a, b] = _.split(instruction, "/");
  const aPos = _.findIndex(state, eq(a.substr(1)));
  const bPos = _.findIndex(state, eq(b));
  return applyExchange(state, `x${aPos}/${bPos}`);
};

export const part1 = (instructions: string[], programs: string = "abcdefghijklmnop"): string => _.join(_.reduce(
  instructions,
  apply,
  _.split(programs, "")), "");

export const part2 = (instructions: string[]): string => {
  const states = [];
  const seen = new Set<string>();
  let currentState = "abcdefghijklmnop";
  while (!seen.has(currentState)) {
    seen.add(currentState);
    states.push(currentState);
    currentState = part1(instructions, currentState);
  }
  return states[1000000000 % states.length];
};
