import express from "express";
import OrdersController from "../controllers/orders";

const ordersRouter = express.Router();

ordersRouter.post("/", OrdersController.create);

export default ordersRouter;
