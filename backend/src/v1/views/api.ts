import express from "express";
import usersRouter from "./users";
import categoriesRouter from "./categories";
import subcategoriesRouter from "./subcategories";
import { auth } from "../middlewares/auth";
import productsRouter from "./products";
import cartRouter from "./cart";
import dealsRouter from "./deals";
import ordersRouter from "./orders";

const router = express.Router();

router.use("/auth", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/subcategories", subcategoriesRouter);
router.use("/products", productsRouter);
router.use("/deals", dealsRouter);
router.use("/cart", auth, cartRouter);
router.use("/orders", ordersRouter);

export default router;
