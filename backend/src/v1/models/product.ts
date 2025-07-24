// models/product.ts
import mongoose, { Schema, model, Types } from "mongoose";
import { IProduct, ISize, IVariant } from "../interfaces/product";
import slugify from "slugify";

// ----------- Subdocuments Schemas -----------

const SizeSchema = new Schema<ISize>(
  {
    size: String,
    stock: Number,
    code: String,
  },
  { _id: false }
);

const VariantSchema = new Schema<IVariant>(
  {
    color: String,
    sizes: [SizeSchema],
    images: [String],
    mainImage: String,
  },
  { _id: false }
);

// ----------- Main Product Schema -----------

const ProductSchema = new Schema<IProduct>(
  {
    name: String,
    slug: {
      type: String,
      unique: true,
      default() {
        return slugify(this.name, {
          lower: true,
          strict: true, // Remove special characters
          locale: "en", // Use English locale for slug generation
        });
      },
      set: (value: string) => {
        return slugify(value, {
          lower: true,
          strict: true,
          locale: "en",
        });
      },
    },
    shortDescription: String,
    longDescription: String,
    sex: { type: String },
    price: Number,
    discountPrice: Number,
    categoryId: { type: Types.ObjectId, ref: "Category" },
    subcategoryId: { type: Types.ObjectId, ref: "Subcategory" },
    mainImage: String,
    variants: [VariantSchema],
    sold: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// -------------------- Export --------------------
const Product = model<IProduct>("Product", ProductSchema);
export default Product;
