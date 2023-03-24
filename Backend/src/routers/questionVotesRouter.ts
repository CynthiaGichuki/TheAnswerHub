import { Router } from "express";
import { addQuestionVote, getAllQuesitonVotes, getQuestionVoteByID } from "../controllers/questionVotesContoller";
import { verifyToken } from "../Middlewares/verifyToken.middleware";


const questionVotesRouter = Router();

questionVotesRouter.post("/addquestionVotes", verifyToken, addQuestionVote)
questionVotesRouter.get('', verifyToken, getAllQuesitonVotes);
questionVotesRouter.get("/:voteID", verifyToken, getQuestionVoteByID);


export default questionVotesRouter;