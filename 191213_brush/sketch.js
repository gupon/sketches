let img;

function preload() {
    img = loadImage("./assets/pencil_brush_w.png")
}

function setup() {
    frameRate(30);
    createCanvas(540, 960);
    background('#333333');
    noLoop();
}

function draw() {
    line(1);
    noFill();
    stroke(255);
    let w = width;
    let h = height;

    let p0 = new Point(w * .5, 100);
    let p1 = new Point(w * 0., h * .5);
    let p2 = new Point(w * 1., h * .5);
    let p3 = new Point(w * .5, h - 100);

    let t = 0.0
    let count = 0;
    const MIN_S = 0.1;
    const BASE_S = 0.5;
    const ROT_RND = PI * 0.4;
    do {
        let s = sin(PI * t) * (1.0 - MIN_S) + MIN_S;
        let x = bezierPoint(p0.x, p1.x, p2.x, p3.x, t);
        let y = bezierPoint(p0.y, p1.y, p2.y, p3.y, t);

        push();
        {
            translate(x, y);
            scale(s * BASE_S);
            rotate(random(ROT_RND) - ROT_RND * 0.5);
            translate(-img.width * .5, -img.height * .5);

            tint(255, random(30, 180));
            image(img, 0, 0, 128, 128);
        }
        pop();

        t += 0.010 * s;
    } while (t < 1.0);

    image(img, w - img.width, 0);
}
