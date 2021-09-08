// study from: https://tylerxhobbs.com/essays/2020/flow-fields

const W = 720;
const H = 720;

let grid = [[]];
let area = new Rectangle();
let resolution;
let rows, cols;
let cvs;

function setup() {
    cvs = createCanvas(W, H);
    // noLoop();
    frameRate(3);

    area = new Rectangle(-W*0.5, -H*0.5, W*2, H*2);
    resolution = floor(W * 0.005);
    cols = floor(area.width / resolution);
    rows = floor(area.height / resolution);
    grid = Array.from(Array(rows), ()=> new Array(cols));
}

function draw() {
    let default_angle = PI * 0.25;

    background(255);
    // create an angle field
    noiseSeed(1);
    let scale = 0.02 * resolution;
    for (let y=0; y<rows; y++) {
        for (let x=0; x<cols; x++) {
            let val = noise(x * scale, pow(y * scale, 0.8), frameCount*0.1);
            grid[y][x] = val * TWO_PI;
        }
    }
    
    // draw field
    let px, py, angle;
    stroke(0, 0, 0, 60);
    /*
    for (let y=0; y<rows; y++) {
        for (let x=0; x<cols; x++) {
            angle = grid[y][x];
            px = area.x + x * resolution;
            py = area.y + y * resolution;
            dx = cos(angle) * 6;
            dy = sin(angle) * 6

            ellipse(px, py, 2, 2);
            line(px, py, px + dx, py + dy);
        }
    }
    */

    noFill();
    stroke(255, 0, 0);

    let steps = 10;
    let step_length = 10;
    let p = new Vector();

    let _x, _y = 0;
    let ANGLE_STEP = PI / 6;
    let theta = 0;
    let r = W * 0.3;

    r = map(noise(frameCount*0.4, 2.4), 0, 1, 60, 80);
    let num = 16000;
    let r2 = 50;
    for (let j=0; j<num; j++) {
        theta = random(PI*2);

        _x = W/2 + sin(theta) * r;
        _y = H/2 + cos(theta) * r;
        if (j > num * 0.95) {
            _x += random(-r2, r2);
            _y += random(-r2, r2);
        }
        p = new Vector(_x + random(step_length)*1.4, _y + random(step_length)*1.4);
        let dir = random() < 0.5 ? 1 : -1;
        steps = pow(random(1, 5), 1.7);

        stroke(255, random(255), 0, random(10, 100));
        if (random() > 0.95) stroke(255, random(255), 0, 200);
        strokeWeight(random(0.5,1.5));
        beginShape();
        for (let i=0; i<steps; i++) {
            // let col_i = round((p.x - area.x) / resolution);
            // let row_i = round((p.y - area.y) / resolution);
            vertex(p.x, p.y);
            let col_i = round(p.x / resolution);
            let row_i = round(p.y / resolution);
            if (col_i < 0 || col_i >= cols || row_i < 0 || row_i >= rows) break;
            if (random() < 0.2) break;
            let angle = grid[row_i][col_i];
            angle = floor(angle / ANGLE_STEP) * ANGLE_STEP;
            p.x += cos(angle) * step_length * dir;
            p.y += sin(angle) * step_length * dir;;
            vertex(p.x, p.y);
        }
        endShape();
    }
    // saveCanvas(cvs, "sketch" + String(frameCount), "png");
}