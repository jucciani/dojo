const chai = require('chai');
const Product = require('../src/Product');
const Profit = require('../src/Profit');
const Cost = require('../src/Cost');
const UnitSale = require('../src/UnitSale');
const Cow = require('../src/Cow');
const SellingPrice = require('../src/SellingPrice');

describe("checkout", () => {
    describe("dummy", function() {
        it("calculate profit of an item", () => {
        	var product = new Product(new Cost(10));
        	var sale = new UnitSale(product, new SellingPrice(20));
        	var profit = sale.profit();

        	chai.assert.isTrue(profit.isEquals(new Profit(10)));
        });

        it("calculate profit of an item", () => {
        	var product = new Product(new Cost(10));
        	var cow = new Cow();

        	var sale = new UnitSale(product, new SellingPrice(cow));
        	var profit = sale.profit();

        	chai.assert.equals(profit.isEquals(new Profit(cow)));
        });
    });
});
