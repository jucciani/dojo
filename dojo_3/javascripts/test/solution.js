const chai = require('chai');

var Bomber = class Bomber {

    constructor(initialPosition){
        initialPosition.reclaimedBy(this);
        this.currentPosition = initialPosition;
        this.alive = true;
    }

    stepsIn(newPosition) {
        newPosition.reclaimedBy(this);
        this.currentPosition = newPosition;
    }

    bumpsInto(objectOrEnemy) {
        objectOrEnemy.bumpsIntoWithBomber(this);
    }

    stepsOut(position) {
        position.release();
    }

    isIn(position) {
        return this.currentPosition === position;
    }

    kill() {
        this.alive = false;
    }

    isDead() {
        return !this.alive;
    }

    isAlive() {
        return this.alive;
    }
};

var Bagulaa = class Bagulaa {

    constructor(initialPosition) {
        initialPosition.reclaimedBy(this);
        this.currentPosition = initialPosition;
    }

    bumpsIntoWithBomber(bomber) {
        bomber.kill();
    }

    stepsIn(newPosition) {
        newPosition.reclaimedBy(this);
        this.currentPosition = newPosition;
    }

    stepsOut(position) {
        position.release();
    }

    isIn(position) {
        return this.currentPosition === position;
    }
};

var Wall = class Wall {
    bumpsIntoWithBomber(bomber) {
        throw new Error("Aca nOO");
    }
};

var Cell = class Cell {

    constructor(okupa) {
        this.okupa = okupa;
    };

    reclaimedBy(reclaimer) {
        if(this.okupa) {
           reclaimer.bumpsInto(this.okupa);   
        } else {
            this.okupa = reclaimer;
        }
    }

    release() {
        this.okupa = undefined;
    }
};


describe("bomberman", () => {
    describe("bomberman", () => {

        it("steps into a cell which is empty then it moves in", () => {
            //SetUp
            var bomber = new Bomber(new Cell());
            var there = new Cell();

            //Run test
            bomber.stepsIn( there );
            chai.assert.equal(bomber.isIn(there), true);
        });

        it("steps into a cell which is busy with an object then it doesn't move and throw an exception", () => {
            //SetUp
            var bomber = new Bomber(new Cell());
            var there = new Cell(new Wall());

            //Run test
            chai.assert.throws(() => { bomber.stepsIn( there ) }, Error);
        });

        it("steps into a cell which is busy with an enemy then it dies", () => {
            //SetUp
            var bomber = new Bomber(new Cell());

            var there = new Cell();
            var bagulaa = new Bagulaa(there);

            //Run test
            bomber.stepsIn(there);
            chai.assert.equal(bomber.isDead(), true);
            chai.assert.equal(bomber.isAlive(), false);
        });

        it.skip("leaves a boom next to a brick, the boom explotes and the bricks disappears", () => {
        });

        it.skip("throws a boom to a brick, the boom explotes and the bricks disappears", () => {
        });
    });

});



