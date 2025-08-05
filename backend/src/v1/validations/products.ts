import Joi from "joi";
import { Types } from "mongoose";

export const sizeSchema = Joi.object({
  size: Joi.string().valid("XS", "S", "M", "L", "XL", "XXL", "Free").required(),
  stock: Joi.number().integer().min(0).required(),
  code: Joi.string().trim().required(),
});

export const variantSchema = Joi.object({
  color: Joi.string().trim().required(),
  colorCode: Joi.string().trim().required(),
  sizes: Joi.array().items(sizeSchema).min(1).required(),
  images: Joi.array().items(Joi.string().uri()).max(4),
  // mainImage: Joi.string().uri().required(),
});

export const createProductSchema = Joi.object({
  name: Joi.string().trim().required(),
  shortDescription: Joi.string().trim().max(200),
  longDescription: Joi.string().trim().max(1000),
  sex: Joi.string().valid("male", "female").required(),
  price: Joi.number().min(0).required(),
  discountPrice: Joi.number()
    .min(0)
    .optional()
    .custom((value, helpers) => {
      const { price } = helpers.state.ancestors[0];
      if (price && value > price) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.invalid": "Discount price must be less than or equal to price",
    }),
  categoryId: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required()
    .messages({ "any.invalid": "Invalid categoryId" }),
  subcategoryId: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required()
    .messages({ "any.invalid": "Invalid subcategoryId" }),
  variants: Joi.array().items(variantSchema).min(1).required(),
});
