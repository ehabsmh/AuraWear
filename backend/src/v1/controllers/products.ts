import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import { addImagesToProduct } from "../service/products";
import { createProductSchema } from "../validations/products";
import AppError, { ErrorName } from "../service/error";
import { deleteImages } from "../service/cloudinary-handling";
import { getPaginatedProducts } from "../utils/products";

class ProductsController {
  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      // Get the product data from the request body
      const productData = req.body;

      // Get the uploaded images from the request files
      const images = req.files as Express.Multer.File[];

      // Validate the product data
      const result = createProductSchema.validate(productData, {
        abortEarly: false,
      });

      if (result.error) {
        throw new AppError(
          JSON.stringify(result.error.details),
          ErrorName.ValidationError
        );
      }

      // Create a new product instance
      const product = new Product(productData);

      // Add images to the product instance
      await addImagesToProduct(product, images);

      // Save the product to the database
      await product.save();

      res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
      next(error);
    }
  }
  static async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      const updates = req.body;
      const images = req.files as Express.Multer.File[];

      // Validate product data
      const result = createProductSchema.validate(updates, {
        abortEarly: false,
      });
      if (result.error) {
        throw new AppError(
          JSON.stringify(result.error.details),
          ErrorName.ValidationError
        );
      }

      const product = await Product.findById(productId);
      if (!product) {
        throw new AppError("Product not found", ErrorName.NotFoundError);
      }

      // Update text fields
      product.name = updates.name;
      product.slug = updates.name;
      product.shortDescription = updates.shortDescription;
      product.longDescription = updates.longDescription;
      product.sex = updates.sex;
      product.price = updates.price;
      product.discountPrice = updates.discountPrice;
      product.categoryId = updates.categoryId;
      product.subcategoryId = updates.subcategoryId;
      product.variants = updates.variants;

      // Re-upload new images if provided
      if (images && images.length > 0) {
        await addImagesToProduct(product, images);
      }

      await product.save();

      res.json({ message: "Product updated successfully", product });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        throw new AppError("Product not found", ErrorName.NotFoundError);
      }

      deleteImages(product);

      // Delete the product from the database
      await product.deleteOne();

      res.json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async all(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug, sex, categoryId, subcategoryId } = req.query;

      // If slug is provided, return the single product
      if (slug) {
        const product = await Product.findOne({ slug });

        if (!product) {
          throw new AppError("Product not found", ErrorName.NotFoundError);
        }

        res.json(product);
        return;
      }

      // Build filter object dynamically
      const filter: any = {};
      if (sex) filter.sex = sex;
      if (categoryId) filter.categoryId = categoryId;
      if (subcategoryId) filter.subcategoryId = subcategoryId;

      const result = await getPaginatedProducts(req.query, filter);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async outOfStock(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const products = await Product.find({
        "variants.sizes.stock": { $eq: 0 },
      })
        .skip(skip)
        .limit(limit);

      const count = await Product.countDocuments({
        "variants.sizes.stock": { $eq: 0 },
      });

      res.json({ total: count, page, limit, products });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductsController;
