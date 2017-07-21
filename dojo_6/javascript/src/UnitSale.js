const Profit = require('./Profit');

var UnitSale = class UnitSale {

    constructor(product, sellingPrice){
        this.product = product;
        this.sellingPrice = sellingPrice;
    }


    profit() {
    	return new Profit(this.product.substractCostFrom(this.sellingPrice));
    }
};

module.exports = UnitSale;