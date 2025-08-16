import express from "express";
import OrdersController from "../controllers/orders";

const ordersRouter = express.Router();

ordersRouter.get("/", OrdersController.getOrders);
ordersRouter.post("/", OrdersController.create);

export default ordersRouter;
