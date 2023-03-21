import { Router } from "express";
import { addQuestion, deleteQuestion, getAllQuestions, getQuestionById, getQuestionVoteCount, updateQuestion } from "../controllers/questionController";


const questionRouter = Router();

questionRouter.get('', getAllQuestions);
questionRouter.post("/addQuestion", addQuestion);
questionRouter.put("/updateQuestion/:questionID", updateQuestion);
questionRouter.get("/:questionID", getQuestionById);
questionRouter.get("/voteCount/:questionID", getQuestionVoteCount);
questionRouter.delete("/:questionID", deleteQuestion)

export default questionRouter;

