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

    dropBomb() {
        return new Bomb(this.currentPosition);
    }

    damagedByExplosion() {
        this.kill();
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

    constructor(occupant) {
        this.occupant = occupant;
    };

    reclaimedBy(reclaimer) {
        if (this.occupant) {
           reclaimer.bumpsInto(this.occupant);   
        } else {
            this.occupant = reclaimer;
        }
    }

    damagedBy(damageInflictor) {
        damageInflictor.damage(this.occupant);
    }

    release() {
        this.occupant = undefined;
    }
};

var Brick = class Brick {

    damagedByExplosion() {
        this.destroyed = true;
    }

    isDestroyed() {
        return this.destroyed;
    }
};

var Bomb = class Bomb {
    constructor(initialPosition) {
        this.currentPosition = initialPosition;
    }

    tick() {
        return new Explosion(this.currentPosition);
    }
};

var Explosion = class Explosion {

    constructor(initialPosition) {
        this.currentPosition = initialPosition;
    }

    damages(cells) {
        cells.forEach((cell) => cell.damagedBy(this));
    }

    damage(victim) {
        victim.damagedByExplosion();
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

        it("leaves a boom next to a brick, the boom explotes and the bricks disappears", () => {
            
            //SetUp
            var bomberCell = new Cell();
            var bomber = new Bomber(bomberCell);
            var brick = new Brick();
            var cellWithBrick = new Cell(brick);

            var bomb = bomber.dropBomb();
            var explosion = bomb.tick();

            //Run Test
            explosion.damages([bomberCell, cellWithBrick]);
            chai.assert.equal(brick.isDestroyed(), true);

        });

        it("throws a boom to a brick, the boom explotes and the bricks disappears", () => {
            //SetUp
            var bomberCell = new Cell();
            var bomber = new Bomber(bomberCell);
            var brick = new Brick();
            var destination = new Cell(brick);

            var trayectory = bomber.throwBomb(destination);
            var explosion = trayectory.runCourse();

            //Run Test
            explosion.damages([bomberCell, destination]);
            chai.assert.equal(brick.isDestroyed(), true);
        });
    });

});



