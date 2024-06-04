// All shaps classes are 2D shapres
class Point {
    x
    y
    constructor(_x = 0, _y = 0) {
        if (typeof _x === "number" && typeof _y === "number") {
            this.x = _x;
            this.y = _y;
        } else {
            throw new Error("x and y must be numbder");
        }
    }

    // #region static_costrutros

    static fromVector() {}
    static fromArray() {}
    static fromObject() {}

    // #endregion

    // #region basic_operation

    move(dX = 0, dY = 0) {
        if (typeof dX === "number" && typeof dY === "number") {
            this.x += dX;
            this.y += dY;
        } else {
            throw new Error("delta x and delta y must be numbder");
        }
    }

    // compare and equal
    compare(point,axis){
        if(!(point instanceof Point)){
            throw new Error("invalid point");
        }
        if(axis.toLowerCase() === "x" || axis.toLowerCase() === "y"){
            return this[axis] > point[axis] ? 1 : this.isEqual(point) ? 0 : -1;
        }
    }
    static pointsCompare(point1,point2,axis){
        if(!(point1 instanceof Point)){
            throw new Error("invalid point");
        }
        return point1.compare(point2);
    }

    isEqual(point){
        if(!(point instanceof Point)){
            throw new Error("invalid point");
        }
        return this.x === point.x && this.y === point.y;
    }

    static isPointsEqual(point1,point2){
        if(!(point1 instanceof Point)){
            throw new Error("invalid point");
        }
        return point1.isEqual(point2);
    }

    inOnALine(line){
        if(!(line instanceof Line)){
            throw new Error ("invalid line");
        }
        if(line.m !== undefined && line.b !== undefined){
            // if the point x value is not in the range of the line
            // the pont is not on the line
            if(this.x < line.pointA.x || this.x > this.pointB.x){
                return false;
            }
            // if point(x,y) is part of y = mx + b
            const y = line.m * this.x + line.b;
            return y === this.y;
        }else{
            //distanceWay
            return this.distanceFrom(line) === 0;
            
        }
    }
    static isPointOnALine(point,line){
        if(!(point instanceof Point)){
            throw new Error("invalid point");
        }
        return point.inOnALine(line);
    }
    // #endregion

    // #region point_aritmatic

    static distance(object1, object2) {
         if (object1 instanceof Point){
            if(object2 instanceof Point){
                return object1.distanceFrom(object2);
            }
            if(object2 instanceof Line){
                return object2.distanceFromPoint(object1)
            }
        }
    }
    distanceFrom(object) {
        if (object instanceof Point){
            return Math.sqrt(
                Math.pow(this.x - object.x, 2) + Math.pow(this.y - object.y, 2)
            );
        }
        if(object instanceof Line){
            return object.distanceFromPoint(this);
        }
    }

    // #endregion

    // #region display
    toString() {
        return `(${thjis.x},${thjis.y})`;
    }
    print(){
        console.log(this.toString());
    }
    // #endregion
}

class Line {
    m = undefined;
    b = undefined;
    constructor(_pointA, _pointB, setEquation = true) {
        if (_pointA instanceof Point && _pointB instanceof Point) {
            if(_pointA.x === _pointB.x){
                if(_pointA.y === _pointB.y){
                    console.warn("both points are the same, i.e this line is a point");
                }else if(poineA.y < this.pointB.y){
                    this.pointA = _pointA;
                    this.pointB = _pointB;
                }else{
                    this.pointA = _pointB;
                    this.pointB = _pointA;
                }
            }else{
                if(_pointA.x < _pointB.x){
                    this.pointA = _pointA;
                    this.pointB = _pointB;
                }else{
                    this.pointA = _pointB;
                    this.pointB = _pointA;
                }
                if(setEquation){
                    this.createEquation();
                }
            }
           
        } else {
            throw new Error("x and y must be numbder");
        }
    }

    // #region static_costrutros

    static fromVector() {}
    static fromArray() {}
    static fromObject() {}

    // #endregion

    // #region line_operation

    createEquation(){
        //start
        const startX = this.pointA.x;
        const startY = this.pointA.y;
        //end
        const endX = this.pointB.x;
        const endY = this.pointB.y;
        // y = mx + b
        const dX = endX - startX;
        if(dX !== 0){
            const dY = endY - startY;
            const m = dY/dX;
            const dYintercept = startY*endX - startX*endY;
            const b = dYintercept / dX;
            this.m = m;
            this.b = b;
        }
    }

    shift(dx=0,dy=0){
        if(typeof dx === "number" && typeof dy === "number"){
            this.pointA.x += dx;
            this.pointB.x += dx;
            this.pointA.y += dy;
            this.pointB.y += dy;
        }
    }

    rotate(alpha=0,isRadian = false){
    if(typeof alpha === "number"){
        const anlge = isRadian ?  alpha : alpha * (Math.PI / 180);
            // find the middle point m
            const middle = {
                x:(this.pointA.x + this.pointB.x)/2,
                y:(this.pointA.y + this.pointB.y)/2,
            }
    
            // moving pointA and pointB so middle is at 0,0
            const shiftedPointA = {
                x:this.pointA.x - middle.x,
                x:this.pointA.y - middle.y,
            }
            const shiftedPointB = {
                x:this.pointB.x - middle.x,
                x:this.pointB.y - middle.y,
            }
    
            // rotate by aplpha
            shiftedPointA.x = shiftedPointA.x * Math.cos(anlge) -  shiftedPointA.y * Math.sin(anlge);
            shiftedPointA.y = shiftedPointA.x * Math.sin(anlge) +  shiftedPointA.y * Math.cos(anlge);
    
            shiftedPointB.x = shiftedPointB.x * Math.cos(anlge) -  shiftedPointB.y * Math.sin(anlge);
            shiftedPointB.y = shiftedPointB.x * Math.sin(anlge) +  shiftedPointB.y * Math.cos(anlge);
    
            // move back 
            this.pointA.x = shiftedPointA.x + middle.x;
            this.pointA.y = shiftedPointA.y + middle.y;
    
            this.pointB.x = shiftedPointB.x + middle.x;
            this.pointB.y = shiftedPointB.y + middle.y;
        }    
    }

    isParalle(line){
        if(!(line instanceof Line)){
            throw new Error("invalid line");
        }
        if((this.m !== undefined && this.n !== undefined) && (line.m !== undefined && line.n !== undefined)){
            return this.m === line.m;
        }else{
            throw new Error("line equstion must be set");
        }

    }

    static areLinesParalle(line1,line2){
        if(!(line1 instanceof Line)){
            throw new Error("invalid line");
        }
        return line1.isParalle(line2);
    }

    isInterSecteting(line){
        //Given two points on each line segment
        /*
            PxU = (x1*y2 - y1*x2)(x3 - x4) - (x1 - x2)*(x3*y4 - y3*x4)
            PxD = (x1 - x2)(y3 - y4) - (y1 - y2)*(x3 - x4)
            PyU = (x1*y2 - y1*x2)(y3 - y4) - (y1 - y2)*(x3*y4 - y3*x4)
            PyD = (x1 - x2)(y3 - y4) - (y1 - y2)*(x3 - x4)
        */
        if(!(line instanceof Line)){
            throw new Error("invlaid line");
        }
        if(this.m !== undefined && line.m !== undefined && this.m === line.m){
            return false;
        }
        const x1 = this.pointA.x;
        const y1 = this.pointA.y;
        const x2 = this.pointB.x;
        const y2 = this.pointB.y;
        const x3 = line.pointA.x;
        const y3 = line.pointA.y;
        const x4 = line.pointB.x;
        const y4 = line.pointB.y;
       
        const bottomPart = (x1 - x2)(y3 - y4) - (y1 - y2)*(x3 - x4);

        if(bottomPart === 0 ){
            return false;
        }

        const x = (x1*y2 - y1*x2)(x3 - x4) - (x1 - x2)*(x3*y4 - y3*x4);
        const y = (x1*y2 - y1*x2)(y3 - y4) - (y1 - y2)*(x3*y4 - y3*x4);
        
        const enterSectionPoint = new Point(x,y);

        //if x,y or not on a line then return ture; as "line are intersecting" but the point is not of the lines; else return the enterSectionPoint
        if(this.pointA.inOnALine(line)){
            return enterSectionPoint;
        }else{
            return true;
        }
    }
    static areLinesIntersecting(line1,line2){
        if(!(line1 instanceof Line)){
            throw new Error("ivalid line");
        }
        return line1.isInterSecteting(line2);
    }
    
    // #endregion

    // #region line_aritmatics

    distanceFromPoint(point){
        if(!(point instanceof Point)){
            throw new Error("invalid point");
        }
        //using Line defined by two points
        const lineLenghth = Point.distance(this.pointA,this.pointB);
        if(lineLenghth !== 0){
            const dPoint = Math.abs((((this.pointB.y - this.pointA.y)*point.x) - ((this.pointB.x - this.pointA.x)*point.y) + this.pointB.x*this.pointA.y - this.pointB.y*this.pointA.x));
            return dPoint / lineLenghth;
        }
    }

    // #endregion

    // #region

    // #endregion

    // #region display
    toString(point) {}
    // #endregion
}
