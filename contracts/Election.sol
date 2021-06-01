// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;
 
 contract Election{
     struct candidate{
         uint id;
         string name;
         uint votecount;
     }
       mapping(address => bool) public voters;
     mapping(uint => candidate) public candidates;
     uint public candidatescount;
      event votedEvent(
         uint indexed_candidateId
     );
    constructor() public {
        addcandidate("Bhuvan");
        addcandidate("Arya");
        addcandidate("Mohit");
        addcandidate("Modi");
        addcandidate("Pappu");
        addcandidate("Sonu Sood");

     }
     function addcandidate(string memory _name) private {
         candidatescount++;
         candidates[candidatescount]=candidate(candidatescount,_name,0);

     }

     function vote (uint _candidateId) public{
         require(!voters[msg.sender]);
         require(_candidateId>0 && _candidateId<=candidatescount);
        voters[msg.sender]=true; 
         candidates[_candidateId].votecount++;
         
         emit votedEvent(_candidateId);

         
     }
 }