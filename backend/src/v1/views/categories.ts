import express from "express";
import CategoriesController from "../controllers/categories";
import upload from "./../service/multer.config";
import { isAdmin } from "../middlewares/auth";
import { imageSizeValidation } from "../validations/images";

const categoriesRouter = express.Router();

export const result = upload.single("image");

categoriesRouter.post(
  "/",
  isAdmin,
  imageSizeValidation,
  CategoriesController.add
);

categoriesRouter.put(
  "/:id",
  isAdmin,
  imageSizeValidation,
  CategoriesController.edit
);

categoriesRouter.delete("/:id", isAdmin, CategoriesController.delete);

categoriesRouter.get("/", CategoriesController.bySex);

export default categoriesRouter;
