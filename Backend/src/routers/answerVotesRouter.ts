import { Router } from "express";
import { getAllAnswerVotes, getAnswerVoteByID, InsertOrUpdateAnswerVote } from "../controllers/answerVotesController";
import { verifyToken } from "../Middlewares/verifyToken.middleware";


const answerVotesRouter = Router();

answerVotesRouter.post("/addanswerVote", verifyToken, InsertOrUpdateAnswerVote);
answerVotesRouter.get('', verifyToken, getAllAnswerVotes);
answerVotesRouter.get("/:voteID", verifyToken, getAnswerVoteByID);


export default answerVotesRouter;

