import { NextFunction, Request, Response } from "express";
import Cart from "../models/cart";
import CartItem from "../models/cartItem";
import Order from "../models/order";
import User from "../models/user";
import AppError, { ErrorName } from "../service/error";
import Product from "../models/product";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../..";

class OrdersController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { shippingInfo, paymentMethod } = req.body;
    try {
      // Get user ID from request
      const signedInUser = req.userr;
      const userId = signedInUser?._id;

      // Get user's cart
      const cart = await Cart.findOne({ userId });
      if (!cart) throw new AppError("Cart not found", ErrorName.NotFoundError);

      // Get cart items
      const items = await CartItem.find({ cartId: cart?._id }).populate(
        "productId"
      );

      if (!items.length)
        throw new AppError("Cart is empty", ErrorName.NotFoundError);

      // Map cart items to order products
      const products = items.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        size: item.productId.variants[item.variantIndex].sizes[item.sizeIndex]
          .size,
        color: item.productId.variants[item.variantIndex].color,
        image: item.productId.variants[item.variantIndex].mainImage,
        quantity: item.quantity,
        price: item.price,
        pricePerQuantity: item.pricePerQuantity,
      }));

      // Create new order, and add the products to it
      const newOrder = new Order({
        userId,
        cartId: cart?._id,
        products,
      });

      // Get user from the DB
      let user = await User.findById(userId);
      if (!user) throw new AppError("User not found", ErrorName.NotFoundError);

      // Check if address, phone, city, postalCode exists
      const userHasShippingInfo = [
        user.city,
        user.address,
        user.postalCode,
        user.phone,
      ].every((info) => Boolean(info));

      if (userHasShippingInfo) {
        newOrder.shippingInfo = {
          city: user.city,
          address: user.address,
          postalCode: user.postalCode,
          phone: user.phone,
        };
      } else {
        if (!shippingInfo)
          throw new AppError(
            "Shipping info is required",
            ErrorName.ValidationError
          );

        newOrder.shippingInfo = shippingInfo;
        user = await User.findByIdAndUpdate(
          userId,
          {
            $set: {
              address: shippingInfo.address,
              city: shippingInfo.city,
              postalCode: shippingInfo.postalCode,
              phone: shippingInfo.phone,
            },
          },
          { new: true }
        );
      }

      // Check the paymentMethod

      // if "card" call payment gateway
      if (paymentMethod === "Card") {
        // Here you would integrate with a payment gateway
        // For now, we will just set the payment status to "Paid"
        newOrder.paymentStatus = "Paid";
      } else {
        newOrder.paymentStatus = "Pending"; // Cash on delivery
      }

      // add the total amount
      newOrder.total = cart.totalPrice;

      // update the sold property in Products
      await Promise.all(
        products.map((product) =>
          Product.findByIdAndUpdate(product.productId, {
            $inc: { sold: product.quantity },
          })
        )
      );

      // Create the order
      await newOrder.save();

      // Remove cart items
      await CartItem.deleteMany({ cartId: cart._id });

      // Clear cart
      cart.totalPrice = 0;
      cart.numItems = 0;
      await cart.save();

      if (!userHasShippingInfo) {
        console.log(user);

        if (!SECRET_KEY) throw new Error("Secret key is not defined.");

        if (!user)
          throw new AppError("User not found", ErrorName.NotFoundError);

        const token = jwt.sign(user.toJSON(), SECRET_KEY);

        res.cookie("Authorization", token, {
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          secure: false,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
          message: "Order created successfully!",
          order: newOrder,
          updatedUser: user,
        });

        return;
      }

      res.status(201).json({
        message: "Order created successfully!",
        order: newOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userr?._id;
      if (!userId)
        throw new AppError("User not found", ErrorName.NotFoundError);

      const orders = await Order.find({ userId });
      res.status(200).json({
        message: "Orders retrieved successfully!",
        orders,
      });
    } catch (error) {
      next(error);
    }
  }

  static async removeItem(req: Request, res: Response, next: NextFunction) {
    const { itemId, orderId } = req.params;
    try {
      if (!orderId || !itemId)
        throw new AppError(
          "Order ID and Order Item ID are required",
          ErrorName.ValidationError
        );

      const order = await Order.findById(orderId);
      if (!order)
        throw new AppError("Order not found", ErrorName.NotFoundError);

      if (order.orderStatus !== "Pending" && order.orderStatus !== "Processing")
        throw new AppError(
          `Order has already been processed (${order.orderStatus}).`,
          ErrorName.ValidationError
        );

      const orderItems = order.products;

      // If only one product in an order, the whole order gets removed
      if (orderItems.length === 1) {
        await order.deleteOne();
        res.json({
          message: "Order deleted successfully!",
        });
      }

      await Order.updateOne(
        { _id: orderId },
        { $pull: { products: { _id: itemId } } }
      );

      order.total = order.products.reduce(
        (total, item) => total + item.price! * item.quantity!,
        0
      );

      await order.save();
      res.status(200).json({
        message: "Product removed from order successfully!",
        order,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrdersController;
