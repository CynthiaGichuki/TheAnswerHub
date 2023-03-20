import { Router } from "express";
import { getAllAnswerVotes, getAnswerVoteByID } from "../controllers/answerVotesController";


const answerVotesRouter = Router();

answerVotesRouter.get('', getAllAnswerVotes);
answerVotesRouter.get("/:voteID", getAnswerVoteByID);


export default answerVotesRouter;

