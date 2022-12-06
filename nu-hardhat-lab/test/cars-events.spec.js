const { expect } = require('chai');
const { ethers } = require('hardhat');

const { deployContract } = require('./test-utils/test-utils.js');

describe('Cars - events', () => {
    let account;
    let superHonk;
    let cars;

    before(async () => {
        accounts = await ethers.getSigners();
        superHonk = await deployContract('SuperHonk');
        cars = await deployContract('Cars', superHonk.address);

        await cars
            .connect(accounts[1])
            .functions
            .addCar(
                '0xff00ff', //color
                4, // doors
                {
                    value: ethers.utils.parseEther("1.1"), // 1.1 RBTC
                },
            );
    });

    it('should honk', async () => {
        const txToSend = cars   
            .connect(accounts[1])
            .functions
            .honk(
                1, // card id
                false, // is loud
            );
            await expect(txToSend)
                .to.emit(cars, 'CarHonk')
                .withArgs(1)
    });

    it('should superhonk', async () => {
        //
    });
});