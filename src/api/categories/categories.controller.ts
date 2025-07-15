import { Request, Response, NextFunction } from "express";
import categoryService from "./categories.service";

export const getCategories = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = await categoryService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await categoryService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Categoria non trovata" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await categoryService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Categoria non trovata" });
    res.json({ message: "Categoria eliminata" });
  } catch (err) {
    next(err);
  }
};
