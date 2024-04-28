import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Escrow", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployEscrowContract() {
    const [owner, arbiter, beneficiary] = await hre.ethers.getSigners();

    const Escrow = await hre.ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(arbiter.address, beneficiary.address, {
      value: hre.ethers.parseEther("1"),
    });
    return { escrow, owner, arbiter, beneficiary };
  }

  describe("Deployment", function () {});

  describe("Withdrawals", function () {});
});
