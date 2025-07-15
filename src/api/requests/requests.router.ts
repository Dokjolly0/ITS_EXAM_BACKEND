import express from "express";
import { isAuthenticated } from "../../utils/auth/authenticated-middleware";
import * as requestController from "./requests.controller";
import { validate } from "../../utils/validation-middleware";
import { AddRequestDTO, UpdateRequestDTO } from "./requests.dto";

const router = express.Router();

router.use(isAuthenticated);
router.get("/to-approve", requestController.getRequestsToApprove);
router.get("/", requestController.getRequests);
router.get("/:id", requestController.getRequestById);
router.post("/", validate(AddRequestDTO), requestController.createRequest);
router.put("/:id", validate(UpdateRequestDTO), requestController.updateRequest);
router.delete("/:id", requestController.deleteRequest);
router.post("/:id/approve", requestController.approveRequest);
router.post("/:id/reject", requestController.rejectRequest);

export default router;
