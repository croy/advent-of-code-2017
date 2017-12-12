import * as _ from "lodash";

const combineCurry =  (steps: {[index: string]: number}) =>  (step1: string, step2: string, resultStep?: string) => {
    const eligible = _.min([steps[step1], steps[step2]]) || 0;
    steps[step1] -= eligible;
    steps[step2] -= eligible;
    if (resultStep) {
        steps[resultStep] += eligible;
    }
    return eligible !== 0;
}

const shortestPath = (steps: {[index: string]: number}) => {
    const combine = combineCurry(steps);
    
    while (combine("n","s") || 
        combine("ne", "sw") || 
        combine("nw", "se") || 
        combine("nw","ne","n") || 
        combine("sw","se","s") || 
        combine("ne", "s", "se") || 
        combine("nw","s", "sw"));

    return steps;
}

export const part1 = (...directions: string[]): number => {
    const steps: {
        [index: string]: number
    } = {
        ne: 0,
        nw: 0,
        n: 0,
        se: 0,
        s: 0,
        sw: 0
    };
    _.forEach(directions, direction => steps[direction]++);

    return _(shortestPath(steps)).values().sum();
}


export const part2 = (...directions: string[]): number => {
    let steps: {
        [index: string]: number
    } = {
        ne: 0,
        nw: 0,
        n: 0,
        se: 0,
        s: 0,
        sw: 0
    };
    let max = 0;
    _.forEach(directions, direction => {
        steps[direction]++;
        steps = shortestPath(steps);
        max = _.max([max, _(steps).values().sum()]) || 0;
    });

    return max;
}