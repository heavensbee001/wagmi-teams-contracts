// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WagmiTeamsPortal {

    address private _owner;

    struct Position {
        string title;
        string projectOrCompanyName;
        string projectOrCompanyImageUrl;
        string description;
        string positionOfferUrl;
        string contact;
        uint256 createdAt;
    }

    struct PositionArray {
        uint totalNumber;
        Position[] positions;
    }

    enum PostionType{ HACKATHON, JOB }

    mapping (PostionType => PositionArray) public allPositions;

    constructor() {
        console.log("Initialized contract");

        _owner = msg.sender;
    }

    function sendPosition(PostionType postionType, Position calldata position) external payable {
        require(bytes(position.title).length > 0, "Title required");
        require(bytes(position.projectOrCompanyName).length > 0, "Project or company name required");
        require(bytes(position.description).length > 0, "Description required");
        
        require(bytes(position.title).length < 100, "Title too long");
        require(bytes(position.projectOrCompanyName).length < 100, "Project or company name too long");
        require(bytes(position.description).length < 180, "Description too long");

        Position memory newPosition = Position(
            position.title,
            position.projectOrCompanyName,
            position.projectOrCompanyImageUrl,
            position.description,
            position.positionOfferUrl,
            position.contact,
            position.createdAt);
        
        allPositions[postionType].totalNumber += 1;
        allPositions[postionType].positions.push(newPosition);
    }

    function getPaginatedPositions(PostionType postionType, uint256 _page, uint256 _resultsPerPage) external view returns(Position[] memory positions) {
        require(_page > 0, "Page number required");
        require(_resultsPerPage > 0, "Results per page number required");

        // starting position for first result element
        uint256 _positionIndex = _resultsPerPage * _page - _resultsPerPage;
        // resultPositions array length in case it is less than _resultsPerPage
        uint256 _resultsPerPageModulus = allPositions[postionType].positions.length % _resultsPerPage;
        
        if (
            allPositions[postionType].positions.length == 0 || 
            _positionIndex > allPositions[postionType].positions.length - 1
        ) {
            return new Position[](0);
        }

        Position[] memory _resultPositions = new Position[](_resultsPerPageModulus);

        for (uint index = 0; index < _resultsPerPageModulus; index ++) {
            _resultPositions[index] = allPositions[postionType].positions[_positionIndex + index];
        }

        return _resultPositions;
    }

    function tipOwner() public payable {
        (bool success, ) = payable(_owner).call{value: msg.value}("");
        require(success, "Failed to tip owner");
    }

}