import * as _ from "lodash";
import * as Immutable from "immutable";

interface IPort {
  a: number;
  b: number;
  name: string;
  value: number;
}

interface ILengthStrength {
  length: number;
  strength: number;
}

const parsePort = (portString: string): IPort => {
  const [a,b] = _(portString)
  .split("/")
  .map(x => parseInt(x, 10))
  .value();

  return {
    a,
    b,
    name: portString,
    value: a + b,
  };
};

export const part1 = (input: string[]): number => {
  const ports = Immutable.Set(_.map(input, parsePort));
  return maxValue(ports, 0, 0);
}

export const part2 = (input: string[]): number => {
  const ports = Immutable.Set(_.map(input, parsePort));
  return maxLengthValue(ports, 0, {
    length: 0,
    strength: 0,
  }).strength;
}

const maxValue = (ports: Immutable.Set<IPort>, nextPortPins: number, currentValue: number): number => {
  return ports.filter((val) => (val && (val.a === nextPortPins || val.b === nextPortPins)))
  .map((val) => maxValue(ports.remove(val), val.a === nextPortPins ? val.b : val.a , currentValue + val.value))
  .max() || currentValue
}

const maxLengthValue = (ports: Immutable.Set<IPort>, nextPortPins: number, currentValue: ILengthStrength): ILengthStrength => {
  const result = ports
  .filter((val) => (val && (val.a === nextPortPins || val.b === nextPortPins)))
  .map((val) => maxLengthValue(ports.remove(val), val.a === nextPortPins ? val.b : val.a , {
    length: currentValue.length + 1,
    strength: currentValue.strength + val.value,
  }))
  .sortBy((x) => x, (l1, l2) => {
    if (l1.length === l2.length) {
      return l2.strength - l1.strength;
    }
    return l2.length - l1.length;
  });
  //console.log(result.map(v => `${v.length}:${v.strength}`));
  return result.first() || currentValue
}