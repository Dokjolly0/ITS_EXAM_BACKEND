import { HydratedDocument } from "mongoose";
import { AddRequestDTO } from "./requests.dto";
import { RequestModel } from "./requests.model";
import { Request } from "./requests.entity";
import { notThrowDotEnvError, requireEnvVars } from "../../utils/dotenv";
import { User } from "../user/user.entity";
import { UnauthorizedError } from "../../errors/unoutorized-error";
import userService from "../user/user.service";

let ADMIN_USER_NAME: string | undefined = requireEnvVars("ADMIN_USER_NAME", notThrowDotEnvError);
if (!ADMIN_USER_NAME) ADMIN_USER_NAME = "admin";

export class RequestService {
  async getAllRequests(user: User): Promise<Request[]> {
    if (user.role === ADMIN_USER_NAME) {
      return RequestModel.find().exec();
    }
    return RequestModel.find({ userId: user.id }).exec();
  }

  async getRequestById(user: User, id: string): Promise<Request | null> {
    const query = user.role === ADMIN_USER_NAME ? { _id: id } : { _id: id, userId: user.id };
    return RequestModel.findOne(query).exec();
  }

  async createRequest(data: AddRequestDTO, userId: string): Promise<Request> {
    const reqDoc: HydratedDocument<Request> = new RequestModel({
      ...data,
      state: "pending",
      userId,
    });
    return reqDoc.save();
  }

  async updateRequest(user: any, id: string, update: Partial<AddRequestDTO>): Promise<Request | null> {
    const filter = { _id: id, userId: user.id, state: "pending" };
    return RequestModel.findOneAndUpdate(filter, update, { new: true });
  }

  async deleteRequest(user: User, id: string): Promise<Request | null> {
    const isAdmin = user.role === ADMIN_USER_NAME;

    const filter = isAdmin
      ? { _id: id } // admin può eliminare qualsiasi richiesta
      : { _id: id, userId: user.id, state: "pending" }; // utente solo se è sua e in pending

    return RequestModel.findOneAndDelete(filter);
  }

  async getRequestsToApprove(): Promise<Request[]> {
    return RequestModel.find({ state: "pending" }).exec();
  }

  async approveRequest(id: string, approvedBy: string, user: User): Promise<Request | null> {
    const userAdmin = await userService.existingUser(approvedBy);
    if (!userAdmin || userAdmin.role !== ADMIN_USER_NAME)
      throw new UnauthorizedError("Access denied. Only admins can approve requests.");
    return RequestModel.findOneAndUpdate(
      { _id: id, state: "pending" },
      { state: "approved", validationDate: new Date(), approvedBy },
      { new: true }
    );
  }

  async rejectRequest(id: string, rejectedBy: string, user: User): Promise<Request | null> {
    const userAdmin = await userService.existingUser(rejectedBy);
    if (!userAdmin || userAdmin.role !== ADMIN_USER_NAME)
      throw new UnauthorizedError("Access denied. Only admins can approve requests.");
    return RequestModel.findOneAndUpdate(
      { _id: id, state: "pending" },
      { state: "rejected", validationDate: new Date(), rejectedBy },
      { new: true }
    );
  }

  async getApprovedRequestsStats(filter: { month?: string; categoryId?: string }) {
    const match: any = { state: "approved" };

    if (filter.month) {
      const date = new Date(filter.month);
      match.validationDate = {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),
        $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      };
    }

    if (filter.categoryId) {
      match.categoryId = filter.categoryId;
    }

    return RequestModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: { category: "$categoryId", date: "$validationDate" },
          requestsCount: { $sum: 1 },
          totalPrice: { $sum: "$price" },
        },
      },
      {
        $project: {
          category: "$_id.category",
          date: "$_id.date",
          requestsCount: 1,
          totalPrice: 1,
          _id: 0,
        },
      },
    ]);
  }
}

export default new RequestService();
