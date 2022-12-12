const { expect } = require('chai');
const { ethers } = require('hardhat');

const { deployContract } = require('./test-utils/test-utils.js');

describe('Cars - data sotrage', () => {
    let account;
    let superHonk;
    let cars;

    before(async () => {
        accounts = await ethers.getSigners();
        superHonk = await deployContract('SuperHonk');
        cars = await deployContract('Cars', superHonk.address);
    });

    it('should init with zero cars', async () => {
        const initialCars = await cars.callStatic.numCars();

        expect(initialCars).to.equal(0);
    });
});