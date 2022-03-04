import { Individual, randomValue } from "./main"

export enum MutationOperator {
    Gaussion,
    Cauchy,
    Uniform,
}

// Standard Normal variate using Box-Muller transform.
function gaussion(): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}



function cauchy(): number {
    return Math.tan(Math.PI * (Math.random() - 0.5));
}

function randomLine(length: number): number[] {
    let res = [];
    for (let i = 0; i < length; i++) {
        res.push(Math.random());
    }
    return res;
}

export function Uniform(ind: Individual, mut: number, LB: number, UB: number, _step_size: number = 0): Individual {
    let r = randomLine(ind.dimension);
    for (let i = 0; i < ind.dimension; i++) {
        if (r[i] < mut) {
            let newValue = randomValue(-1.28, 1.28);
            newValue = newValue > UB ? UB : newValue;
            newValue = newValue < LB ? LB : newValue;
            ind.val[i] = newValue;
        }
    }
    return ind;
}

export function Gaussion(ind: Individual, _mut: number, LB: number, UB: number, step_size: number): Individual {
    for (let i = 0; i < ind.dimension; i++) {
        let newValue = ind.val[i] + gaussion() * step_size;
        newValue = newValue > UB ? UB : newValue;
        newValue = newValue < LB ? LB : newValue;
        ind.val[i] = newValue;
    }
    return ind;
}

export function Cauchy(ind: Individual, _mut: number, LB: number, UB: number, step_size: number): Individual {
    for (let i = 0; i < ind.dimension; i++) {
        let newValue = ind.val[i] + cauchy() * step_size;
        newValue = newValue > UB ? UB : newValue;
        newValue = newValue < LB ? LB : newValue;
        ind.val[i] = newValue;
    }
    return ind;
}