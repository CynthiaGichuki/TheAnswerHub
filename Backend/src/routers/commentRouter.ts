import { Router } from "express";
import { addComment, deleteComment, getAllComments, getCommentById, updateComment } from "../controllers/commentsController";
import { verifyToken } from "../Middlewares/verifyToken.middleware";

const commentRouter = Router();

commentRouter.get('', verifyToken, getAllComments);
commentRouter.post("/addComment", verifyToken, addComment);
commentRouter.put("/updateComment/:commentID", verifyToken, updateComment);
commentRouter.get("/:commentID", verifyToken, getCommentById);
commentRouter.delete("/:commentID", verifyToken, deleteComment)

export default commentRouter;

