import express from "express";
import OrdersController from "../controllers/orders";

const ordersRouter = express.Router();

ordersRouter.get("/", OrdersController.getOrders);
ordersRouter.post("/", OrdersController.create);
ordersRouter.delete("/:orderId/items/:itemId", OrdersController.removeItem);

export default ordersRouter;
