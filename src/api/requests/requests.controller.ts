// requests.controller.ts
import { NextFunction, Request, Response } from "express";
import requestService from "./requests.service";
import { UnauthorizedError } from "../../errors/unoutorized-error";

export const getRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requests = await requestService.getAllRequests(req.user!);
    res.json(requests);
  } catch (err) {
    next(err);
  }
};

export const getRequestById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = await requestService.getRequestById(req.user!, req.params.id);
    if (!request) return res.status(404).json({ error: "Request not found" });
    res.json(request);
  } catch (err) {
    next(err);
  }
};

export const createRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = await requestService.createRequest(req.body, req.user!.id!);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await requestService.updateRequest(req.user, req.params.id, req.body);
    if (!updated) return res.status(403).json({ error: "Non autorizzato o già approvata" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await requestService.deleteRequest(req.user!, req.params.id);
    if (!deleted)
      return res.status(403).json({ error: "Eliminazione non consentita o richiesta non trovata" });
    res.json({ message: "Richiesta eliminata" });
  } catch (err) {
    next(err);
  }
};

export const getRequestsToApprove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isAdmin = req.user!.role === "admin"; // Assuming "admin" is the role for admin users
    if (!isAdmin) throw new UnauthorizedError("Access denied. Only admins can view requests to approve.");
    const list = await requestService.getRequestsToApprove();
    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const approveRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const approvedBy = req.body.approvedBy;
    const approved = await requestService.approveRequest(req.params.id, approvedBy, user);
    if (!approved) return res.status(404).json({ error: "Richiesta non trovata o già gestita" });
    res.json(approved);
  } catch (err) {
    next(err);
  }
};

export const rejectRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const approvedBy = req.body.approvedBy;
    const rejected = await requestService.rejectRequest(req.params.id, approvedBy, user);
    if (!rejected) return res.status(404).json({ error: "Richiesta non trovata o già gestita" });
    res.json(rejected);
  } catch (err) {
    next(err);
  }
};

export const getApprovedStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { month, categoryId } = req.query;
    const stats = await requestService.getApprovedRequestsStats({
      month: month as string,
      categoryId: categoryId as string,
    });
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
