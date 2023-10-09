// This script deals with deploying the RoundImplementation on a given network
import { ethers } from "hardhat";
import hre from "hardhat";
import { confirmContinue, getBlocksToWait } from "../../utils/script-utils";
import * as utils from "../utils";

utils.assertEnvironment();

export async function main() {
  await confirmContinue({
    contract: "RoundImplementation",
    network: hre.network.name,
    chainId: hre.network.config.chainId,
  });

  // Deploy RoundImplementation
  const contractFactory = await ethers.getContractFactory(
    "RoundImplementation"
  );
  const contract = await contractFactory.deploy();

  console.log(`Deploying RoundImplementation to ${contract.address}`);
  await contract.deployTransaction.wait(getBlocksToWait(hre.network.name));
  console.log("✅ Deployed");

  return contract.address;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
