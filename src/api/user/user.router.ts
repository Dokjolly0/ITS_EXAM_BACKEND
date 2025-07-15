import express from "express";
import { isAuthenticated } from "../../utils/auth/authenticated-middleware";
import { getUserById, me, resetPassword, showAllUsers, validatePassword } from "./user.controller";

const router = express.Router();

router.get("/me", isAuthenticated, me);
router.get("/users", isAuthenticated, showAllUsers);
router.get("/find/:id", isAuthenticated, getUserById);
router.post("/reset-password", isAuthenticated, resetPassword); // Reimposta la password
router.get("/validate-password/:oldPassword", isAuthenticated, validatePassword);

export default router;
