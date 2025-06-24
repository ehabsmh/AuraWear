import express from "express";
import usersRouter from "./users";
import categoriesRouter from "./categories";

const router = express.Router();

router.use("/auth", usersRouter);
router.use("/categories", categoriesRouter);

export default router;
