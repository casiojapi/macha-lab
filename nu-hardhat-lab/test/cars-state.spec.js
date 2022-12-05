const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deployContract(contractName, ...params) {
    const contractFactory = await ethers.getContractFactory(contractName);
    const smartContract = await contractFactory.deploy(...params);
    await smartContract.deployed();
    return smartContract;
}

describe('Cars - state machine', () => {
    let account;
    let superHonk;
    let cars;

    before(async () => {
        accounts = await ethers.getSigners();
        superHonk = await deployContract('SuperHonk');
        cars = await deployContract('Cars', superHonk.address);
    });

    it('should add a new car', async () => {
        const returnVal = 
            await cars
                .connect(accounts[1])
                .callStatic
                .addCar(
                    '0xff00ff', //color
                    4, // doors
                    {
                        value: ethers.utils.parseEther("1.1"), // 1.1 RBTC
                    },
                );
        expect(returnVal).to.equal(1);  
    });
});