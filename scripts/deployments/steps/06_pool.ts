import {ZERO_ADDRESS} from "../../../helpers/constants";
import {
  deployLoanVault,
  deployMockETHNFTOracle,
  deployPoolComponents,
} from "../../../helpers/contracts-deployments";
import {
  getPoolProxy,
  getPoolAddressesProvider,
  getAutoCompoundApe,
  getAllTokens,
  getUniswapV3SwapRouter,
  getFirstSigner,
} from "../../../helpers/contracts-getters";
import {
  getContractAddressInDb,
  getFunctionSignatures,
  registerContractInDb,
  withSaveAndVerify,
} from "../../../helpers/contracts-helpers";
import {GLOBAL_OVERRIDES} from "../../../helpers/hardhat-constants";
import {waitForTx} from "../../../helpers/misc-utils";
import {eContractid, ERC20TokenContractId} from "../../../helpers/types";
import {
  PoolInstantWithdraw,
  PoolInstantWithdraw__factory,
} from "../../../types";

export const step_06 = async (verify = false) => {
  const addressesProvider = await getPoolAddressesProvider();

  try {
    const {
      poolCore,
      poolParameters,
      poolMarketplace,
      poolApeStaking,
      poolCoreSelectors,
      poolParaProxyInterfaces,
      poolParametersSelectors,
      poolMarketplaceSelectors,
      poolApeStakingSelectors,
      poolInstantWithdrawSelectors,
      poolParaProxyInterfacesSelectors,
    } = await deployPoolComponents(addressesProvider.address, verify);

    await waitForTx(
      await addressesProvider.updatePoolImpl(
        [
          {
            implAddress: poolParameters.address,
            action: 0,
            functionSelectors: poolParametersSelectors,
          },
        ],
        ZERO_ADDRESS,
        "0x",
        GLOBAL_OVERRIDES
      )
    );

    await waitForTx(
      await addressesProvider.updatePoolImpl(
        [
          {
            implAddress: poolMarketplace.address,
            action: 0,
            functionSelectors: poolMarketplaceSelectors,
          },
        ],
        ZERO_ADDRESS,
        "0x",
        GLOBAL_OVERRIDES
      )
    );

    if (poolApeStaking) {
      await waitForTx(
        await addressesProvider.updatePoolImpl(
          [
            {
              implAddress: poolApeStaking.address,
              action: 0,
              functionSelectors: poolApeStakingSelectors,
            },
          ],
          ZERO_ADDRESS,
          "0x",
          GLOBAL_OVERRIDES
        )
      );
    }

    const poolAddress = await addressesProvider.getPool();

    await waitForTx(
      await addressesProvider.updatePoolImpl(
        [
          {
            implAddress: poolCore.address,
            action: 0,
            functionSelectors: poolCoreSelectors,
          },
        ],
        poolAddress,
        poolCore.interface.encodeFunctionData("initialize", [
          addressesProvider.address,
        ]),
        GLOBAL_OVERRIDES
      )
    );

    await waitForTx(
      await addressesProvider.updatePoolImpl(
        [
          {
            implAddress: poolParaProxyInterfaces.address,
            action: 0,
            functionSelectors: poolParaProxyInterfacesSelectors,
          },
        ],
        ZERO_ADDRESS,
        "0x",
        GLOBAL_OVERRIDES
      )
    );

    const loanVaultAddress =
      (await getContractAddressInDb(eContractid.LoanVault)) ||
      (await deployLoanVault(poolAddress, verify)).address;
    const nFTOracleAddress =
      (await getContractAddressInDb(eContractid.MockETHNFTOracle)) ||
      (await deployMockETHNFTOracle(verify)).address;
    // create PoolETHWithdraw here instead of in deployPoolComponents since LoanVault have a dependency for Pool address
    const poolInstantWithdraw = (await withSaveAndVerify(
      new PoolInstantWithdraw__factory(await getFirstSigner()),
      eContractid.PoolETHWithdrawImpl,
      [addressesProvider.address, loanVaultAddress, nFTOracleAddress],
      verify,
      false,
      undefined,
      getFunctionSignatures(PoolInstantWithdraw__factory.abi)
    )) as PoolInstantWithdraw;

    await waitForTx(
      await addressesProvider.updatePoolImpl(
        [
          {
            implAddress: poolInstantWithdraw.address,
            action: 0,
            functionSelectors: poolInstantWithdrawSelectors,
          },
        ],
        ZERO_ADDRESS,
        "0x",
        GLOBAL_OVERRIDES
      )
    );

    const poolProxy = await getPoolProxy(poolAddress);
    const cAPE = await getAutoCompoundApe();
    const uniswapV3Router = await getUniswapV3SwapRouter();
    const allTokens = await getAllTokens();

    if (allTokens[ERC20TokenContractId.APE]) {
      await waitForTx(
        await poolProxy.unlimitedApproveTo(
          allTokens[ERC20TokenContractId.APE].address,
          uniswapV3Router.address
        )
      );
      await waitForTx(
        await poolProxy.unlimitedApproveTo(
          allTokens[ERC20TokenContractId.APE].address,
          cAPE.address
        )
      );
    }

    await registerContractInDb(eContractid.PoolProxy, poolProxy, [
      addressesProvider.address,
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
