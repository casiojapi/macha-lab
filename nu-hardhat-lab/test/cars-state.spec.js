const { expect } = require('chai');
const { ethers } = require('hardhat');

const { deployContract } = require('./test-utils/test-utils.js');


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
        // static call
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
        
        // simulate state trans (tx)
        const tx = 
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
        const numCars = await cars.callStatic.numCars();
        const car1 = await cars.callStatic.cars(1);
        //console.log(car1);

        expect(numCars).to.equal(1);
        expect(car1.colour).to.equal('0xff00ff');
        expect(car1.doors).to.equal(4);
        expect(car1.status).to.equal(1);

        expect(car1.owner).to.equal(accounts[1].address);

    });
});