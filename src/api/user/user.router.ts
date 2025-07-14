import express from "express";
import { isAuthenticated } from "../../utils/auth/authenticated-middleware";
import {
  becomeOrganizer,
  getUserById,
  joinTournament,
  me,
  resetPassword,
  showAllUsers,
  validatePassword,
} from "./user.controller";

const router = express.Router();

router.get("/me", isAuthenticated, me);
router.get("/users", isAuthenticated, showAllUsers);
router.get("/find/:id", isAuthenticated, getUserById);
router.post("/reset-password", isAuthenticated, resetPassword); // Reimposta la password
router.get("/validate-password/:oldPassword", isAuthenticated, validatePassword);
router.post("/tournament/join", isAuthenticated, joinTournament);
router.post("/tournament/become-organizer", isAuthenticated, becomeOrganizer);

export default router;
