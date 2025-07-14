import authRouter from "./auth/auth.router";
import express from "express";
import userRouter from "./user/user.router";

const router = express.Router();
router.use("/users", userRouter);
router.use(authRouter);

export default router;
