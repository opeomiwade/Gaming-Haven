import { ImageFile } from "@/types/types";
import supabase from "@/config/supabase";
import ShortUniqueId from "short-unique-id";

/**
 * uploads an image to supabase storage bucket
 * @param imageFile
 * @param path
 * @returns
 */
export async function uploadImage(
  imageFile: File,
  path: string,
  appendId: boolean = true
) {
  const uuid = new ShortUniqueId({ length: 5 });
  const imageFileName = appendId
    ? `${path}${uuid.rnd()}_${imageFile.name}`
    : `${path}profile-picture`;
  const { data, error } = await supabase.storage
    .from("gaming-haven-images")
    .upload(imageFileName, imageFile, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }
  const publicUrlData = await supabase.storage
    .from("gaming-haven-images")
    .getPublicUrl(data!.path);

  return publicUrlData.data.publicUrl;
}

/**
 * uploads images to supabase storage bucket
 * @param images
 * @param path
 * @returns imageUrls - array of the urls for uploaded images
 */
export async function uploadImages(images: ImageFile[], path: string) {
  const uuid = new ShortUniqueId({ length: 5 });
  const imageUploadPromises = images.map(async (image) => {
    const imageFileName = `${path}${uuid.rnd()}_${image.imageFile.name}`;

    const { data, error } = await supabase.storage
      .from("gaming-haven-images")
      .upload(imageFileName, image.imageFile, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Error uploading images:", error.message);
      throw error; // Rethrow to handle it in the calling function
    }

    const publicUrlData = supabase.storage
      .from("gaming-haven-images")
      .getPublicUrl(data!.path);

    return publicUrlData.data.publicUrl;
  });
  try {
    const imageUrls = await Promise.all(imageUploadPromises);
    return imageUrls;
  } catch (error: any) {
    throw new Error(error);
  }
  // images.forEach(async (image) => {
  //   const imageFileName = `${path}${uuid.rnd()}_${image.imageFile.name}`;
  //   uploadImage(image.imageFile, imageFileName);

  //   const { data, error } = await supabase.storage
  //     .from("gaming-haven-images")
  //     .upload(imageFileName, image.imageFile, {
  //       cacheControl: "3600",
  //       upsert: true,
  //     });

  //   const publicUrlData =  supabase.storage
  //     .from("gaming-haven-images")
  //     .getPublicUrl(data!.path);
  //   console.log(publicUrlData.data.publicUrl)
  //   imageUrls.push(publicUrlData.data.publicUrl);
  //   console.log(imageUrls)
  //   if (error) {
  //     console.error("Error uploading images:", error.message);
  //     return null;
  //   }
  // });
  // return imageUrls;
}

/**
 * Method called when trying to upload image file from computer.
 * Reads the file content and
 * Converts image file url to a data url, so it can be displayed.
 * @param {React.ChangeEvent} event
 * @param {React.Dispatch} setImages
 * @param {React.Dispatch} setImage
 */

export default async function generateDataUrl(
  event: React.ChangeEvent<HTMLInputElement>,
  setImages: React.Dispatch<React.SetStateAction<ImageFile[]>> | null,
  setImageFile: React.Dispatch<React.SetStateAction<string>> | null
) {
  const imageFile = event.target.files![0];
  const imageIdGen = new ShortUniqueId({ length: 5 });

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = () => {
      if (setImageFile) {
        setImageFile(reader.result! as string);
      }
      if (setImages) {
        setImages((prevState: ImageFile[]) => {
          return [
            ...prevState,
            {
              id: imageIdGen.rnd(),
              dataUrl: reader.result! as string,
              imageFile,
            },
          ];
        });
      }
    };
    reader.readAsDataURL(imageFile);
  }
}

export const defaultImageUrl =
  "https://firebasestorage.googleapis.com/v0/b/instagram-clone-5b47d.appspot.com/o/account%20circle.jpeg?alt=media&token=ec3c29d8-5b89-447b-ac2e-651af9e4e394";
