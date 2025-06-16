import express from "express";
import usersRouter from "./users";

const router = express.Router();

router.use("/auth", usersRouter);

export default router;
