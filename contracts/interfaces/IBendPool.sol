// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.10;

interface IBendPool {
    function deposit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;
}