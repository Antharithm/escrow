import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Escrow", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployEscrowContract() {
    const [owner, arbiter, beneficiary] = await hre.ethers.getSigners();

    const Escrow = await hre.ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(arbiter.address, beneficiary.address);
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
      console.log("Owner / Depositor: ", owner.address);
      console.log("Arbiter: ", arbiter.address);
      console.log("Beneficiary: ", beneficiary.address);
    });

    it("Should return an inital balance of zero ETH", async function () {
      const { escrow } = await loadFixture(deployEscrowContract);
      const balance = await hre.ethers.provider.getBalance(escrow);
      expect(balance).to.equal(hre.ethers.parseEther("0"));
      console.log("Inital Balance: ", hre.ethers.formatEther(balance));
    });
  });
  describe("Deposits", function () {
    it("Should deposit ETH", async function () {
      const { escrow, owner } = await loadFixture(deployEscrowContract);
      const depositAmount = hre.ethers.parseEther("1");
      await escrow.connect(owner).deposit({ value: depositAmount });
      const balance = await hre.ethers.provider.getBalance(escrow);
      expect(balance).to.equal(depositAmount);
      console.log("Deposited Amount: ", hre.ethers.formatEther(balance));
    });
  });
  describe("Withdrawals", function () {
    it("Should withdraw ETH", async function () {
      const { escrow, owner, arbiter, beneficiary } = await loadFixture(
        deployEscrowContract
      );
      const depositAmount = hre.ethers.parseEther("1");
      await escrow.connect(owner).deposit({ value: depositAmount });
      console.log("Deposited Amount: ", hre.ethers.formatEther(depositAmount));
      await escrow.connect(arbiter).approve();
      console.log("Arbiter Approved release of funds.");
      console.log("Withdrawing...");
      const balance = await hre.ethers.provider.getBalance(escrow);
      expect(balance).to.equal(hre.ethers.parseEther("0"));
      console.log("Withdraw Complete.");
      console.log("Remaining Balance: ", hre.ethers.formatEther(balance));
    });
  });
});
