// This script deals with deploying the QuadraticFundingVotingStrategyFactory on a given network
import { ethers, upgrades } from "hardhat";
import hre from "hardhat";
import { confirmContinue, getBlocksToWait } from "../../../utils/script-utils";
import * as utils from "../../utils";

utils.assertEnvironment();

export async function main() {
  await confirmContinue({
    contract: "QuadraticFundingVotingStrategyFactory",
    network: hre.network.name,
    chainId: hre.network.config.chainId,
  });

  // Deploy QuadraticFundingVotingStrategyFactory
  const contractFactory = await ethers.getContractFactory(
    "QuadraticFundingVotingStrategyFactory"
  );
  const contract = await upgrades.deployProxy(contractFactory);
  const address = await contract.getAddress();

  console.log(
    `Deploying Upgradable QuadraticFundingVotingStrategyFactory to ${address}`
  );

  const resp = contract.deploymentTransaction();
  await resp.wait(getBlocksToWait(hre.network.name));
  console.log("✅ Deployed.");

  return address;
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
