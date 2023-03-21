import { Router } from "express";
import { getAllAnswerVotes, getAnswerVoteByID, InsertOrUpdateAnswerVote } from "../controllers/answerVotesController";


const answerVotesRouter = Router();

answerVotesRouter.post("/addanswerVote", InsertOrUpdateAnswerVote);
answerVotesRouter.get('', getAllAnswerVotes);
answerVotesRouter.get("/:voteID", getAnswerVoteByID);


export default answerVotesRouter;

