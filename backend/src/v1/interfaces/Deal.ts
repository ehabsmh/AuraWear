import { Types } from "mongoose";

export default interface IDeal {
  title: string;
  description: string;
  products: Types.ObjectId[];
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  bannerImage: string;
  isActive: boolean;
  isFeatured: boolean;
  slug: string;
  sex: "male" | "female" | "mixed";
}
