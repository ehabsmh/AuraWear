import { Schema, Types, model } from "mongoose";
import slugify from "slugify";

interface ISubcategory {
  categoryId: Schema.Types.ObjectId;
  name: string;
  slug: string;
}

export const SubcategorySchema = new Schema<ISubcategory>(
  {
    categoryId: { type: Types.ObjectId, required: true, ref: "Category" },
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
  },
  { timestamps: true }
);

const Subcategory = model("Subcategory", SubcategorySchema);
export default Subcategory;
