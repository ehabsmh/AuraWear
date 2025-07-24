import express from "express";
import upload from "../service/multer.config";
import { auth, isAdmin } from "../middlewares/auth";
import ProductsController from "../controllers/products";

const productsRouter = express.Router();

const uploadMiddleware = upload.any();

// Admin-only routes
productsRouter.post(
  "/",
  auth,
  isAdmin,
  uploadMiddleware,
  ProductsController.add
);
productsRouter.put(
  "/:id",
  auth,
  isAdmin,
  uploadMiddleware,
  ProductsController.edit
);
productsRouter.delete("/:id", auth, isAdmin, ProductsController.delete);
productsRouter.get("/", ProductsController.all);
// productsRouter.get("/:slug", ProductsController.bySlug);
// productsRouter.get("/:sex", ProductsController.bySex);

// Public routes

export default productsRouter;
