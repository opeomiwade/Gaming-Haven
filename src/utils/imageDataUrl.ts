import { UploadedImage } from "@/types/types";
import supabase from "@/config/supabase";
import ShortUniqueId from "short-unique-id";

/**
 * uploads images to supabase storage bucket
 * @param imageFile
 * @param username
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
 * Method called when trying to upload image file from computer.
 * Reads the file content and
 * Converts image file url to a data url, so it can be displayed.
 * @param {React.ChangeEvent} event
 * @param {React.Dispatch} setImages
 * @param {React.Dispatch} setImage
 */

export default async function generateDataUrl(
  event: React.ChangeEvent<HTMLInputElement>,
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>> | null,
  setImage: React.Dispatch<React.SetStateAction<string>> | null
) {
  const imageFile = event.target.files![0];
  const imageIdGen = new ShortUniqueId({ length: 5 });

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = () => {
      if (setImage) {
        setImage(reader.result! as string);
      }
      if (setImages) {
        setImages((prevState: UploadedImage[]) => {
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
