const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")
const { Wallet } = require("ethers")
const { ethers } = require("hardhat")
require("dotenv").config()

describe("FlashLoanArbitrage", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.

    async function deployFlashandDex() {
        // Contracts are deployed using the first signer/account by default
        const [owner] = await ethers.getSigners()
        const realAccount = await Wallet(process.env.PRIVATE_KEY)
        const DEX = await ethers.getContractFactory("Dex")
        const dex = await DEX.deploy()
        const FlashLoanArbitrage = await ethers.getContractFactory("FlashLoanArbitrage")
        const flashLoanArbitrage = await FlashLoanArbitrage.deploy(dex.address)
        await flashLoanArbitrage.deployed()
        return { owner, dex, flashLoanArbitrage }
    }

    describe("Request and carry trade", function () {
        it("Take loan, buy and sell", async function () {
            const { owner, dex, flashLoanArbitrage } = await loadFixture(deployFlashandDex)
            const tx = await flashLoanArbitrage.requestFlashLoan(
                "0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43",
                1000000000
            )
            await tx.wait()
        })
    })
})
