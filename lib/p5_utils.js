class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
 * draw bezier circle consist of 4 anchor points.
 * @return {array<p5.Vector>} 
 */
function bezier_circle(x, y, radius, step = 4) {
    const RAD = radius;
    const STEP = step;
    const HANDLE_RAD_RATIO = (4 / 3) * tan(PI / (2 * STEP));
    let points = [];

    beginShape();
    let angle, anchor, prevAnchor, cp1, cp2;
    prevAnchor = createVector(RAD, 0);
    vertex(prevAnchor.x, prevAnchor.y);
    points.push(prevAnchor);

    for (let i = 1; i <= STEP; i++) {
        angle = TWO_PI / STEP * i;
        anchor = createVector(cos(angle) * RAD, sin(angle) * RAD);
        cp1 = p5.Vector.add(prevAnchor,
            createVector(-prevAnchor.y, prevAnchor.x).mult(HANDLE_RAD_RATIO));
        cp2 = p5.Vector.add(anchor,
            createVector(anchor.y, -anchor.x).mult(HANDLE_RAD_RATIO));
        bezierVertex(cp1.x, cp1.y, cp2.x, cp2.y, anchor.x, anchor.y);
        points.push(cp1, cp2, anchor);
        prevAnchor = anchor;
    }
    endShape();

    return points;
}