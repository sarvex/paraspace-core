import {getParaSpaceConfig, waitForTx} from "../../helpers/misc-utils";
import {
  deployGenericMoonbirdNTokenImpl,
  deployGenericNTokenImpl,
  deployNTokenBAKCImpl,
  deployNTokenBAYCImpl,
  deployNTokenMAYCImpl,
  deployUniswapV3NTokenImpl,
} from "../../helpers/contracts-deployments";
import {
  getPoolAddressesProvider,
  getPoolConfiguratorProxy,
  getProtocolDataProvider,
  getNToken,
  getApeCoinStaking,
  getPoolProxy,
  getDelegationRegistry,
} from "../../helpers/contracts-getters";
import {NTokenContractId, XTokenType} from "../../helpers/types";

import dotenv from "dotenv";
import {DRY_RUN, GLOBAL_OVERRIDES} from "../../helpers/hardhat-constants";
import {dryRunEncodedData} from "../../helpers/contracts-helpers";
import {ZERO_ADDRESS} from "../../helpers/constants";

dotenv.config();

export const upgradeNToken = async (verify = false) => {
  const addressesProvider = await getPoolAddressesProvider();
  const paraSpaceConfig = getParaSpaceConfig();
  const poolAddress = await addressesProvider.getPool();
  const poolConfiguratorProxy = await getPoolConfiguratorProxy(
    await addressesProvider.getPoolConfigurator()
  );
  const protocolDataProvider = await getProtocolDataProvider();
  const allXTokens = await protocolDataProvider.getAllXTokens();
  const delegationRegistryAddress = ZERO_ADDRESS;
  let nTokenImplementationAddress = "";
  let nTokenBAYCImplementationAddress = "";
  let nTokenMAYCImplementationAddress = "";
  let nTokenBAKCImplementationAddress = "";
  let nTokenMoonBirdImplementationAddress = "";
  let nTokenUniSwapV3ImplementationAddress = "";
  let newImpl = "";

  for (let i = 0; i < allXTokens.length; i++) {
    const token = allXTokens[i];
    const nToken = await getNToken(token.tokenAddress);
    const pool = await getPoolProxy();
    const asset = await nToken.UNDERLYING_ASSET_ADDRESS();
    const incentivesController = paraSpaceConfig.IncentivesController;
    const name = await nToken.name();
    const symbol = await nToken.symbol();
    const xTokenType = await nToken.getXTokenType();

    if (![XTokenType.NTokenBAYC].includes(xTokenType)) {
      continue;
    }

    if (xTokenType == XTokenType.NTokenBAYC) {
      if (!nTokenBAYCImplementationAddress) {
        console.log("deploy NTokenBAYC implementation");
        const apeCoinStaking = await getApeCoinStaking();
        nTokenBAYCImplementationAddress = (
          await deployNTokenBAYCImpl(
            apeCoinStaking.address,
            poolAddress,
            delegationRegistryAddress,
            verify
          )
        ).address;
      }
      newImpl = nTokenBAYCImplementationAddress;
    } else if (xTokenType == XTokenType.NTokenMAYC) {
      if (!nTokenMAYCImplementationAddress) {
        console.log("deploy NTokenMAYC implementation");
        const apeCoinStaking = await getApeCoinStaking();
        nTokenMAYCImplementationAddress = (
          await deployNTokenMAYCImpl(
            apeCoinStaking.address,
            poolAddress,
            delegationRegistryAddress,
            verify
          )
        ).address;
      }
      newImpl = nTokenMAYCImplementationAddress;
    } else if (xTokenType == XTokenType.NTokenBAKC) {
      if (!nTokenBAKCImplementationAddress) {
        console.log("deploy NTokenBAKC implementation");
        const apeCoinStaking = await getApeCoinStaking();
        const nBAYC =
          // eslint-disable-next-line
          allXTokens.find(
            (x) => x.symbol == NTokenContractId.nBAYC
          )!.tokenAddress;
        const nMAYC =
          // eslint-disable-next-line
          allXTokens.find(
            (x) => x.symbol == NTokenContractId.nMAYC
          )!.tokenAddress;
        nTokenBAKCImplementationAddress = (
          await deployNTokenBAKCImpl(
            pool.address,
            apeCoinStaking.address,
            nBAYC,
            nMAYC,
            delegationRegistryAddress,
            verify
          )
        ).address;
      }
      newImpl = nTokenBAKCImplementationAddress;
    } else if (xTokenType == XTokenType.NTokenUniswapV3) {
      if (!nTokenUniSwapV3ImplementationAddress) {
        console.log("deploy NTokenUniswapV3 implementation");
        nTokenUniSwapV3ImplementationAddress = (
          await deployUniswapV3NTokenImpl(
            poolAddress,
            delegationRegistryAddress,
            verify
          )
        ).address;
      }
      newImpl = nTokenUniSwapV3ImplementationAddress;
    } else if (xTokenType == XTokenType.NTokenMoonBirds) {
      if (!nTokenMoonBirdImplementationAddress) {
        console.log("deploy NTokenMoonBirds implementation");
        nTokenMoonBirdImplementationAddress = (
          await deployGenericMoonbirdNTokenImpl(
            poolAddress,
            delegationRegistryAddress,
            verify
          )
        ).address;
      }
      newImpl = nTokenMoonBirdImplementationAddress;
    } else if (xTokenType == XTokenType.NToken) {
      if (!nTokenImplementationAddress) {
        console.log("deploy NToken implementation");
        nTokenImplementationAddress = (
          await deployGenericNTokenImpl(
            poolAddress,
            false,
            delegationRegistryAddress,
            verify
          )
        ).address;
      }
      newImpl = nTokenImplementationAddress;
    } else {
      continue;
    }

    const oldRevision = (await nToken.NTOKEN_REVISION()).toNumber();
    const newRevision = (
      await (await getNToken(newImpl)).NTOKEN_REVISION()
    ).toNumber();

    if (oldRevision == newRevision) {
      continue;
    }

    console.log(
      `upgrading ${token.symbol}'s version from v${oldRevision} to v${newRevision}`
    );
    const updateInput = {
      asset: asset,
      incentivesController: incentivesController,
      name: name,
      symbol: symbol,
      implementation: newImpl,
      params: "0x10",
    };
    if (DRY_RUN) {
      const encodedData = poolConfiguratorProxy.interface.encodeFunctionData(
        "updateNToken",
        [updateInput]
      );
      await dryRunEncodedData(poolConfiguratorProxy.address, encodedData);
    } else {
      await waitForTx(
        await poolConfiguratorProxy.updateNToken(updateInput, GLOBAL_OVERRIDES)
      );
    }
  }

  console.log("upgraded all ntoken implementation.\n");
};
