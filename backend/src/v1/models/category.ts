import { Schema, model } from "mongoose";
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
          strict: true,
          locale: "en",
        });
      },
    },
    sex: { type: String, enum: ["male", "female"], required: true },
    image: { type: String, default: null },
  },
  { timestamps: true }
);

CategorySchema.pre("deleteOne", { document: true }, async function () {
  await Subcategory.deleteMany({ categoryId: this._id });
});
const Category = model("Category", CategorySchema);

export default Category;
