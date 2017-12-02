import * as R from "ramda";

export const ring = (collection: number[]) => (index: number) => {
  const moduloIndex = index % collection.length;
  const inboundsIndex = moduloIndex >= 0 ? moduloIndex : moduloIndex + collection.length;
  return collection[inboundsIndex];
};

const convertToNumber: (x: string) => number = R.unary(parseInt);

const convertToPairs = (pairIndexCalc) => (numbers: number[]) => {
  const r = ring(numbers);
  const range = R.range(0, R.length(numbers));
  return R.pipe(
    R.length,
    R.range(0),
    R.map((i) => R.pair(r(i), r(pairIndexCalc(i)))),
    R.filter(([x,y]) => x === y)
  )(numbers);
};

export const solver = (indexCalcGen) => R.pipe(
  R.split(""),
  R.map(convertToNumber),
  (numbers) => convertToPairs(indexCalcGen(numbers))(numbers),
  R.map(R.path([0])),
  R.sum);

export const part1 = solver(() => R.add(1));
export const part2 = solver((xs: any[]) => R.add(xs.length / 2));