const chai = require('chai');
var Product = require('../src/Product');
var Cost = require('../src/Cost');
var UnitSale = require('../src/UnitSale');
var SellingPrice = require('../src/SellingPrice');

describe("checkout", () => {
    describe("dummy", function() {
        it("dummy", () => {
        	var product = new Product(new Cost(10));
        	console.log(product.cost());
        	var sale = new UnitSale(product, new SellingPrice(20));
        	console.log(sale);
        	var profit = sale.profit();

        	chai.assert.equal(profit, 10);
        });
    });
});
