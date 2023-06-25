require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("hardhat-gas-reporter")

const ALCHEMY_API_KEY_GOERLI = process.env.ALCHEMY_API_KEY_GOERLI
const ALCHEMY_API_KEY_SEPOLIA = process.env.ALCHEMY_API_KEY_SEPOLIA
const ALCHEMY_API_KEY_MAINNET = process.env.ALCHEMY_API_KEY_MAINNET
const ALCHEMY_API_KEY_MUMBAI = process.env.ALCHEMY_API_KEY_MUMBAI
const ALCHEMY_API_KEY_POLYGON = process.env.ALCHEMY_API_KEY_POLYGON
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.4.17",
            },
            {
                version: "0.8.18",
                settings: {},
            },
            {
                version: "0.8.10",
                settings: {},
            },
        ],
        //version: "0.8.18",
        settings: {
            optimizer: {
                enabled: true,
                runs: 100,
            },
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY, //for ethereum test and mainnet use ETHERSCAN_API_KEY,
    },
    networks: {
        hardhat: {
            blockGasLimit: 5000000, // Network block gasLimit
        },
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY_GOERLI}`,
            accounts: [PRIVATE_KEY],
            blockGasLimit: 10000000,
        },
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY_SEPOLIA}`,
            accounts: [PRIVATE_KEY],
        },
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY_MUMBAI}`,
            accounts: [PRIVATE_KEY],
        },
        polygon: {
            url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_POLYGON}`,
            accounts: [PRIVATE_KEY],
        },
        mainnet: {
            url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_MAINNET}`,
            accounts: [PRIVATE_KEY],
            blockGasLimit: 30000000,
        },
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
}
