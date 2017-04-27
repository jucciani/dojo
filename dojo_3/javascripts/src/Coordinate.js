"use strict"

class Coordinate {

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    is(coordinate) {
        return this.x === coordinate.x && this.y === coordinate.y;
    }
};

module.exports.Coordinate;