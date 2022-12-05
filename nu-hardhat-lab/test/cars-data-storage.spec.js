const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deployContract(contractName, ...params) {
    const contractFactory = await ethers.getContractFactory(contractName);
    const smartContract = await contractFactory.deploy(...params);
    await smartContract.deployed();
    return smartContract;
}

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
        // TODO
    });
});