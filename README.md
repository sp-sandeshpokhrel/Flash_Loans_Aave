# Hardhat Flash Loan Project

This project explores the flash loan feature of the Aave protocol by implementing two contracts: `Dex` and `FlashLoanArbitrage`. The project is built using Hardhat and is intended for use on the Sepolia testnet.

## Contracts

### Dex

`Dex` is a mock contract simulating a decentralized exchange. It allows users to deposit tokens, trade between DAI and USDC, and generate profits through arbitrage.

### FlashLoanArbitrage

`FlashLoanArbitrage` contains the necessary functions to carry out flash loans. It utilizes the Aave protocol to borrow tokens without collateral, perform arbitrage operations, and repay the loan along with a fee, all within a single transaction.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
    ```shell
    git clone https://github.com/your-username/hardhat-flashloan-project.git
    cd hardhat-flashloan-project
    ```
2. Install dependencies:
    ```shell
    npm install
    ```
3. Deploy the contracts to the Sepolia testnet:
    ```shell
    npx hardhat run scripts/deployDex.js --network sepolia
    npx hardhat run scripts/deployFlashLoanArbitrage
    ```
4. Usage
   Call the requestFlashLoan function on the FlashLoanArbitrage contract to execute a flash loan.

## Flash Loan

Flash loans allow us to borrow tokens without collateral, as long as we repay the loan and a small fee in the same transaction.

### Common Use Cases of Flash Loans

1. Refinancing existing loans at lower rates
2. Performing arbitrage

### Arbitrage

Arbitrage is an investment strategy where we exploit price differences between exchanges. We buy a token at a lower price on one exchange and sell it at a higher price on another exchange to make a profit.

With flash loans, we can borrow funds without collateral to execute arbitrage opportunities. We buy and sell tokens on different exchanges, repay the loan, and generate a nice profit. If we can't repay the loan, the entire transaction gets reverted, eliminating the risk of losing money.

### Aave V3 Protocol

To leverage flash loans in the Aave V3 protocol:

1. Invoke the `flashLoan` function in the Aave pool contract, specifying the token and loan amount.
2. Call the `approve` function on the borrowed ERC20 token to allow Aave to withdraw the funds.

## Implementing

### Deposit Funds

Ensure you are using version 0.8.10, as many Aave contracts use this version. Follow these steps:

1. Inherit from `FlashLoanSimpleReceiverBase`, a base contract that implements the required interface to receive flash loans.
2. Set the constructor to accept the `addressProvider` and invoke the constructor of `FlashLoanSimpleReceiverBase`. Instantiate an instance of the IPOOL address provider interface.
3. Write the `executeOperation()` function, which receives the borrowed funds. Add any necessary custom logic within this function.
