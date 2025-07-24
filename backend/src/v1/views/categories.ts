import express from "express";
import CategoriesController from "../controllers/categories";
import upload from "./../service/multer.config";
import { auth, isAdmin } from "../middlewares/auth";
import { imageSizeValidation } from "../validations/images";

const categoriesRouter = express.Router();

export const result = upload.single("image");

categoriesRouter.post(
  "/",
  auth,
  isAdmin,
  imageSizeValidation,
  CategoriesController.add
);

categoriesRouter.put(
  "/:id",
  auth,
  isAdmin,
  imageSizeValidation,
  CategoriesController.edit
);

categoriesRouter.delete("/:id", auth, isAdmin, CategoriesController.delete);

categoriesRouter.get("/", CategoriesController.get);

export default categoriesRouter;
