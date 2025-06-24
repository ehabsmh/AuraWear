import express, { NextFunction } from "express";
import CategoriesController from "../controllers/categories";
import upload from "./../service/multer.config";
import { MulterError } from "multer";
import AppError, { ErrorName } from "../service/error";
import { auth, isAdmin } from "../middlewares/auth";

const categoriesRouter = express.Router();
const result = upload.single("image");

categoriesRouter.post(
  "/",
  auth,
  isAdmin,
  function (req, res, next: NextFunction) {
    result(req, res, function (err) {
      if (err instanceof MulterError && err.code === "LIMIT_FILE_SIZE") {
        next(
          new AppError(
            "Image size exceeds the limit of 3MB.",
            ErrorName.ValidationError
          )
        );
      }

      next();
      // Everything went fine.
    });
  },
  CategoriesController.add
);
categoriesRouter.put(
  "/:id",
  auth,
  isAdmin,
  function (req, res, next: NextFunction) {
    result(req, res, function (err) {
      if (err instanceof MulterError && err.code === "LIMIT_FILE_SIZE") {
        next(
          new AppError(
            "Image size exceeds the limit of 3MB.",
            ErrorName.ValidationError
          )
        );
      }

      next();
      // Everything went fine.
    });
  },
  CategoriesController.edit
);
categoriesRouter.delete("/:id", auth, isAdmin, CategoriesController.delete);
categoriesRouter.get("/", auth, CategoriesController.bySex);

export default categoriesRouter;
