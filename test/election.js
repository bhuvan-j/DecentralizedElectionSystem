var Election= artifacts.require("./Election.sol");
contract("Election", function(accounts){
    var electioninstance;
var candidateId;
it("intialises with 6 candidates",function(){
    return Election.deployed().then(function(instance){
        return instance.candidatescount();
    }).then(function(count){
        assert.equal(count,6);
    });
});


it("intialises with correct values for all  candidates",function(){
    return Election.deployed().then(function(instance){
        electioninstance=instance;
        return electioninstance.candidates(1);
    }).then(function(candidate){
        assert.equal(candidate[0],1,"contains correct id");
        assert.equal(candidate[1],"Bhuvan","contains correct name");
        assert.equal(candidate[2],0,"contains correct vote count");
        return electioninstance.candidates(2);
    }).then(function(candidate){
        assert.equal(candidate[0],2,"contains correct id");
        assert.equal(candidate[1],"Arya","contains correct name");
        assert.equal(candidate[2],0,"contains correct vote count");
        return electioninstance.candidates(3);
    }).then(function(candidate){
        assert.equal(candidate[0],3,"contains correct id");
        assert.equal(candidate[1],"Mohit","contains correct name");
        assert.equal(candidate[2],0,"contains correct vote count");
        return electioninstance.candidates(4);
    }).then(function(candidate){
        assert.equal(candidate[0],4,"contains correct id");
        assert.equal(candidate[1],"Modi","contains correct name");
        assert.equal(candidate[2],0,"contains correct vote count");
        return electioninstance.candidates(5);
    }).then(function(candidate){
        assert.equal(candidate[0],5,"contains correct id");
        assert.equal(candidate[1],"Pappu","contains correct name");
        assert.equal(candidate[2],0,"contains correct vote count");
        return electioninstance.candidates(6);
    }).then(function(candidate){
        assert.equal(candidate[0],6,"contains correct id");
        assert.equal(candidate[1],"Sonu Sood","contains correct name");
        assert.equal(candidate[2],0,"contains correct vote count");
       
    });
});

it("allows a voter to cast a vote", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      candidateId = 1;
      return electionInstance.vote(candidateId, { from: accounts[0] });
    }).then(function(receipt) {
        assert.equal(receipt.logs.length, 1, "an event was triggered");
        assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");
       
     
      return electionInstance.voters(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the voter was marked as voted");
      return electionInstance.candidates(candidateId);
    }).then(function(candidate) {
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, "increments the candidate's vote count");
    })
  });

  it("throws an exception for invalid candiates", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.vote(99, { from: accounts[1] })
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return electionInstance.candidates(1);
    }).then(function(candidate1) {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
      return electionInstance.candidates(2);
    }).then(function(candidate2) {
      var voteCount = candidate2[2];
      assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
    });
  });

  it("throws an exception for double voting", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      candidateId = 2;
      electionInstance.vote(candidateId, { from: accounts[1] });
      return electionInstance.candidates(candidateId);
    }).then(function(candidate) {
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, "accepts first vote");
      // Try to vote again
      return electionInstance.vote(candidateId, { from: accounts[1] });
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return electionInstance.candidates(1);
    }).then(function(candidate1) {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
      return electionInstance.candidates(2);
    }).then(function(candidate2) {
      var voteCount = candidate2[2];
      assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
    });
  });
});


