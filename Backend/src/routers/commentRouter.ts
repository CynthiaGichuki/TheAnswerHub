import { Router } from "express";
import { addComment, deleteComment, getAllComments, getCommentById } from "../controllers/commentsController";


const commentRouter = Router();

commentRouter.get('', getAllComments);
commentRouter.post("/add", addComment);
commentRouter.get("/:commentID", getCommentById);
commentRouter.delete("/:commentID", deleteComment)

export default commentRouter;

