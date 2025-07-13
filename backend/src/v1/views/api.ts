import express from "express";
import usersRouter from "./users";
import categoriesRouter from "./categories";
import subcategoriesRouter from "./subcategories";
import { auth } from "../middlewares/auth";
import productsRouter from "./products";
import cartRouter from "./cart";

const router = express.Router();

router.use("/auth", usersRouter);
router.use("/categories", auth, categoriesRouter);
router.use("/subcategories", auth, subcategoriesRouter);
router.use("/products", auth, productsRouter);
router.use("/cart", auth, cartRouter);

export default router;
