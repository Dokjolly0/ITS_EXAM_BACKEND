// categories.router.ts
import express from "express";
import { isAuthenticated } from "../../utils/auth/authenticated-middleware";
import * as categoryController from "./categories.controller";
import { validate } from "../../utils/validation-middleware";
import { AddOrUpdateCategoryDTO } from "./categories.dto";

const router = express.Router();

router.use(isAuthenticated);
router.get("/", categoryController.getCategories);
router.post("/", validate(AddOrUpdateCategoryDTO), categoryController.createCategory);
router.put("/:id", validate(AddOrUpdateCategoryDTO), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
