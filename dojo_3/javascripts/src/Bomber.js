"use strict"

class Bomber {

    constructor(cell){
        this.cell = cell;
    }

    stepsIn(cell) {
        this.cell = cell;
    }

    isIn(cell) {
        return this.cell.is(cell)
    }
};

module.exports.Bomber;