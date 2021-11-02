var blockstudio = artifacts.require("../contracts/blockstudio.sol");

module.exports = function(deployer) {
  deployer.deploy(blockstudio);
};