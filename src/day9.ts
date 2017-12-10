import * as _ from "lodash";


const removeSkippedCharacters = (stream: string) => {
    let skipOne = false;
    let garbage = false;
    let countGarbage = 0;
    const retval = _(stream)
        .filter((char) => {
            if (skipOne) {
                skipOne = false;
                return false;
            } else if (char === '!') {
                skipOne = true;
                return false;
            } else if (char === '<') {
                if (garbage) {
                    countGarbage += 1;
                }
                garbage = true;
                return false;
            } else if (char === '>') {
                garbage = false;
                return false;
            }
            if (garbage) {
                countGarbage += 1;
            }
            return !garbage;
        })
        .join("");
        console.log(countGarbage);
        return retval;
}

export const part1 = (stream: string) => {
    const cleanStream = removeSkippedCharacters(stream);
    let total = 0;
    let depth = 0;
    _.forEach(cleanStream, (char) => {
        if (char === '{') {
            depth += 1;
        } else if (char === '}') {
            total += depth;
            depth -= 1;
        }
    })
    return total;
};

export const part2 = (filename: string) => {throw "not implemented yet"};