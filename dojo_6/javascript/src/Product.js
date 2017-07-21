var Product = class Product {

    constructor(cost){
        this._cost = cost;
    }

    cost() {
        return this._cost;
    }

    substractCostFrom(sellingPrice) {
        return new Number(sellingPrice.price() - this._cost.cost());
    }
};

module.exports = Product;