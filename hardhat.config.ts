import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const ETHEREUM_SEPOLIA_RPC = process.env.ETHEREUM_SEPOLIA_RPC;
const BASE_SEPOLIA_RPC = process.env.BASE_SEPOLIA_RPC;

const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || "Your etherscan API key";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    base_sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${BASE_SEPOLIA_RPC}`,
    },
    ethereum_sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ETHEREUM_SEPOLIA_RPC}`,
    },
    hardhat: {
      // forking: {
      //   url: "https://eth-mainnet.alchemyapi.io/v2/${}your-api-key",
      //   blockNumber: 12345678,
      // },
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
  },
};

export default config;
