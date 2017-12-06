import * as _ from 'lodash';

export const part1 = (inBanks: number[]) => {
  const banks = [...inBanks];
  const findLargestIndex = (banks: number[]) => {
    let largestIndex = 0;
    _.forEach(banks, (val, index) => {
      if (banks[largestIndex] < val) {
        largestIndex = index;
      }
    });
    return largestIndex;
  }

  const seenStates: Set<string> = new Set();
  let steps = 0;
  let currentState: string = _.join(banks, ",");
  while(!seenStates.has(currentState)) {
    seenStates.add(currentState);
    
    const startBank = findLargestIndex(banks);
    const blocks = banks[startBank];

    banks[startBank] = 0;
    let currentBank = startBank;
    for (let i = 0; i < blocks; i++) {
      currentBank += 1;
      if (currentBank === banks.length) { currentBank = 0; }
      banks[currentBank] += 1;
    }

    steps++;
    currentState = _.join(banks, ",");
  }
  return steps;
};

export const part2 = (inBanks: number[]) => {
  const banks = [...inBanks];
  const findLargestIndex = (banks: number[]) => {
    let largestIndex = 0;
    _.forEach(banks, (val, index) => {
      if (banks[largestIndex] < val) {
        largestIndex = index;
      }
    });
    return largestIndex;
  }

  const seenStates: {[index: string]: number} = {};
  let steps = 0;
  let currentState: string = _.join(banks, ",");
  while(_.isUndefined(seenStates[currentState])) {
    seenStates[currentState] = steps;
    
    const startBank = findLargestIndex(banks);
    const blocks = banks[startBank];

    banks[startBank] = 0;
    let currentBank = startBank;
    for (let i = 0; i < blocks; i++) {
      currentBank += 1;
      if (currentBank === banks.length) { currentBank = 0; }
      banks[currentBank] += 1;
    }

    steps++;
    currentState = _.join(banks, ",");
  }
  return steps - seenStates[currentState];
};