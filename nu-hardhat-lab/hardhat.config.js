const fs = require('fs');

//inject dep for testing
require('@nomiclabs/hardhat-waffle');


// npx mnemonics > .rsk-testnet-seed-phrase
const rskTestnetSeedPhrase = fs
  .readFileSync('.rsk-testnet-seed-phrase')
  .toString()
  .trim();

if (!rskTestnetSeedPhrase || rskTestnetSeedPhrase.split(' ').length != 12) {
  throw new Error("seed phrase is not valid (bip-39)")
}

/*

curl \
-X POST \
--silent \
-H "Content-Type:application/json" \
--data '{"jsonrpc":"2.0", "method":"eth_getBlockByNumber", "params":["latest", false], "id":1}' \
"https://public-node.testnet.rsk.co/"
> .rsk-gas-response.json
*/

const rskTestnetResponse = fs
  .readFileSync('.rsk-gas-response.json')
  .toString()
  .trim();

const minimumGasPrice = parseInt(
  JSON.parse(rskTestnetResponse).result.minimumGasPrice,
  16
);

if (typeof minimumGasPrice !== 'number' || isNaN(minimumGasPrice)) {
  throw new Error("min gas not available");
}
console.log("minimum gas price on rsk testnet: ", minimumGasPrice);

const gasMultiplier = 1.1;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.13",
  networks: {
    hardhat: {},
    rskregtest: {
      url: 'http://localhost:4444'
    },
    rsktestnet: {
      chainId: 31,
      url: "https://public-node.testnet.rsk.co/",
      gasPrice: minimumGasPrice,
      gasPriceMultiplier: gasMultiplier,
      accounts: {
        mnemonic: rskTestnetSeedPhrase,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,

      }

    }
  },
  mocha: {
    timeout: 60000,
  },
};

// conect to testnet:

//npx hardhat console --network rsktestnet

// sample call:
// (await require('hardhat').network.provider.send('eth_getBlockByNumber', ['latest', false])).minimumGasPrice
