const isArray = (object) => {
    return (
        object !== null &&
        typeof object === "object" &&
        object.length !== undefined
    );
};

const lerpPoints = (pointA, pointB, prcent) => {
    // TODO: find if arguments are valid

    // This part will run if pointA and PointB are 2D points and precent is number from 0 to 1
    const x = pointA.x + (pointB.x - pointA.x) * prcent;
    const y = pointA.y + (pointB.y - pointA.y) * prcent;
    return { x, y };
};
class BézierCurve {
    constructor(anchor1, anchor2, ...controlPoints) {
        this.anchor1 = anchor1;
        this.anchor2 = anchor2;
        if (isArray(controlPoints)[0]) {
            this.controlPoints = controlPoints[0];
        } else {
            this.controlPoints = controlPoints;
        }
        this.t = 0.01;
    }
    getCurve(n) {
        let points = [];
        for (let t = 0; t <= 1; t += this.t) {
            if (n == 0) {
                const { x, y } = this.#LinearBéziercurves(
                    this.anchor1,
                    this.anchor2,
                    t
                );
                points.push({ x, y });
            }
            if (n === 1) {
                const { x, y } = this.#QuadraticBéziercurves(
                    this.anchor1,
                    this.anchor2,
                    this.controlPoints[0],
                    t
                );
            }
            if (n === 2) {
                const { x, y } = this.#CubicBéziercurves(
                    this.anchor1,
                    this.anchor2,
                    this.controlPoints[0],
                    this.controlPoints[1],
                    t
                );
            }
        }
        return points;
    }
    // 0 control point
    #LinearBéziercurves(pointA, pointB, t) {
        return ({ x, y } = lerpPoints(pointA, pointB, t));
    }
    // 1 control point
    #QuadraticBéziercurves(pointA, pointB, pointC, t) {
        const left = this.#LinearBéziercurves(pointA, pointC, t);
        const right = this.#LinearBéziercurves(pointC, pointB, t);
        const p = this.#LinearBéziercurves(left, right, t);
        return p;
    }
    // 2 control points
    #CubicBéziercurves(pointA, pointB, pointC, pointD, t) {
        const left = this.#CubicBéziercurves(pointA, pointB, pointC, t);
        const right = this.#CubicBéziercurves(pointA, pointB, pointD, t);
        const p = this.#LinearBéziercurves(left, right, t);
        return p;
    }
}
