import { Response, Request, NextFunction } from "express";
import Product from "../models/product";
import AppError, { ErrorName } from "../service/error";
import WishlistItem from "../models/Wishlist";
import { mongo } from "mongoose";

class WishlistController {
  static async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.body;

      const userId = req.userr?._id;

      const product = await Product.findById(productId);
      if (!product)
        throw new AppError("Product not found", ErrorName.NotFoundError);

      const wishlistItem = await WishlistItem.create({
        userId,
        item: productId,
      });

      res.status(201).json({
        message: "Wishlist item added successfully",
        item: wishlistItem,
      });
    } catch (error) {
      if (error instanceof mongo.MongoServerError && error.code === 11000) {
        next(
          new AppError("Wishlist item already exists", ErrorName.ConflictError)
        );
      }

      next(error);
    }
  }

  static async removeItem(req: Request, res: Response, next: NextFunction) {
    try {
      // const { productId } = req.body;
      // const userId = req.userr?._id;

      const wishlistItem = await WishlistItem.findByIdAndDelete(req.params.id);

      if (!wishlistItem)
        throw new AppError("Wishlist item not found", ErrorName.NotFoundError);

      res.json({ message: "Wishlist item removed successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userr?._id;

      const wishlistItems = await WishlistItem.find({ userId }).populate(
        "item"
      );

      res.json(wishlistItems);
    } catch (error) {
      next(error);
    }
  }

  // static async getItem(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { productId } = req.query;

  //     const wishlistItem = await WishlistItem.findOne({ productId });

  //     if (!wishlistItem)
  //       throw new AppError("Wishlist item not found", ErrorName.NotFoundError);

  //     res.json(wishlistItem);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async checkExistence(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.query;
      const userId = req.userr?._id;

      const wishlistItem = await WishlistItem.exists({
        userId,
        item: productId,
      });

      res.json(wishlistItem);
    } catch (error) {
      next(error);
    }
  }
}

export default WishlistController;
