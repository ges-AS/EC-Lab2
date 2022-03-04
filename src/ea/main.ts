import { Cauchy, Gaussion, MutationOperator, Uniform } from "./mut_op";
import { Arithmetic, RecombinationOperator, SimpleArithmetic, SingleArithmetic } from "./rec_op";

export function randomValue(lower: number, upper: number): number {
    return Math.random() * (upper - lower) + lower
}

export class Individual {
    val: number[];
    constructor() {
        this.val = [];
        for (let i = 0; i < 30; i++) {
            this.val.push(randomValue(-1.28, 1.28));
        }
    }

    get dimension(): number {
        return this.val.length;
    }

    clone(): Individual {
        let i = new Individual();
        i.val = this.val.slice();
        return i;
    }

    // return new
    mul_scalar(scalar: number, start?: number, end?: number): Individual {
        let res = this.clone();
        let _start = start || 0;
        let _end = end || res.val.length;
        for (let i = _start; i < _end; i++) {
            res.val[i] = res.val[i] * scalar;
        }
        return res;
    }

    // return new
    add(other: Individual, start?: number, end?: number): Individual {
        let res = this.clone();
        let _start = start || 0;
        let _end = end || res.val.length;
        for (let i = _start; i < _end; i++) {
            res.val[i] = res.val[i] + other.val[i];
        }
        return res;
    }

    get_fitness_value() {
        return this.val.reduce((previousValue, currentValue, currentIndex) => {
            return previousValue + currentIndex * Math.pow(currentValue, 4);
        }, 0) + Math.random()
    }
}

function random_population(poulation_size: number): Individual[] {
    let res = []
    for (let i = 0; i < poulation_size; i++) {
        res.push(new Individual());
    }
    return res;
}
const rec_ops = [
    Arithmetic,
    SimpleArithmetic,
    SingleArithmetic
];
const mut_ops = [
    Gaussion,
    Cauchy,
    Uniform,
];

export function run_ea(poulation_size: number, max_time: number, weight: number, mutation: number, step_size: number, rec_op: RecombinationOperator, mut_op: MutationOperator): {
    best_so_far: number[];
    best_current: number[];
} | string {
    // select op
    let _rec_op = rec_ops[rec_op];
    let _mut_op = mut_ops[mut_op];

    // init record
    let record: {
        best_so_far: number[];
        best_current: number[];
    } = {
        best_so_far: [],
        best_current: []
    };

    // init population
    let population = random_population(poulation_size);

    for (let i = 0; i < max_time; i++) {
        // select 2 parents
        let fitness_vec = population.map((ind, index) => { return { fitness_value: ind.get_fitness_value(), index } });
        fitness_vec.sort((a, b) => a.fitness_value - b.fitness_value);
        let parent1 = population[fitness_vec[0].index];
        let parent2 = population[fitness_vec[1].index];
        // record
        if (record.best_so_far.length === 0) {
            record.best_so_far.push(fitness_vec[0].fitness_value);
            record.best_current.push(fitness_vec[0].fitness_value);
        } else {
            record.best_current.push(fitness_vec[0].fitness_value);
            if (record.best_so_far[record.best_so_far.length - 1] > fitness_vec[0].fitness_value) {
                record.best_so_far.push(fitness_vec[0].fitness_value);
            } else {
                record.best_so_far.push(record.best_so_far[record.best_so_far.length - 1]);
            }
        }

        // new population
        population = [];
        while (population.length <= poulation_size) {
            let a = _rec_op(parent1, parent2, weight);
            population.push(_mut_op(a.children1, mutation, -1.28, 1.28, step_size));
            population.push(_mut_op(a.children2, mutation, -1.28, 1.28, step_size));
        }
        if (population.length > poulation_size) population.pop();
    }
    return record;
}