export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  sex: "male" | "female";
}
