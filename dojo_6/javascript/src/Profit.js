var Profit = class Profit {

    constructor(aValue){
        this.aValue = aValue;
    }

    isEquals(profit) {
    	return this.aValue.isEquals(profit.aValue);
    }

};

module.exports = Profit;