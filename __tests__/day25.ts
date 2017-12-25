import {IAction, IMachine, LEFT, RIGHT, part1} from "../src/day25";

const sample: IMachine = {
  "A": [
    {
      writeBit: 1,
      moveDirection: RIGHT,
      nextState: "B",
    },
    {
      writeBit: 0,
      moveDirection: LEFT,
      nextState: "B",
    },  
  ],
  "B": [
    {
      writeBit: 1,
      moveDirection: LEFT,
      nextState: "A",
    },
    {
      writeBit: 1,
      moveDirection: RIGHT,
      nextState: "A",
    }
  ]
};

const input: IMachine = {
  "A": [
    {
      writeBit: 1,
      moveDirection: RIGHT,
      nextState: "B",
    },
    {
      writeBit: 0,
      moveDirection: LEFT,
      nextState: "F",
    }
  ],
  "B": [
    {
      writeBit: 0,
      moveDirection: RIGHT,
      nextState: "C",
    },
    {
      writeBit: 0,
      moveDirection: RIGHT,
      nextState: "D",
    }
  ],
  "C": [
    {
      writeBit: 1,
      moveDirection: LEFT,
      nextState: "D",
    },
    {
      writeBit: 1,
      moveDirection: RIGHT,
      nextState: "E",
    }
  ],
  "D": [
    {
      writeBit: 0,
      moveDirection: LEFT,
      nextState: "E",
    },
    {
      writeBit: 0,
      moveDirection: LEFT,
      nextState: "D",
    }
  ],
  "E": [
    {
      writeBit: 0,
      moveDirection: RIGHT,
      nextState: "A",
    },
    {
      writeBit: 1,
      moveDirection: RIGHT,
      nextState: "C",
    }
  ],
  "F": [
    {
      writeBit: 1,
      moveDirection: LEFT,
      nextState: "A",
    },
    {
      writeBit: 1,
      moveDirection: RIGHT,
      nextState: "A",
    }
  ],
}

describe("sample input", () => {
  test("part 1 should be 3", () => {
    expect(part1(sample, "A", 6)).toBe(3);
  })
})

describe("actuals", () => {
  test("part 1", () => {
    console.log(part1(input, "A", 12994925));
  });
});