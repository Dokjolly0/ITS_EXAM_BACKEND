import express from "express";
import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import requestRouter from "./requests/requests.router";
import categoryRouter from "./categories/categories.router";
import * as requestController from "./requests/requests.controller";

const router = express.Router();
router.use("/users", userRouter);
router.use("/requests", requestRouter);
router.use("/categories", categoryRouter);
router.use("/stats/approved-requests", requestController.getApprovedStats);
router.use(authRouter);

export default router;
