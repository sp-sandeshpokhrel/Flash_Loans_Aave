// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Dex {
    address payable public owner;

    // Aave ERC20 Token addresses on Goerli network
    address private immutable daiAddress = 0x68194a729C2450ad26072b3D33ADaCbcef39D574;
    address private immutable usdcAddress = 0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f;

    IERC20 private dai;
    IERC20 private usdc;

    // exchange rate indexes
    uint256 dexARate = 90;
    uint256 dexBRate = 100;

    // keep track of individual dai balances
    mapping(address => uint256) public daiBalances;

    // keep track of individual USDC balances
    mapping(address => uint256) public usdcBalances;

    constructor() {
        owner = payable(msg.sender);
        dai = IERC20(daiAddress);
        usdc = IERC20(usdcAddress);
    }

    function depositUSDC(uint256 _amount) external {
        usdcBalances[msg.sender] += _amount;
        uint256 allowance = dai.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Check the token allowance");
        usdc.transferFrom(msg.sender, address(this), _amount);
    }

    function depositDAI(uint256 _amount) external {
        daiBalances[msg.sender] += _amount;
        uint256 allowance = dai.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Check the token allowance");
        dai.transferFrom(msg.sender, address(this), _amount);
    }

    function buyDAI() external {
        uint256 daiToReceive = ((usdcBalances[msg.sender] / dexARate) * 100) * (10 ** 12);
        dai.transfer(msg.sender, daiToReceive);
    }

    function sellDAI() external {
        uint256 usdcToReceive = ((daiBalances[msg.sender] * dexBRate) / 100) / (10 ** 12);
        dai.transfer(msg.sender, usdcToReceive);
    }
}
