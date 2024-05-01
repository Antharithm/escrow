// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Escrow
/// @notice This contract simulates an escrow agreement between two parties
/// @notice depositor deposit assets, beneficiary complete a service, arbiter releases deposits to beneficiary
/// @custom:experimental This is an experimental contract.

// 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
// 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db

contract Escrow {
    address public depositor;
    address public beneficiary;
    address public arbiter;

    constructor(address _arbiter, address _beneficiary) payable {
        depositor = msg.sender;
        arbiter = _arbiter;
        beneficiary = _beneficiary;
    }

    error Unauthorized();
    error NoEthSent();
    event Approved(uint amount);
    event Deposited(uint amount);

    function deposit() external payable {
        if (msg.sender != depositor) revert Unauthorized();
        if (msg.value == 0) revert NoEthSent();

        emit Deposited(msg.value);
    }

    function approve() external {
        if (msg.sender != arbiter) revert Unauthorized();

        uint balance = address(this).balance;
        (bool success, ) = beneficiary.call{value: balance}("");
        require(success, "Transfer failed");

        emit Approved(balance);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
