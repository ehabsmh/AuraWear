import { Schema, model } from "mongoose";
import { NextFunction } from "express";
import slugify from "slugify";
import Subcategory from "./subcategory";

interface ICategory {
  name: string;
  slug: string;
  image?: string;
  sex: "male" | "female";
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      default() {
        return slugify(this.name, {
          lower: true,
          strict: true, // Remove special characters
          locale: "en", // Use English locale for slug generation
        });
      },
    },
    sex: { type: String, enum: ["male", "female"], required: true },
    image: { type: String, default: null },
  },
  { timestamps: true }
);

// CategorySchema.post

CategorySchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next: NextFunction) {
    try {
      await Subcategory.deleteMany({ categoryId: this._id });
      next();
    } catch (e) {
      next(e);
    }
  }
);

const Category = model("Category", CategorySchema);

export default Category;
