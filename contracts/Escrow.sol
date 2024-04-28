// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Escrow
/// @notice This contract simulates an escrow agreement between two parties
/// @notice depositor deposit assets, beneficiary complete a service, arbiter releases deposits to beneficiary
/// @custom:experimental This is an experimental contract.

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
    event Approved(uint);

    function approve() external {
        if (msg.sender != arbiter) revert Unauthorized();

        uint balance = address(this).balance;

        (bool success, ) = beneficiary.call{value: address(this).balance}("");
        require(success);

        emit Approved(balance);
    }
}
