// Vector is origin and diration.
// The diration is a point
// The origin will be 0,0 but can be move
class Vectors {
    constructor(point) {
        if (!(point instanceof Point)) {
            throw new Error("invalid diratoin");
        }
        this.origin = new Point(0, 0);
        this.diraction = point;
        this.length = this.getLength();
    }
    getLength() {
        return this.origin.distanceFrom(this.diraction);
    }
}
