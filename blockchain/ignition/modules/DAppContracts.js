// This setup uses Hardhat Ignition to manage smart contract deployments.
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("DAppContractsModule", (m) => {
  // Deploy DApp Token
  const dappToken = m.contract("DAppToken", []);

  // Deploy DApp NFT
  const dappNFT = m.contract("DAppNFT", []);

  // Deploy Voting Contract
  const votingContract = m.contract("VotingContract", []);

  return { 
    dappToken,
    dappNFT,
    votingContract
  };
});
