const { expect } = require("chai");
const { describe, it } = require("mocha");
const calculateNumber = require("./2-calcul_chai");

describe("calculateNumber", () => {
    describe("SUM", () => {
        it("should return the sum of rounded numbers", () => {
            expect(calculateNumber("SUM", 1, 2)).to.equal(3);
        });

        it("should return the sum of rounded numbers when decimals are involved", () => {
            expect(calculateNumber("SUM", 1.6, 2.6)).to.equal(5);
        });
    });

    describe("SUBTRACT", () => {
        it("should return the difference of rounded numbers", () => {
            expect(calculateNumber("SUBTRACT", 1.4, 2.3)).to.equal(-1);
        });

        it("should return the difference of rounded numbers when decimals are involved", () => {
            expect(calculateNumber("SUBTRACT", 4.9, 2.7)).to.equal(2);
        });

        it("should handle negative numbers correctly", () => {
            expect(calculateNumber("SUBTRACT", -4.9, -2.7)).to.equal(-2);
        });
    });

    describe("DIVIDE", () => {
        it("should return the quotient of rounded numbers", () => {
            expect(calculateNumber("DIVIDE", 4, 2)).to.equal(2);
        });

        it("should handle division of rounded decimals correctly", () => {
            expect(calculateNumber("DIVIDE", 4.6, 1.8)).to.equal(2.5);
        });

        it("should return 'Error' when dividing by zero", () => {
            expect(calculateNumber("DIVIDE", 4, 0)).to.equal("Error");
        });
    });
});

