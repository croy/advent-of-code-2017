import * as _ from "lodash";

export const part1 = (ruleText: string[], steps: number, start = ".#./..#/###"): number => artGen(
  convertRules(ruleText),
  start,
  steps);

const GridRotateFlip2 = [
  [0, 1, , 2, 3],
  [2, 0, , 3, 1],
  [3, 2, , 1, 0],
  [1, 3, , 0, 2],
  [1, 0, , 3, 2],
  [3, 1, , 2, 0],
  [2, 3, , 0, 1],
  [0, 2, , 1, 3],
];

const GridRotateFlip3 = [
  [0, 1, 2, , 3, 4, 5, , 6, 7, 8],
  [6, 3, 0, , 7, 4, 1, , 8, 5, 2],
  [8, 7, 6, , 5, 4, 3, , 2, 1, 0],
  [2, 5, 8, , 1, 4, 7, , 0, 3, 6],
  [6, 7, 8, , 3, 4, 5, , 0, 1, 2],
  [0, 3, 6, , 1, 4, 7, , 2, 5, 8],
  [2, 1, 0, , 5, 4, 3, , 8, 7, 6],
  [8, 5, 2, , 7, 4, 1, , 6, 3, 0],
  [0, 1, 2, , 3, 4, 5, , 6, 7, 8],
];

const manipulate = (square: string): string[] => {
  const grid = _(square).split("").filter((chr) => chr !== "/").value();
  const manipulationIndices = (grid.length === 4) ? GridRotateFlip2 : GridRotateFlip3;
  return _(manipulationIndices)
    .map((manipulation) => _(manipulation)
      .map((idx) => _.isNumber(idx) ? grid[idx] : "/")
      .join(""))
    .value();
};

export const convertRules = (ruleText: string[]): {[index: string]: string} => {
  const rules: {[index: string]: string} = {};
  _.forEach(ruleText, (rule) => {
    const [inSquare, outSquare] = _.split(rule, /\s=>\s/);
    _.forEach(manipulate(inSquare), (square) => {
      rules[square] = outSquare;
    });
  });

  return rules;
};

export const buildSquares = (squareRow: string[]): string[] => {
  const chunkedRows = _(squareRow)
  .map((row) => row.split(""))
  .map((row) => _.chunk(row, squareRow.length))
  .value();

  const squares = _.zip(...chunkedRows);
  return _(squares)
    .map((square) => _.map(square, (squareLine) => _.join(squareLine, "")))
    .map((square) => _.join(square, "/"))
    .value();
};

export const advanceRow = (rules: {[index: string]: string}, row: string[]): string => {
  const newSquareLines = _(row)
    .map((square) => rules[square])
    .map((square) => square.split("/"))
    .value();
  const data = _.zip(...newSquareLines);

  return _(data)
    .map((data) => _.join(data, ""))
    .join("/");
}

export const artGen = (rules: {[index: string]: string}, state: string, steps: number): number => {
  if (steps <= 0) {
    return _(state).split("/").reduce((a,b) => a + b.match(/#/g).length,0);
  }

  const stateRows = _.split(state, "/");
  const squareSize = stateRows.length % 2 === 0 ? 2 : 3;
  const groupedRows = _.chunk(stateRows, squareSize);
  const squareRows = _.map(groupedRows, buildSquares);
  const advancedRows = _.map(squareRows, (row) => advanceRow(rules, row));
  const nextState = _.join(advancedRows, "/");
  return artGen(rules, nextState, steps - 1);
};
