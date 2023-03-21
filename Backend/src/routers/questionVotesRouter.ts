import { Router } from "express";
import { getAllQuesitonVotes, getQuestionVoteByID, InsertOrUpdateQuestionVote } from "../controllers/questionVotesContoller";


const questionVotesRouter = Router();

questionVotesRouter.post("/addquestionVotes", InsertOrUpdateQuestionVote)
questionVotesRouter.get('', getAllQuesitonVotes);
questionVotesRouter.get("/:voteID", getQuestionVoteByID);


export default questionVotesRouter;