Create Procedure UpdateQuestionVote @userID VARCHAR(255),
@questionID VARCHAR(255),
@voteType VARCHAR(10) As Begin
Declare @existingVoteType VARCHAR(10)
Select @existingVoteType = vote_type
From questionVotes
Where userID = @userID
    and questionID = @questionID If @existingVoteType Is Null Begin RAISERROR('User has not voted for this question', 16, 1) Return
End If @existingVoteType != @voteType Begin
Update questionVotes
Set vote_type = @voteType
Where userID = @userID
    and questionID = @questionID
End
End