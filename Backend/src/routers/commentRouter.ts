import { Router } from "express";
import { addComment, deleteComment, getAllComments, getCommentById, updateComment } from "../controllers/commentsController";

const commentRouter = Router();

commentRouter.get('', getAllComments);
commentRouter.post("/addComment", addComment);
commentRouter.put("/updateComment/:commentID", updateComment);
commentRouter.get("/:commentID", getCommentById);
commentRouter.delete("/:commentID", deleteComment)

export default commentRouter;

