import { Router } from "express";
import { addAnswer, deleteAnswer, getAllAnswers, getAnswerById, getAnswerVoteCount, updateAnswer } from "../controllers/answerController";
import { verifyToken } from "../Middlewares/verifyToken.middleware";


const answerRouter = Router();

answerRouter.get('', verifyToken, getAllAnswers);
answerRouter.post("/addAnswer", verifyToken, addAnswer);
answerRouter.put("/updateAnswer/:answerID", verifyToken, updateAnswer);
answerRouter.get("/:answerID", verifyToken, getAnswerById);
answerRouter.get("/voteCount/:answerID", verifyToken, getAnswerVoteCount)
answerRouter.delete("/:answerID", verifyToken, deleteAnswer)


export default answerRouter;

