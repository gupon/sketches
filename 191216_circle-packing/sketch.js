let stepSlider;
let radSlider;
const W = 512;
const H = 512;

let curves;

function setup() {
    frameRate(10);
    createCanvas(W, H);
    curves = bezier_circle(W / 2, H / 2, 160, 4);

    stepSlider = createSlider(3, 10, 5, 1);
    stepSlider.position(30, 30);
    radSlider = createSlider(2, 8, 5, 0.1);
    radSlider.position(30, 50);
}

function draw() {
    clear();
    background('#111');

    let radius = 0;
    let radScale = 1.0;
    let currLength = 0;
    let count = 0;

    let totalLength = curves.length;
    let modNum = stepSlider.value();
    let modRadScale = radSlider.value();

    strokeWeight(1.5);
    noFill();

    translate(W / 2, H / 2);
    randomSeed(modNum * 1000 + modNum);
    let rot = random(TWO_PI);
    rotate(rot);

    let circleInfo = [];
    let circleColor = color(255);
    while (currLength < totalLength) {
        radius = (count % modNum) * modRadScale + 5;
        circleColor = color((1 - (count % modNum) / 4) * 255 * 1.1, 80 * 1.1, 110 * 1.1);
        currLength += radius + 3 / radius + 1;
        circleInfo.push([currLength, radius, circleColor])

        if (currLength + radius > totalLength) {
            radScale = totalLength / (currLength + radius);
            break;
        } else {
            currLength += radius + 3 / radius;
        }
        count++;
    }

    for (let i = 0; i < circleInfo.length; i++) {
        let info = circleInfo[i];
        let pt = curves.pointAtLength(info[0] * radScale);
        stroke(info[2]);
        ellipse(pt.x, pt.y, info[1] * 2 * radScale);
    }
}
