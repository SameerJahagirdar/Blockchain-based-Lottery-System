// SPDX-License-Identifier: MIT
pragma solidity ^0.4.25;

contract Lottery{
    address public manager;
    address [] public players;

    constructor() public {
        manager=msg.sender;
    }

    function enter() public payable{
        require(msg.value >= 0.01 ether && msg.sender !=manager);
        players.push(msg.sender);
    }
    function random() private view returns (uint){
       return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players.length)));
    }
    function pickWinner() public {
        require(msg.sender == manager);
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);

        players = new address[](0);
    }
    function getPlayers() public view returns (address[] memory){
        return players;
    }

}