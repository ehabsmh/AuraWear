import express from "express";
import { isAdmin } from "../middlewares/auth";
import SubcategoriesController from "../controllers/subcategories";

const subcategoriesRouter = express.Router();

subcategoriesRouter.post("/", isAdmin, SubcategoriesController.add);
subcategoriesRouter.put("/:id", isAdmin, SubcategoriesController.edit);
subcategoriesRouter.delete("/:id", isAdmin, SubcategoriesController.delete);
subcategoriesRouter.get("/", SubcategoriesController.getByCategory);

export default subcategoriesRouter;
