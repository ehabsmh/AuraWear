import express from "express";
import { auth, isAdmin } from "../middlewares/auth";
import SubcategoriesController from "../controllers/subcategories";

const subcategoriesRouter = express.Router();

subcategoriesRouter.post("/", auth, isAdmin, SubcategoriesController.add);
subcategoriesRouter.put("/:id", auth, isAdmin, SubcategoriesController.edit);
subcategoriesRouter.delete(
  "/:id",
  auth,
  isAdmin,
  SubcategoriesController.delete
);
subcategoriesRouter.get("/", SubcategoriesController.getByCategory);

export default subcategoriesRouter;
