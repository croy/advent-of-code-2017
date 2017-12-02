const _ = require('lodash');
const fs = require('fs');

const input = fs.readFileSync('./src/day-1/input.txt');

const lineCSum = (valList) => {
  const sortedList = _.sortBy(valList);
  return sortedList[sortedList.length-1] - sortedList[0]
}

const lineCSum2 = (valList) => {
  return _(valList)
  .map((val, index, collection) => [val, 
    _.find(collection, (val2) => val2 !== val && val % val2 === 0)])
  .filter(([i, i2]) => _.isNumber(i2))
  .map(([i, i2]) => i/i2)
  .first();
}


const output = _(input)
.split('\n')
.map(str => str.trim())
.map(str => _.split(str, /\s+/))
.map(valList => _.map(valList, val => parseInt(val, 10)))
.map(lineCSum2)
.sum();

console.log(output);