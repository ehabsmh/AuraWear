import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import AppError, { ErrorName } from "./error";
import { IProduct } from "../interfaces/product";

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  analytics: false,
});

export const uploadStream = async (file: any, folderName: string) => {
  const result: any = await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new AppError("Upload timeout", ErrorName.ValidationError)),
      60000
    ); // 60 sec timeout
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `aura-wear/${folderName}`,
        use_filename: true,
        overwrite: true,
      },
      (error, result) => {
        clearTimeout(timeout);
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });

  const publicId = result.public_id;

  const url = cloudinary.url(publicId, {
    secure: true,
    transformation: [
      { quality: "auto", fetch_format: "auto" },
      { crop: "fill", gravity: "auto" },
    ],
  });

  return url;
};

export async function deleteImages(product: IProduct) {
  if (!product || !product.variants) {
    throw new AppError(
      "Product or variants not found",
      ErrorName.NotFoundError
    );
  }

  if (product.variants.length === 0) {
    throw new AppError(
      "No variants found in the product",
      ErrorName.NotFoundError
    );
  }

  const imagesId = product.variants
    .map((variant) => variant.images)
    .flat()
    .map((image) => image.split("/").slice(-3).join("/"))
    .filter((image) => image !== undefined);

  try {
    cloudinary.api.delete_resources(imagesId);
  } catch (err) {
    throw new AppError("Failed to delete images", ErrorName.BadRequestError);
  }
}

export default cloudinary;
