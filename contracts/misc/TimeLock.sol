// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IERC20} from "../dependencies/openzeppelin/contracts/IERC20.sol";
import {IERC721} from "../dependencies/openzeppelin/contracts/IERC721.sol";
import {IERC1155} from "../dependencies/openzeppelin/contracts/IERC1155.sol";
import {IERC721Receiver} from "../dependencies/openzeppelin/contracts/IERC721Receiver.sol";

import "../dependencies/openzeppelin/upgradeability/ReentrancyGuardUpgradeable.sol";
import {EnumerableSet} from "../dependencies/openzeppelin/contracts/EnumerableSet.sol";
import {ITimeLock} from "../interfaces/ITimeLock.sol";
import {IMoonBird} from "../dependencies/erc721-collections/IMoonBird.sol";
import {IPoolAddressesProvider} from "../interfaces/IPoolAddressesProvider.sol";
import {IPool} from "../interfaces/IPool.sol";
import {DataTypes} from "../protocol/libraries/types/DataTypes.sol";
import {GPv2SafeERC20} from "../dependencies/gnosis/contracts/GPv2SafeERC20.sol";
import {Errors} from "./../protocol/libraries/helpers/Errors.sol";
import {IACLManager} from "../interfaces/IACLManager.sol";

contract TimeLock is ITimeLock, ReentrancyGuardUpgradeable, IERC721Receiver {
    using GPv2SafeERC20 for IERC20;

    event AgreementCreated(
        uint256 agreementId,
        DataTypes.AssetType assetType,
        DataTypes.TimeLockActionType actionType,
        address indexed asset,
        uint256[] tokenIdsOrAmounts,
        address indexed beneficiary,
        uint48 releaseTime
    );

    event AgreementClaimed(
        uint256 agreementId,
        DataTypes.AssetType assetType,
        DataTypes.TimeLockActionType actionType,
        address indexed asset,
        uint256[] tokenIdsOrAmounts,
        address indexed beneficiary
    );

    event AgreementFrozen(uint256 agreementId, bool value);

    event TimeLockFrozen(bool value);

    mapping(uint256 => Agreement) private agreements;

    uint248 public agreementCount;
    bool public frozen;

    IPool private immutable POOL;
    IACLManager private immutable ACL_MANAGER;

    modifier onlyXToken(address asset) {
        require(
            msg.sender == POOL.getReserveXToken(asset),
            Errors.CALLER_NOT_XTOKEN
        );
        _;
    }

    constructor(IPoolAddressesProvider provider) {
        POOL = IPool(provider.getPool());
        ACL_MANAGER = IACLManager(provider.getACLManager());
    }

    function initialize() public initializer {
        __ReentrancyGuard_init();
    }

    function createAgreement(
        DataTypes.AssetType assetType,
        DataTypes.TimeLockActionType actionType,
        address asset,
        uint256[] calldata tokenIdsOrAmounts,
        address beneficiary,
        uint48 releaseTime
    ) external onlyXToken(asset) returns (uint256) {
        require(beneficiary != address(0), Errors.ZERO_ADDRESS_NOT_VALID);
        require(releaseTime > block.timestamp, Errors.INVALID_EXPIRATION);

        uint256 agreementId = agreementCount++;
        agreements[agreementId] = Agreement({
            assetType: assetType,
            actionType: actionType,
            asset: asset,
            tokenIdsOrAmounts: tokenIdsOrAmounts,
            beneficiary: beneficiary,
            releaseTime: releaseTime,
            isFrozen: false
        });

        emit AgreementCreated(
            agreementId,
            assetType,
            actionType,
            asset,
            tokenIdsOrAmounts,
            beneficiary,
            releaseTime
        );

        return agreementId;
    }

    function _validateAndDeleteAgreement(uint256 agreementId)
        internal
        returns (Agreement memory)
    {
        Agreement memory agreement = agreements[agreementId];
        require(msg.sender == agreement.beneficiary, "Not beneficiary");
        require(
            block.timestamp >= agreement.releaseTime,
            "Release time not reached"
        );
        require(!agreement.isFrozen, "Agreement frozen");
        delete agreements[agreementId];

        emit AgreementClaimed(
            agreementId,
            agreement.assetType,
            agreement.actionType,
            agreement.asset,
            agreement.tokenIdsOrAmounts,
            agreement.beneficiary
        );

        return agreement;
    }

    function claim(uint256[] calldata agreementIds) external nonReentrant {
        require(!frozen, "TimeLock is frozen");

        for (uint256 index = 0; index < agreementIds.length; index++) {
            Agreement memory agreement = _validateAndDeleteAgreement(
                agreementIds[index]
            );

            if (agreement.assetType == DataTypes.AssetType.ERC20) {
                IERC20(agreement.asset).safeTransfer(
                    agreement.beneficiary,
                    agreement.tokenIdsOrAmounts[0]
                );
            } else if (agreement.assetType == DataTypes.AssetType.ERC721) {
                IERC721 erc721 = IERC721(agreement.asset);
                for (
                    uint256 i = 0;
                    i < agreement.tokenIdsOrAmounts.length;
                    i++
                ) {
                    erc721.safeTransferFrom(
                        address(this),
                        agreement.beneficiary,
                        agreement.tokenIdsOrAmounts[i]
                    );
                }
            }
        }
    }

    function claimMoonBirds(uint256 agreementId) external nonReentrant {
        Agreement memory agreement = _validateAndDeleteAgreement(agreementId);

        require(
            agreement.assetType == DataTypes.AssetType.ERC721,
            "wrong asset type"
        );

        IMoonBird moonBirds = IMoonBird(agreement.asset);
        for (uint256 i = 0; i < agreement.tokenIdsOrAmounts.length; i++) {
            moonBirds.safeTransferWhileNesting(
                address(this),
                agreement.beneficiary,
                agreement.tokenIdsOrAmounts[i]
            );
        }
    }

    function freezeAgreement(uint256 agreementId, bool value)
        external
        onlyEmergencyAdminOrPoolAdmins
    {
        agreements[agreementId].isFrozen = value;
        emit AgreementFrozen(agreementId, value);
    }

    function freezeAllAgreements(bool value)
        external
        onlyEmergencyAdminOrPoolAdmins
    {
        frozen = value;
        emit TimeLockFrozen(value);
    }

    function getAgreement(uint256 agreementId)
        external
        view
        returns (Agreement memory agreement)
    {
        agreement = agreements[agreementId];
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) external virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
