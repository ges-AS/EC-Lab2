import { Individual } from "./main"

export enum RecombinationOperator {
    Arithmetic,
    SimpleArithmetic,
    SingleArithmetic,
}

export function randomPoint(max: number): number {
    return Math.floor(Math.random() * max);
}

export function Arithmetic(parent1: Individual, parent2: Individual, weight: number): { children1: Individual, children2: Individual } {
    let children1 = parent1.mul_scalar(weight).add(parent2.mul_scalar(1 - weight));
    let children2 = parent2.mul_scalar(weight).add(parent1.mul_scalar(1 - weight));
    return {
        children1, children2
    }
}

export function SimpleArithmetic(parent1: Individual, parent2: Individual, weight: number): { children1: Individual, children2: Individual } {
    let p = randomPoint(parent1.dimension);
    let children1 = parent1.mul_scalar(weight, p).add(parent2.mul_scalar(1 - weight, p), p);
    let children2 = parent2.mul_scalar(weight, p).add(parent1.mul_scalar(1 - weight, p), p);
    return {
        children1, children2
    }
}

export function SingleArithmetic(parent1: Individual, parent2: Individual, weight: number): { children1: Individual, children2: Individual } {
    let p = randomPoint(parent1.dimension);
    let children1 = parent1.mul_scalar(weight, p, p + 1).add(parent2.mul_scalar(1 - weight, p, p + 1), p, p + 1);
    let children2 = parent2.mul_scalar(weight, p, p + 1).add(parent1.mul_scalar(1 - weight, p, p + 1), p, p + 1);
    return {
        children1, children2
    }
}