import { Router } from "express";
import { getAllQuesitonVotes, getQuestionVoteByID } from "../controllers/questionVotesContoller";


const questionVotesRouter = Router();

questionVotesRouter.get('', getAllQuesitonVotes);
questionVotesRouter.get("/:voteID", getQuestionVoteByID);


export default questionVotesRouter;