import express from "express";
import usersRouter from "./users";
import categoriesRouter from "./categories";
import subcategoriesRouter from "./subcategories";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.use("/auth", usersRouter);
router.use("/categories", auth, categoriesRouter);
router.use("/subcategories", auth, subcategoriesRouter);

export default router;
