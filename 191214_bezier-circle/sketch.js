let stepSlider;
let W, H;

function setup() {
    frameRate(30);
    createCanvas(640, 640);

    stepSlider = createSlider(3, 10, 3, 1);
    stepSlider.position(30, 30);
    W = width;
    H = height;
}

function draw() {
    clear();
    background('#333333');
    line(1);
    noFill();

    let step = stepSlider.value();

    translate(W / 2, H / 2);

    stroke(128);
    let points = bezier_circle(W / 2, H / 2, 180, step);
    visualize_bezier(points);
}
