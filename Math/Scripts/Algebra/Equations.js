class LinearEquation {
    constructor() {}
}
class QuadraticEquation {
    constructor(a, b, c) {
        if (
            typeof a === "number" &&
            typeof b === "number" &&
            typeof c === "number"
        ) {
            this.a = a;
            this.b = b;
            this.c = c;
        }
    }
    solve() {
        const x = [];
        const Discriminant = Math.pow(this.b, 2) - 4 * this.a * this.c;
        if (Discriminant < 0) {
            return undefined;
        } else {
            const root = Math.sqrt(Discriminant);
            x[0] = (-this.b + root) / (this.a * 2);
            x[1] = (-this.b - root) / (this.a * 2);
            return x;
        }
    }
}
