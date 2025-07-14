import mongoose from "mongoose";
import { User } from "./user.entity";

const userSchema = new mongoose.Schema<User>({
  // User table
  firstName: String,
  lastName: String,
  role: { type: String, default: "user" },
  // Security info
  createdAt: { type: Date, default: Date.now },
  lastUpdateAt: { type: Date, default: undefined },
  lastLogin: { type: Date, default: undefined },
  lastAllowedIp: { type: String || undefined, default: undefined },
  allowedIps: { type: [String], default: [] },

  isTournamentParticipant: { type: Boolean, default: false },
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

userSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const UserModel = mongoose.model<User>("User", userSchema);
