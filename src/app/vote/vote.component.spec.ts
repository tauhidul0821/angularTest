import {VoteComponent} from './vote.component';
// Arrange
// Act
// Assert

describe('VoteComponent',()=>{
  var component:VoteComponent;
  beforeEach(()=>{
    // Set up
    component = new VoteComponent();
  });

  afterEach(()=>{
    // tear down
  });

  it('should increment totalVotes when upvoted',()=>{
    component.upVote();
    component.upVote();

    expect(component.totalVotes).toBe(2);
  });

  it('should decrement totalVotes when downVote',()=>{
    component.downVote();
    expect(component.totalVotes).toBe(-1);
  });

});