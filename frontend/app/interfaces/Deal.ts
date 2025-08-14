export default interface IDeal {
  _id: string;
  title: string;
  description: string;
  products: string[];
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  bannerImage: string;
  isActive: boolean;
  isFeatured: boolean;
  slug: string;
  sex: "male" | "female" | "mixed";
}
