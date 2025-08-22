import { NextFunction, Request, Response } from "express";
import Cart from "../models/cart";
import CartItem from "../models/cartItem";
import Order from "../models/order";
import User from "../models/user";
import AppError, { ErrorName } from "../service/error";
import Product from "../models/product";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../..";
import { createPaymobIntention } from "../utils/order";

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
      const orderItem = orderItems.find(
        (item) => item._id.toString() === itemId
      );
      if (!orderItem)
        throw new AppError("Order item not found", ErrorName.NotFoundError);

      // If only one product in an order, the whole order gets removed
      if (orderItems.length === 1) {
        order.total -= orderItem.pricePerQuantity!;
        await order.deleteOne();
        res.json({
          message: "Order deleted successfully!",
        });
      }

      await Order.updateOne(
        { _id: orderId },
        {
          $pull: { products: { _id: itemId } },
          total: order.total - orderItem.pricePerQuantity,
        }
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
  static async createPaymobIntention(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let { shippingInfo, paymentMethod } = req.body;
      if (paymentMethod !== "Card")
        throw new AppError("Invalid payment method", ErrorName.ValidationError);

      // Get user ID from request
      const signedInUser = req.userr;
      const userId = signedInUser?._id;

      // Get user's cart
      const cart = await Cart.findOne({ userId });
      if (!cart) throw new AppError("Cart not found", ErrorName.NotFoundError);

      const items = await CartItem.find({ cartId: cart?._id }).populate(
        "productId"
      );

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
        shippingInfo = {
          address: user.address,
          city: user.city,
          postalCode: user.postalCode,
          phone: user.phone,
        };
      } else {
        if (!shippingInfo)
          throw new AppError(
            "Shipping info is required",
            ErrorName.ValidationError
          );

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

      // create pending order
      const newOrder = await Order.create({
        userId,
        cartId: cart?._id,
        products,
        total: cart.totalPrice,
        shippingInfo,
        paymentMethod: "Card",
        orderStatus: "Pending",
      });

      const userInfo = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
      };

      const intention = await createPaymobIntention(newOrder, userInfo);
      newOrder.paymobOrderId = intention.payment_keys[0].order_id;
      await newOrder.save();

      const checkoutUrl = `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.PAYMOB_PUBLIC_KEY}&clientSecret=${intention.client_secret}`;
      res.json({ checkoutUrl });
    } catch (error) {
      next(error);
    }
  }

  static async orderWithCard(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);

      if (!req.body.obj.order.id) {
        throw new AppError("Order ID is required", ErrorName.ValidationError);
      }

      const order = await Order.findOne({
        paymobOrderId: req.body.obj.order.id,
      });

      if (!order)
        throw new AppError("Order not found.", ErrorName.NotFoundError);

      if (req.body.obj?.success !== true) {
        order.paymentStatus = "Failed";
        order.orderStatus = "Cancelled";
        await order?.save();
        return res.status(400).json({ message: "Payment failed" });
      }

      const cart = await Cart.findById(order.cartId);

      if (!cart) throw new AppError("Cart not found.", ErrorName.NotFoundError);

      order.paymentStatus = "Paid";
      order.orderStatus = "Processing";

      await Promise.all(
        order.products.map((product) =>
          Product.findByIdAndUpdate(product.productId, {
            $inc: { sold: product.quantity },
          })
        )
      );

      // Remove cart items
      await CartItem.deleteMany({ cartId: order.cartId });

      // Clear cart
      cart.totalPrice = 0;
      cart.numItems = 0;
      await cart.save();
      await order.save();

      res.json({
        message: "Order created successfully!",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrdersController;
