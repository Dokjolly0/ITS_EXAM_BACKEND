// categories.model.ts
import mongoose from "mongoose";
import { Category } from "./categories.entity";

const categorySchema = new mongoose.Schema<Category>(
  {
    description: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

categorySchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const CategoryModel = mongoose.model<Category>("Category", categorySchema);
