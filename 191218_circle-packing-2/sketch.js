const W = 640;
const H = 640;

function setup() {
    createCanvas(W, H);
    noLoop();
}

function draw() {
    clear();
    background('#111');
    blendMode(ADD);

    strokeWeight(1.5);
    noFill();


    let step = 9;
    for (let i = step; i >= 0; i--) {
        drawCircle(
            65 + i * ((1 - i / step) * 25 + 66),
            pow((1 - i / step), 2) * 1.7);
    }
    saveCanvas("circle-circle-2.png");
}

function drawCircle(radius, radiusScale = 1) {
    push();
    translate(W / 2, H / 2);

    let curves = bezier_circle(W / 2, H / 2, radius, 4);
    let circleInfo = [];
    let circleColor = color(255);
    let radScale = 1.0;
    let currLength = 0;
    let count = 0;

    let totalLength = curves.length;
    let modNum = 5;
    let modRadScale = 3;
    // curves.visualize();
    blendMode(MULTIPLY);
    background(0, 10 * (2.0 - radiusScale));
    blendMode(ADD);
    strokeWeight(1);
    stroke(128, 0, 0);
    strokeWeight(1.5);
    curves.draw();
    while (currLength < totalLength) {
        // radius = (count % modNum) * modRadScale + 3;
        radius = (sin(count * PI * 0.5) + 1) * 0.5 * 25 + 8;
        radius *= radiusScale;
        circleColor = color(pow(random(30) + 10, 1.4));
        // circleColor = color((1 - (count % modNum) / 4) * 200 * 1.1, 80, 110 * 1.1);
        currLength += radius * 1.05 + 1;
        circleInfo.push([currLength, radius, circleColor])

        if (currLength + radius > totalLength) {
            radScale = totalLength / (currLength + radius);
            break;
        } else {
            currLength += radius * 1.05 + 1;
        }
        count++;
    }

    for (let i = 0; i < circleInfo.length; i++) {
        let info = circleInfo[i];
        let pt = curves.pointAtLength(info[0] * radScale);
        let c = info[2];
        noFill();
        // stroke(brightness(c));
        stroke(c);
        ellipse(pt.x, pt.y, info[1] * 2 * radScale);
        // fill(b);
        // noStroke();
        stroke(128);
        ellipse(pt.x, pt.y, 3);
    }
    pop();
}