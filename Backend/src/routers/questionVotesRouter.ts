import { Router } from "express";
import { getAllQuesitonVotes, getQuestionVoteByID, InsertOrUpdateQuestionVote } from "../controllers/questionVotesContoller";
import { verifyToken } from "../Middlewares/verifyToken.middleware";


const questionVotesRouter = Router();

questionVotesRouter.post("/addquestionVotes", verifyToken, InsertOrUpdateQuestionVote)
questionVotesRouter.get('', verifyToken, getAllQuesitonVotes);
questionVotesRouter.get("/:voteID", verifyToken, getQuestionVoteByID);


export default questionVotesRouter;