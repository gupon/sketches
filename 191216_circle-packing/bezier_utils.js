const LENGTH_STEP = 200;

class BezierCurve {
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this._length = -1;
        this.tLengthTable = [];
    }

    get length() {
        if (this._length < 0) {
            let length = 0;
            let pA = this.a;
            let pB;
            for (let t = 0; t <= 1; t += 1 / LENGTH_STEP) {
                pB = this.pointAt(t);
                length += p5.Vector.sub(pA, pB).mag();
                this.tLengthTable.push([t, length]);
                pA = pB;
            }
            this._length = length;
        }
        return this._length;
    }

    tFromLength(length) {
        if (length <= 0) {
            return 0;
        } else if (length >= this.length) {
            return 1;
        } else {
            let i;
            for (i = 1; i < this.tLengthTable.length; i++) {
                if (this.tLengthTable[i][1] > length) {
                    break;
                }
            }
            let tA = this.tLengthTable[i - 1][0];
            let tB = this.tLengthTable[i][0];
            let lenA = this.tLengthTable[i - 1][1];
            let lenB = this.tLengthTable[i][1];
            return tA + (lenB - length) / (lenB - lenA) * (tB - tA);
        }
    }

    pointAt(t) {
        return createVector(
            bezierPoint(this.a.x, this.b.x, this.c.x, this.d.x, t),
            bezierPoint(this.a.y, this.b.y, this.c.y, this.d.y, t)
        );
    }
}

class BezierCurves {
    constructor(curves = []) {
        this.curves = curves;
    }

    push(curve) {
        this.curves.push(curve);
    }

    draw() {
        if (!this.curves.length) return;
        beginShape();
        vertex(this.curves[0].a.x, this.curves[0].a.y);
        this.curves.forEach(function (c) {
            bezierVertex(c.b.x, c.b.y, c.c.x, c.c.y, c.d.x, c.d.y);
        });
        endShape();
    }

    visualize() {
        const ANCHOR_SIZE = 8;
        const CONTROL_SIZE = 4;

        ellipse(this.curves[0].x, this.curves[0].y, ANCHOR_SIZE);
        this.curves.forEach(function (c) {
            stroke(255, 0, 0);
            line(c.a.x, c.a.y, c.b.x, c.b.y);
            line(c.c.x, c.c.y, c.d.x, c.d.y);
            stroke(255);
            ellipse(c.d.x, c.d.y, ANCHOR_SIZE);
            rectMode(CENTER);
            rect(c.b.x, c.b.y, CONTROL_SIZE, CONTROL_SIZE);
            rect(c.c.x, c.c.y, CONTROL_SIZE, CONTROL_SIZE);
        });
    }

    get length() {
        return this.curves.reduce((curr, x) => curr += x.length, 0);
    }

    pointAtLength(length) {
        if (length >= this.length) {
            return this.curves[this.curves.length - 1].d.copy();
        }
        let totalLength = 0;
        for (let i = 0; i < this.curves.length; i++) {
            let curve = this.curves[i];
            if (length < totalLength + curve.length) {
                return curve.pointAt(curve.tFromLength(length - totalLength))
            } else {
                totalLength += curve.length;
            }
        }
    }
}


/**
 * visualize bezier anchor/control points and handles
 * @param {Array<p5.Vector>} points list of bezier points
 */
function visualize_bezier(points) {
    let p0, p1, p2, p3;
    const ANCHOR_SIZE = 6;
    const CONTROL_SIZE = 4;
    for (let i = 0; i < points.length - 1; i += 3) {
        p0 = points[i + 0];
        p1 = points[i + 1];
        p2 = points[i + 2];
        p3 = points[i + 3];
        stroke(255, 0, 0);
        line(p0.x, p0.y, p1.x, p1.y);
        line(p2.x, p2.y, p3.x, p3.y);
        stroke(255);
        ellipse(p0.x, p0.y, ANCHOR_SIZE);
        rectMode(CENTER);
        rect(p1.x, p1.y, CONTROL_SIZE, CONTROL_SIZE);
        rect(p2.x, p2.y, CONTROL_SIZE, CONTROL_SIZE);
    }
}



/**
 * create curcle BezierCurves consists of given number of curves
 * @return {BezierCurves}
 */
function bezier_circle(x, y, radius, step = 4) {
    const RAD = radius;
    const STEP = step;
    const HANDLE_RAD_RATIO = (4 / 3) * tan(PI / (2 * STEP));
    let curves = new BezierCurves();

    let p0, p1, p2, p3;
    p0 = createVector(RAD, 0);
    for (let i = 1; i <= STEP; i++) {
        angle = TWO_PI / STEP * i;
        p3 = createVector(cos(angle) * RAD, sin(angle) * RAD);
        p1 = p5.Vector.add(p0, createVector(-p0.y, p0.x).mult(HANDLE_RAD_RATIO));
        p2 = p5.Vector.add(p3, createVector(p3.y, -p3.x).mult(HANDLE_RAD_RATIO));
        curves.push(new BezierCurve(p0, p1, p2, p3));
        p0 = p3;
    }
    return curves;
}