import { Router } from "express";
import { addQuestion, deleteQuestion, getAllQuestions, getQuestionById, getQuestionByVoteCount } from "../controllers/questionController";


const questionRouter = Router();

questionRouter.get('', getAllQuestions);
questionRouter.post("/addQuestion", addQuestion);
questionRouter.get("/:questionID", getQuestionById);
questionRouter.get("/voteCount/:questionID", getQuestionByVoteCount);
questionRouter.delete("/:questionID", deleteQuestion)

export default questionRouter;

