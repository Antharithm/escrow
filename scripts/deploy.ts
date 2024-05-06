import { ethers } from "hardhat";

async function main() {
  const [deployer, arbiter, beneficiary] = await ethers.getSigners();
  console.log("Deployer address: ", deployer.address);
  console.log("Arbiter address: ", arbiter.address);
  console.log("Beneficiary address: ", beneficiary.address);

  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(arbiter.address, beneficiary.address, {
    value: ethers.parseEther("1"),
  });
  console.log("Escrow contract address: ", escrow.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
