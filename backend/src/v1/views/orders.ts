import express from "express";
import OrdersController from "../controllers/orders";
import { auth } from "../middlewares/auth";

const ordersRouter = express.Router();

ordersRouter.get("/", auth, OrdersController.getOrders);
ordersRouter.post("/", auth, OrdersController.create);
ordersRouter.post("/paymob", OrdersController.orderWithCard);
ordersRouter.post(
  "/paymob-intention",
  auth,
  OrdersController.createPaymobIntention
);
ordersRouter.delete(
  "/:orderId/items/:itemId",
  auth,
  OrdersController.removeItem
);

export default ordersRouter;
