const { ethers } = require("hardhat");

async function main() {
  const VerifikasiIjazah = await ethers.getContractFactory("VerifikasiIjazah");
  const contract = await VerifikasiIjazah.deploy();

  // Tunggu kontrak selesai deploy
  await contract.waitForDeployment();

  // Ambil alamat kontrak
  console.log("Contract deployed at:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
