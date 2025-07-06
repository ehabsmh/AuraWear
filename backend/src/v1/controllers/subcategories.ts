import { NextFunction, Request, Response } from "express";
import AppError, { ErrorName } from "../service/error";
import Category from "../models/category";
import Subcategory from "../models/subcategory";

class SubcategoriesController {
  static async add(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const categoryId = req.query["category-id"];

    try {
      // Check category existence.
      const category = await Category.findById(categoryId);
      if (!category)
        throw new AppError("Category not found.", ErrorName.NotFoundError);

      // Check subcategory existence by checking the category id and the category name, means duplicated entry.
      const subcategory = await Subcategory.findOne({ categoryId, name });
      if (subcategory)
        throw new AppError(
          "Subcategory already exists.",
          ErrorName.ConflictError
        );

      // Create new subcategory.
      const newSubcategory = await Subcategory.create({
        categoryId,
        name,
      });
      res.status(201).json({
        message: `New subcategory created for ${category.sex}.`,
        newSubcategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req: Request, res: Response, next: NextFunction) {
    const { name, categoryId } = req.body;
    const { id } = req.params;

    try {
      // Check category existence.
      if (categoryId) {
        const category = await Category.findById(categoryId);
        if (!category)
          throw new AppError("Category not found.", ErrorName.NotFoundError);
      }

      // Find and update subcategory.
      const newSubcategory = await Subcategory.findByIdAndUpdate(id, {
        categoryId,
        name,
        slug: name,
      });
      if (!newSubcategory)
        throw new AppError("Subcategory not found.", ErrorName.NotFoundError);

      res.status(201).json({ message: `${newSubcategory?.name} updated.` });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const subcategory = await Subcategory.deleteOne({ _id: id });
      if (!subcategory.deletedCount)
        throw new AppError("Subcategory not found.", ErrorName.NotFoundError);

      res.status(201).json({ message: "Subcategory deleted." });
    } catch (err) {
      next(err);
    }
  }

  static async getByCategory(req: Request, res: Response, next: NextFunction) {
    const { category, sex } = req.query;

    try {
      if (!category || !sex)
        throw new AppError(
          "category or sex is missing",
          ErrorName.BadRequestError
        );

      const categoryFound = await Category.findOne({ slug: category, sex });
      if (!categoryFound)
        throw new AppError("Category not found.", ErrorName.NotFoundError);

      const subcategories = await Subcategory.find({
        categoryId: categoryFound._id,
      });
      if (!subcategories.length) {
        res.status(404).json({ subcategories });
        return;
      }

      res.json({ subcategories });
    } catch (err) {
      next(err);
    }
  }
}

export default SubcategoriesController;
