import * as fs from "fs";
import * as _ from "lodash";

class Machine {
    private storage: {[index: string]: number} = {};

    constructor() {
        this.storage = {};
    }

    getRegister(index: string) {
        return this.storage[index] || 0;
    }

    setRegister(index: string, value: number) {
        this.storage[index] = value;
    }

    getRegisters(): string[] {
        return Object.keys(this.storage);
    }

    getRegisterValues(): number[] {
        return _.values(this.storage);
    }
}

interface Instruction {
    register: string,
    operation: "inc" | "dec",
    operand: number,
    condition(machine: Machine): boolean,
}

const createCondition = (register: string, predicate: string, operand: string) => {
    switch (predicate) {
        case ">":
            return (machine: Machine) => machine.getRegister(register) > parseInt(operand);
        case "<":
            return (machine: Machine) => machine.getRegister(register) < parseInt(operand);
        case "==":
            return (machine: Machine) => machine.getRegister(register) === parseInt(operand);
        case ">=":
            return (machine: Machine) => machine.getRegister(register) >= parseInt(operand);
        case "<=":
            return (machine: Machine) => machine.getRegister(register) <= parseInt(operand);
        case "!=":
            return (machine: Machine) => machine.getRegister(register) !== parseInt(operand);
    }
    throw "unparseable condition";
}

const parseLine = (line: string) : Instruction => {
    const tokens = line.split(" ");
    return {
        register: tokens[0],
        operation: tokens[1] === "inc" ? "inc" : "dec",
        operand: parseInt(tokens[2]),
        condition: createCondition(tokens[4], tokens[5], tokens[6])
    }
}

export const part1 = (filename: string) : number => {
    const instructions = _(fs.readFileSync(filename, "utf-8"))
    .split("\n")
    .map(parseLine)
    .value();

    const machine = new Machine();

    _.forEach(instructions, (instruction: Instruction) => {
        if(instruction.condition(machine)) {
            const currentValue = machine.getRegister(instruction.register);
            const op = instruction.operand;
            machine.setRegister(instruction.register, instruction.operation === "inc" ? currentValue + op : currentValue - op);
        }
    });
    return _.max(machine.getRegisterValues()) || 0;
}

export const part2 = (filename: string) : number => {
    const instructions = _(fs.readFileSync(filename, "utf-8"))
    .split("\n")
    .map(parseLine)
    .value();

    const machine = new Machine();

    let maxVal = Number.MIN_SAFE_INTEGER;

    _.forEach(instructions, (instruction: Instruction) => {
        if(instruction.condition(machine)) {
            const currentValue = machine.getRegister(instruction.register);
            const op = instruction.operand;
            const result = instruction.operation === "inc" ? currentValue + op : currentValue - op;
            if (result > maxVal) {
                maxVal = result;
            }
            machine.setRegister(instruction.register, instruction.operation === "inc" ? currentValue + op : currentValue - op);
        }
    });
    return maxVal;
}