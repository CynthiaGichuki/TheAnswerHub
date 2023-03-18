import { Router } from "express";
import { addQuestion, deleteQuestion, getAllQuestions, getQuestionById, getQuestionByVoteCount } from "../Controllers/questionController";


const questionRouter = Router();

questionRouter.get('', getAllQuestions);
questionRouter.post("/add", addQuestion);
questionRouter.get("/:questionID", getQuestionById);
questionRouter.get("/:questionID", getQuestionByVoteCount)
questionRouter.delete("/:questionID", deleteQuestion)

export default questionRouter;

