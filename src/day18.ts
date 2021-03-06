import * as _ from "lodash";
import * as fs from "fs";

function* program(instructions: string[], programId: number, rcvQ: number[], sndQ: number[]) {
  const registers: {[index: string]: number} = {p: programId};
  let instructionPtr = 0;
  let totalSent = 0;

  while (instructionPtr < instructions.length) {
    const [instruction, X, Y] = instructions[instructionPtr].split(" ");
    const Xval = /\d/.test(X) ? parseInt(X, 10) : _.get(registers, X, 0);
    const Yval = Y && (/\d/.test(Y) ? parseInt(Y, 10) : _.get(registers, Y, 0));
    switch (instruction) {
      case "jgz":
        if (Xval > 0) {
          instructionPtr += (Yval as number) - 1;
        }
        break;
      case "snd":
        sndQ.push(Xval);
        totalSent++;
        break;
      case "set":
        _.set(registers, X, Yval);
        break;
      case "add":
        _.set(registers, X, Xval + (Yval as number));
        break;
      case "mul":
        _.set(registers, X, Xval * (Yval as number));
        break;
      case "mod":
        _.set(registers, X, Xval % (Yval as number));
        break;
      case "rcv":
        if (_.isEmpty(rcvQ)) {
          yield totalSent;
        }
        if (_.isEmpty(rcvQ)) {
          return totalSent;
        }
        const read = rcvQ.shift();
        _.set(registers, X, read);
        break;
    }
    instructionPtr++;
  }
  return totalSent;
}

export const part2 = (instructions: string[]): number => {
  const channelA: number[] = [];
  const channelB: number[] = [];
  const duetA = program(instructions, 0, channelA, channelB);
  const duetB = program(instructions, 1, channelB, channelA);
  let currentA = duetA.next();
  let currentB = duetB.next();
  while (!currentA.done || !currentB.done) {
    if (!currentA.done) {
      currentA = duetA.next();
    }
    if (!currentB.done) {
      currentB = duetB.next();
    }
  }
  return currentB.value;
};

export const part1 = (instructions: string[]): number | null => {
  const registers: {[index: string]: number} = {};
  let instructionPtr = 0;
  let playing: number | null = null;
  while (instructionPtr < instructions.length) {
    const [instruction, X, Y] = instructions[instructionPtr].split(" ");
    const Xval = /\d/.test(X) ? parseInt(X, 10) : _.get(registers, X, 0);
    const Yval = Y && (/\d/.test(Y) ? parseInt(Y, 10) : _.get(registers, Y, 0));

    switch (instruction) {
      case "jgz":
        if (Xval > 0) {
          instructionPtr += (Yval as number);
          continue;
        }
        break;
      case "snd":
        playing = Xval;
        break;
      case "set":
        _.set(registers, X, Yval);
        break;
      case "add":
        _.set(registers, X, Xval + (Yval as number));
        break;
      case "mul":
        _.set(registers, X, Xval * (Yval as number));
        break;
      case "mod":
        _.set(registers, X, Xval % (Yval as number));
        break;
      case "rcv":
        if (Xval !== 0) {
          return playing;
        }
        break;
    }
    instructionPtr++;
  }

  return 0;
};

/*
snd X plays a sound with a frequency equal to the value of X.
set X Y sets register X to the value of Y.
add X Y increases register X by the value of Y.
mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
mod X Y sets register X to the remainder of dividing the value contained in register X by the value of Y (that is, it sets X to the result of X modulo Y).
rcv X recovers the frequency of the last sound played, but only when the value of X is not zero. (If it is zero, the command does nothing.)
jgz X Y jumps with an offset of the value of Y, but only if the value of X is greater than zero. (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
*/
