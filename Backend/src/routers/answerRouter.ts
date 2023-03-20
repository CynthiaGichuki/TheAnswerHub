import { Router } from "express";
import { addAnswer, deleteAnswer, getAllAnswers, getAnswerById, getAnswerVoteCount } from "../controllers/answerController";


const answerRouter = Router();

answerRouter.get('', getAllAnswers);
answerRouter.post("/addAnswer", addAnswer);
answerRouter.get("/:answerID", getAnswerById);
answerRouter.get("/voteCount/:answerID", getAnswerVoteCount)
answerRouter.delete("/:answerID", deleteAnswer)


export default answerRouter;

