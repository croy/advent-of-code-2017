function* generator(start: number, factor: number, criteria?: number) {
  let current = start;
  while (true) {
    current = (current * factor) % 2147483647;
    if (!criteria || current % criteria === 0) {
      yield current;
    }
  }
}

export const part1 = (aStart: number, bStart: number, comparisonPairs: number): number => {
  const A = generator(aStart, 16807);
  const B = generator(bStart, 48271);
  let matches = 0;
  for (let i = 0; i < comparisonPairs; i++) {
    const aVal = A.next();
    const bVal = B.next();
    if (aVal.value % 65536 === bVal.value % 65536) {
      matches++;
    }
  }

  return matches;
};

export const part2 = (aStart: number, bStart: number, comparisonPairs: number): number => {
  const A = generator(aStart, 16807, 4);
  const B = generator(bStart, 48271, 8);
  let matches = 0;
  for (let i = 0; i < comparisonPairs; i++) {
    const aVal = A.next();
    const bVal = B.next();
    if (aVal.value % 65536 === bVal.value % 65536) {
      matches++;
    }
  }

  return matches;
};
