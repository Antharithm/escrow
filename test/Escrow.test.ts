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

  describe("Deployment", function () {
    it("Should set the depositor, arbiter and beneficiary", async function () {
      const { escrow, owner, arbiter, beneficiary } = await loadFixture(
        deployEscrowContract
      );

      expect(await escrow.depositor()).to.equal(owner.address);
      expect(await escrow.arbiter()).to.equal(arbiter.address);
      expect(await escrow.beneficiary()).to.equal(beneficiary.address);
      console.log("Owner / Depositor Address: ", owner.address);
      console.log("Arbiter Address: ", arbiter.address);
      console.log("Beneficiary Address: ", beneficiary.address);
    });

    it("Should receive and store the funds sent on deployment", async function () {
      const { escrow } = await loadFixture(deployEscrowContract);
      const balance = await hre.ethers.provider.getBalance(escrow);
      expect(balance).to.equal(hre.ethers.parseEther("1"));
      console.log("Received Balance: ", hre.ethers.formatEther(balance));
    });
  });
});
