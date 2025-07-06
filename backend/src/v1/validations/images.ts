import { NextFunction, Request, Response } from "express";
import { result } from "../views/categories";
import { MulterError } from "multer";
import AppError, { ErrorName } from "../service/error";

export function imageSizeValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
}
