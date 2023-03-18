import { Router } from "express";
import { addAnswer, deleteAnswer, getAllAnswers, getAnswerById, getAnswerVoteCount } from "../Controllers/answerController";


const answerRouter = Router();

answerRouter.get('', getAllAnswers);
answerRouter.post("/addAnswer", addAnswer);
answerRouter.get("/:answerID", getAnswerById);
answerRouter.get("/:questionID", getAnswerVoteCount)
answerRouter.delete("/:questionID", deleteAnswer)


export default answerRouter;

