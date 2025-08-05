import Joi from "joi";

const userValidationSchema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(6).max(30).required(),
  confirmPassword: Joi.ref("password"),
  birthDate: Joi.date().min("1-1-1930").max("now"),
  city: Joi.string().min(3).max(30),
  address: Joi.string().min(3).max(100),
  postalCode: Joi.string().min(3).max(6),
  phone: Joi.string()
    .pattern(/^01[0125]\d{8}$/)

    .messages({
      "string.pattern.base": "Invalid phone number",
    }),
});

export default userValidationSchema;
