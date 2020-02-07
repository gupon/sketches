// study from: https://tylerxhobbs.com/essays/2020/flow-fields

const W = 640;
const H = 480;

let grid = [[]];
let area = new Rectangle();
let resolution;
let rows, cols;

function setup() {
    createCanvas(W, H);
    noLoop();

    area = new Rectangle(-W*0.5, -H*0.5, W*2, H*2);
    resolution = floor(W * 0.02);
    cols = floor(area.width / resolution);
    rows = floor(area.height / resolution);
    grid = Array.from(Array(rows), ()=> new Array(cols));
}

function draw() {
    let default_angle = PI * 0.25;

    for (let y=0; y<rows; y++) {
        for (let x=0; x<cols; x++) {
            grid[y][x] = y / rows * PI;
        }
    }
    
    let px, py, angle;
    for (let y=0; y<rows; y++) {
        for (let x=0; x<cols; x++) {
            angle = grid[y][x];
            px = area.x + x * resolution;
            py = area.y + y * resolution;
            dx = cos(angle) * 6;
            dy = sin(angle) * 6

            ellipse(px, py, 2, 2)
            line(px, py, px + dx, py + dy);
        }
    }

    noFill();
    stroke(255, 0, 0);
    strokeWeight(3);
    beginShape();
    let steps = 40;
    let step_length = 10;
    let p = new Vector(250, 50);
    for (let i=0; i<steps; i++) {
        let col_i = round((p.x - area.x) / resolution);
        let row_i = round((p.y - area.y) / resolution)
        let angle = grid[row_i][col_i];
        p.x += cos(angle) * step_length;
        p.y += sin(angle) * step_length;
        vertex(p.x, p.y);
    }
    endShape();
}