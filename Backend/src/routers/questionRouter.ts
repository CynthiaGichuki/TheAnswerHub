import { Router } from "express";
import { addQuestion, deleteQuestion, getAllQuestions, getQuestionById, getQuestionVoteCount, updateQuestion } from "../controllers/questionController";
import { verifyToken } from "../Middlewares/verifyToken.middleware";


const questionRouter = Router();

questionRouter.get('', getAllQuestions);
questionRouter.post("/addQuestion", verifyToken, addQuestion);
questionRouter.put("/updateQuestion/:questionID", verifyToken, updateQuestion);
questionRouter.get("/:questionID", verifyToken, getQuestionById);
questionRouter.get("/voteCount/:questionID", verifyToken, getQuestionVoteCount);
questionRouter.delete("/:questionID", verifyToken, deleteQuestion)

export default questionRouter;

