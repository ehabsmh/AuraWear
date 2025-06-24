// Require the cloudinary library
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import AppError, { ErrorName } from "./error";

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  analytics: false,
});

// export const uploadImage = async (imgPath: string, folderName: string) => {
//   const options = {
//     use_filename: true,
//     overwrite: true,
//     folder: `aura-wear/${folderName}`,
//   };

//   try {
//     // Upload the image
//     const result = await cloudinary.uploader.upload(imgPath, options);
//     const url = cloudinary.url(result.public_id, {
//       transformation: [
//         { quality: "auto", fetch_format: "auto" },
//         { crop: "fill", gravity: "auto" },
//       ],
//     });

//     console.log(url);
//     return url;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const uploadStream = async (file: any, folderName: string) => {
  const result: any = await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new AppError("Upload timeout", ErrorName.ValidationError)),
      15000
    ); // 15 sec
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

export default cloudinary;
