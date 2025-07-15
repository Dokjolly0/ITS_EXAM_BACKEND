import { CategoryModel } from "./categories.model";
import { AddOrUpdateCategoryDTO } from "./categories.dto";
import { CustomError } from "../../errors/custom-error";
import { RequestModel } from "../requests/requests.model";

export class CategoryService {
  async getAll() {
    return CategoryModel.find().exec();
  }

  async create(data: AddOrUpdateCategoryDTO) {
    const existingCategory = await CategoryModel.findOne({ description: data.description }).exec();
    if (existingCategory) throw new CustomError("CategoryError", "Categoria già esistente", 400);
    return CategoryModel.create(data);
  }

  async update(id: string, data: Partial<AddOrUpdateCategoryDTO>) {
    const inUse = await RequestModel.exists({ categoryId: id });
    if (inUse) throw new CustomError("CategoryError", "Categoria in uso, impossibile modificare", 400);
    return CategoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    const inUse = await RequestModel.exists({ categoryId: id });
    if (inUse) throw new CustomError("CategoryError", "Categoria in uso, impossibile eliminare", 400);
    return CategoryModel.findByIdAndDelete(id);
  }
}

export default new CategoryService();
