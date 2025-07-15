import mongoose from "mongoose";
import { Request } from "./requests.entity";
import { REQUEST_STATES_ENUM } from "../../utils/enums/requests.enum";

const requestSchema = new mongoose.Schema<Request>({
  requestDate: { type: Date, default: Date.now },
  categoryId: { type: String, required: true },
  object: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  motivation: { type: String, required: true },
  state: { type: String, enum: REQUEST_STATES_ENUM, required: true },
  userId: { type: String, required: true }, // FK - Utente richiedente
  validationDate: { type: Date, default: null },
  approvedBy: { type: String, default: null }, // FK - Utente che ha approvato
  rejectedBy: { type: String, default: null }, // FK
});

requestSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

requestSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const RequestModel = mongoose.model<Request>("Request", requestSchema);
