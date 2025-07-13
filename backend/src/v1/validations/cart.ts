import Joi from "joi";

export const createCartItemValidationSchema = Joi.object({
  productId: Joi.string().required().messages({
    "string.empty": "Product ID is required.",
    "any.required": "Product ID is required.",
  }),
  variantIndex: Joi.number().integer().min(0).required().messages({
    "number.base": "Variant index must be a number.",
    "number.min": "Variant index must be at least 0.",
    "any.required": "Variant index is required.",
  }),
  sizeIndex: Joi.number().required().messages({
    "string.empty": "Size is required.",
    "any.required": "Size is required.",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number.",
    "number.min": "Quantity must be at least 1.",
    "any.required": "Quantity is required.",
  }),
});

export const updateCartItemValidationSchema = Joi.object({
  variantIndex: Joi.number().integer().min(0).optional().messages({
    "number.base": "Variant index must be a number.",
    "number.min": "Variant index must be at least 0.",
  }),
  sizeIndex: Joi.number().integer().min(0).optional().messages({
    "number.base": "Size index must be a number.",
  }),
  quantity: Joi.number().integer().min(1).optional().messages({
    "number.base": "Quantity must be a number.",
    "number.min": "Quantity must be at least 1.",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be updated.",
  });
