import * as _ from "lodash";

type LEFT = -1;
type RIGHT = 1;
export const LEFT = -1;
export const RIGHT = 1;

type Bit = 0 | 1;

export interface IAction {
  writeBit: Bit;
  moveDirection: LEFT | RIGHT;
  nextState: string;
}

export interface IMachine {
  [index: string]: [IAction, IAction]
}

export const part1 = (machine: IMachine, startState: string, steps: number): number => {
  const tape: {[index: number]: Bit} = {};
  let currentState = startState;
  let currentTapePtr = 0;
  for (let stepCounter = 0; stepCounter < steps; stepCounter++) {
    const currentBit = tape[currentTapePtr] || 0;
    const action = machine[currentState][currentBit];
    tape[currentTapePtr] = action.writeBit;
    currentState = action.nextState;
    currentTapePtr += action.moveDirection;
  }
  return _(tape).values().sum();
}