import { NextFunction, Request, Response } from "express";
import AppError, { ErrorName } from "../service/error";
import Category from "../models/category";
import slugify from "slugify";
import cloudinary, { uploadStream } from "../service/cloudinary-handling";

export default class CategoriesController {
  static async add(req: Request, res: Response, next: NextFunction) {
    const { name, sex } = req.body;
    const image = req.file;
    if (!image) {
      throw new AppError("Image is required.", ErrorName.ValidationError);
    }

    try {
      // Find category by name and sex to ensure it doesn't already exist.
      const category = await Category.findOne({
        name,
        sex: sex.toLowerCase(),
      });
      if (category)
        throw new AppError(
          `${name} Category for ${sex} is already exists.`,
          ErrorName.ConflictError
        );

      // upload the image to cloudinary.
      const url = await uploadStream(image, "categories");

      // Create a new category.
      const newCategory = await Category.create({
        name,
        slug: name,
        sex,
        image: url,
      });

      res
        .status(201)
        .json({ message: "Category created successfully.", newCategory });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const { id } = req.params;
    const image = req.file;

    try {
      // Get the category to edit it.
      const category = await Category.findById(id);
      if (!category)
        throw new AppError("Category not found.", ErrorName.NotFoundError);

      let imageUrl = category.image;

      // Check if there's image to update.
      if (image) {
        // Check if the category has a valid image to get the "folder_name/image_id".
        if (imageUrl?.startsWith("https://res.cloudinary.com")) {
          const oldImageId = imageUrl.split("/").slice(-3).join("/");

          // Remove the image from cloudinary.
          await cloudinary.uploader.destroy(oldImageId);
        }

        // Upload the new image to cloudinary.
        imageUrl = await uploadStream(image, "categories");
      }

      // Update category.
      await category.updateOne({
        name,
        slug: slugify(name, { lower: true, strict: true }),
        image: imageUrl,
      });

      res.json({ message: "Category updated." });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const category = await Category.findById(id);
      if (!category)
        throw new AppError("Category not found.", ErrorName.NotFoundError);

      if (category.image?.startsWith("https://res.cloudinary.com")) {
        // Check if the category has a valid image to get the "folder_name/image_id".
        const imageId = category?.image.split("/").slice(-3).join("/");

        // Remove the image from cloudinary.
        await cloudinary.uploader.destroy(imageId);
      }

      // Delete Category
      await category.deleteOne();
      res.json({ message: "Category deleted." });
    } catch (error) {
      next(error);
    }
  }
  static async get(req: Request, res: Response, next: NextFunction) {
    const { sex } = req.query;
    try {
      const filter: any = {};

      if (sex) {
        filter.sex = sex;
      }

      const categories = await Category.find(filter);
      if (!categories.length)
        throw new AppError("No categories found.", ErrorName.NotFoundError);

      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
}
