import { Schema, model, Types } from "mongoose";
import slugify from "slugify";
import IDeal from "../interfaces/Deal";

const dealSchema = new Schema<IDeal>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    products: [
      {
        type: Types.ObjectId,
        ref: "Product",
        default: [],
      },
    ],
    discountPercentage: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now(),
    },
    endDate: {
      type: Date,
    },
    bannerImage: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
      default() {
        return slugify(this.title, {
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
    sex: {
      type: String,
      enum: ["male", "female", "mixed"],
      required: true,
    },
  },
  { timestamps: true }
);

const Deal = model("Deal", dealSchema);

export default Deal;
