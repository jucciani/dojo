var Cow = class Cow {

    constructor(amount){
        this.amount = amount;
    }

    isEquals(profit) {
    	return this.amount === profit.amount;
    }

};

module.exports = Cow;