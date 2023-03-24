import { Router } from "express";
import { getAllUsers, getUserById, loginUser, createUser, updateUser, deleteUser } from "../controllers/userController";
import { verifyToken } from "../Middlewares/verifyToken.middleware";

const userRouter = Router();

userRouter.get('', getAllUsers);
userRouter.get("/:userID", verifyToken, getUserById);
userRouter.post("/login", loginUser);
userRouter.post("/register", createUser);
userRouter.put("/editProfile/:userID", verifyToken, updateUser);
userRouter.delete("/:userID", verifyToken, deleteUser);


export default userRouter;

