import { Router } from "express";
// import { getAllUsers } from "../Controllers/userController";
import { getAllUsers, getUserById, loginUser, createUser, updateUser, deleteUser } from "../controllers/userController";

const userRouter = Router();

userRouter.get('', getAllUsers);
userRouter.get("/:userID", getUserById);
userRouter.post("/login", loginUser);
userRouter.post("/register", createUser);
userRouter.put("/:userID", updateUser);
userRouter.delete("/:userID", deleteUser);


export default userRouter;

