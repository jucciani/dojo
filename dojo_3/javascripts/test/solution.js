const chai = require('chai');

var Bomber = class Bomber {

    constructor(cell){
        this.cell = cell;
    }

    stepsIn(cell) {
        cell.releasedBy(this);
        cell.reclaimedBy(this);
        this.cell = cell;
    }

    isIn(cell) {
        return this.is(cell);
    }
};

var Coordinate = class Coordinate {

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    is(coordinate) {
        return this.x === coordinate.x && this.y === coordinate.y;
    }
};

var Cell = class Cell {

    constructor(coordinate) {
        this.coordinate = coordinate;
    };

    reclaimedBy(bomber) {
        if (!this.bomber) {
            this.bomber = bomber; 
        } else {
            throw new Error("Bussy Cell");
        }
    }

    releasedBy(bomber) {
        this.bomber = undefined;
    }

    is(cell) {
        this.coordinate.is(cell.coordinate);
    }

};


describe("bomberman", () => {
    describe("bomberman", () => {

        it("steps into a cell which is empty then it moves in", () => {
            var coord1 = new Coordinate(0,0);
            var bomber = new Bomber(coord1);

            var coord2 = new Coordinate(1,1);
            var cell2 = new Cell(coord2);

            bomber.stepsIn( cell2 );

            chai.assert.equal(bomber.isIn(cell2), true);
        });

        it("steps into a cell which is busy with an object then it doesn't move and throw an exception", () => {
            var coord1 = new Coordinate(0,0);
            var bomber = new Bomber(coord1);

            var coord2 = new Coordinate(1,1);
            var bomber2 = new Bomber(coord2);
            var cell2 = new Cell(coord2);
            cell2.reclaimedBy(bomber2);

            console.log(bomber);
            console.log(cell2.bomber);

            chai.assert.throws(() => { bomber.stepsIn( cell2 ) });

        });

        it.skip("steps into a cell which is busy with an enemy then it dies", () => {
        });

        it.skip("leaves a boom next to a brick, the boom explotes and the bricks disappears", () => {
        });

        it.skip("throws a boom to a brick, the boom explotes and the bricks disappears", () => {
        });
    });

});



