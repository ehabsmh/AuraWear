import express from "express";
import upload from "../service/multer.config";
import { isAdmin } from "../middlewares/auth";
import ProductsController from "../controllers/products";

const productsRouter = express.Router();

const uploadMiddleware = upload.any();

// Admin-only routes
productsRouter.post("/", isAdmin, uploadMiddleware, ProductsController.add);
productsRouter.put("/:id", isAdmin, uploadMiddleware, ProductsController.edit);
productsRouter.delete("/:id", isAdmin, ProductsController.delete);
productsRouter.get("/", ProductsController.all);
// productsRouter.get("/:slug", ProductsController.bySlug);
// productsRouter.get("/:sex", ProductsController.bySex);

// Public routes

export default productsRouter;
