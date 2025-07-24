import { IProduct } from "../interfaces/product";
import { uploadStream } from "./cloudinary-handling";
import AppError, { ErrorName } from "./error";

export async function addImagesToProduct(
  product: IProduct,
  images: Express.Multer.File[]
): Promise<void> {
  if (!images || images.length === 0) {
    throw new AppError("No images provided", ErrorName.BadRequestError);
  }

  const uploadPromises = images.map(async (image) => {
    if (image.fieldname === "mainImage") {
      const url = await uploadStream(image, "products");
      product.mainImage = url;
    } else {
      const [variantIndex, propName] = image.fieldname.split(".").slice(1);
      const variantIndexNum = Number(variantIndex);

      if (!product.variants[variantIndexNum]) {
        throw new AppError(
          `Variant at index ${variantIndexNum} does not exist`,
          ErrorName.BadRequestError
        );
      }

      if (!product.variants[variantIndexNum].images) {
        product.variants[variantIndexNum].images = [];
      }

      const url = await uploadStream(image, "products");
      product.variants[variantIndexNum].images.push(url);
    }
  });

  await Promise.all(uploadPromises); // ⏱️ Upload all in parallel
}
