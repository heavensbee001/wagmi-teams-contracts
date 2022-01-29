// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WagmiTeamsPortal {

    struct Position {
        string title;
        string projectOrCompanyName;
        string description;
        string positionOfferUrl;
        string contact;
        uint256 createdAt;
    }

    struct PositionArray {
        uint totalNumber;
        Position[] positions;
    }

    constructor() {
        console.log("Initialized contract");
    }

}