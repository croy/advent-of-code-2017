import * as _ from "lodash";

export const part1 = (listLength: number) => (...lengths: number[]) : number => {
    const valList = _.range(0, listLength);

    let skip = 0;
    let currentIdx = 0;

    for (const l of lengths) {
        const beginning = _.slice(valList, currentIdx, currentIdx+l);
        const end = _.slice(valList, 0, l - beginning.length);
        const reversed = _(beginning).concat(end).reverse().value();
        for (const reverseVal of reversed) {
            valList[currentIdx] = reverseVal;
            currentIdx++;
            currentIdx = currentIdx % valList.length;
        }
        currentIdx += skip;
        currentIdx = currentIdx % valList.length;
        skip++;
    }
    
    return valList[0] * valList[1];
};

export const part2 = (lengths: string) : string => {
    const valList = _.range(0, 256);
    const lengthVals = _(lengths)
        .map((l) => l.charCodeAt(0))
        .compact()
        .concat([17, 31, 73, 47, 23])
        .value()

    let skip = 0;
    let currentIdx = 0;

    for(let xyz = 0; xyz < 64; xyz++) {
        for (const l of lengthVals) {
            const beginning = _.slice(valList, currentIdx, currentIdx+l);
            const end = _.slice(valList, 0, l - beginning.length);
            const reversed = _(beginning).concat(end).reverse().value();
            for (const reverseVal of reversed) {
                valList[currentIdx] = reverseVal;
                currentIdx++;
                currentIdx = currentIdx % valList.length;
            }
            currentIdx += skip;
            currentIdx = currentIdx % valList.length;
            skip++;
        }
    }

    return _(valList)
    .chunk(16)
    .map(chnk =>  _.reduce(chnk, (a,b) => a ^ b, 0))
    .map(x => x.toString(16))
    .map(x => _.padStart(x,2,"0"))
    .join("");
};