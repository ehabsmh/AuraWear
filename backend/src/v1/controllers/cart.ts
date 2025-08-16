import { NextFunction, Request, Response } from "express";
import {
  createCartItemValidationSchema,
  updateCartItemValidationSchema,
} from "../validations/cart";
import AppError, { ErrorName } from "../service/error";
import CartItem from "../models/cartItem";
import Cart from "../models/cart";

class CartController {
  static async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userr?._id;
      const { productId, variantIndex, sizeIndex, quantity } = req.body;

      // Get or create the cart for the user
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = await Cart.create({ userId });
      }

      // validate the cart item data
      const { error } = createCartItemValidationSchema.validate(
        { productId, variantIndex, sizeIndex, quantity },
        {
          abortEarly: false,
        }
      );
      if (error) {
        throw new AppError(
          JSON.stringify(error.details),
          ErrorName.ValidationError
        );
      }

      const cartItem = await CartItem.create({
        cartId: cart?._id,
        productId,
        variantIndex,
        sizeIndex,
        quantity,
      });

      await cartItem.populate({ path: "productId" });

      // return success response
      res.status(201).json({
        message: "Item added to cart successfully",
        cartItem,
      });
    } catch (error) {
      if ((error as any).code === 11000) {
        // Handle duplicate key error (e.g., trying to add the same item again)
        return next(
          new AppError(
            "Item already exists in the cart",
            ErrorName.ConflictError
          )
        );
      }
      next(error);
    }
  }

  static async deleteFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const cartItemId = req.params.cartItemId;

      // find the cart item and delete it
      const cartItem = await CartItem.findOneAndDelete({ _id: cartItemId });
      if (!cartItem) {
        throw new AppError("Cart item not found", ErrorName.NotFoundError);
      }

      // return success response
      res.status(200).json({
        message: "Cart item deleted successfully",
        cartItem,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      // get cart item data from request body
      const { variantIndex, sizeIndex, quantity } = req.body;
      const cartItemId = req.params.cartItemId;

      // validate the cart item data
      const { error } = updateCartItemValidationSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        throw new AppError(
          JSON.stringify(error.details),
          ErrorName.ValidationError
        );
      }

      // find the cart item and update it
      const cartItem = await CartItem.findById(cartItemId).populate({
        path: "productId",
      });
      if (!cartItem) {
        throw new AppError("Cart item not found", ErrorName.NotFoundError);
      }
      if (quantity) {
        cartItem.quantity = quantity;
      }

      if (variantIndex) {
        cartItem.variantIndex = variantIndex;
      }

      if (sizeIndex) {
        cartItem.sizeIndex = sizeIndex;
      }

      await cartItem.save();

      if (!cartItem) {
        throw new AppError("Cart item not found", ErrorName.NotFoundError);
      }

      // return success response
      res.status(200).json({
        message: "Cart item updated successfully",
        cartItem,
      });
    } catch (error) {
      console.log(error);
      if ((error as any).code === 11000) {
        // Handle duplicate key error (e.g., trying to add the same item again)
        return next(
          new AppError(
            "Item already exists in the cart",
            ErrorName.ConflictError
          )
        );
      }
      next(error);
    }
  }

  static async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userr?._id;

      console.log(userId);
      if (!userId) {
        res.status(200).json({
          message: "Cart retrieved successfully",
          cart: null,
        });
      }
      // find the cart for the user
      const cart = await Cart.findOne({ userId }).populate({
        path: "items",
        populate: { path: "productId" },
      });

      if (!cart) {
        throw new AppError("Cart not found", ErrorName.NotFoundError);
      }

      // return success response
      res.status(200).json({
        message: "Cart retrieved successfully",
        cart,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CartController;
