class Vector {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor (x=0, y=0, width=0, height=0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get left() {
        return this.x;
    }

    get right() {
        return this.x + this.width;
    }

    get top() {
        return this.y;
    }

    get bottom() {
        return this.y + this.height;
    }
}