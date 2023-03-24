Create Procedure addQuestionVote 
@voteID VARCHAR(255),
@userID VARCHAR(255),
@questionID VARCHAR(255),
@voteType VARCHAR(10) As Begin
Declare @existingVoteType VARCHAR(10)
Select @existingVoteType = vote_type
From questionVotes
Where userID = @userID
    and questionID = @questionID If @existingVoteType Is Not Null Begin RAISERROR(
        'User has already voted for this question',
        16,
        1
    ) Return
End
Insert Into questionVotes (voteID, userID, questionID, vote_type)
Values (@voteID, @userID, @questionID, @voteType)
End