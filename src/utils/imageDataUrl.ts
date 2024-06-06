import { UploadedImage } from "@/types/types";
import supabase from "@/config/supabase";
import ShortUniqueId from "short-unique-id";

/**
 * uploads images to supabase storage bucket
 * @param imageFile 
 * @param username 
 * @returns 
 */
export async function uploadImage(imageFile: File, username: string) {
  const uuid = new ShortUniqueId({ length: 5 });
  const imageFileName = `/${username}/products/${uuid.rnd()}_${imageFile.name}`;
  const { data, error } = await supabase.storage
    .from("gaming-haven-images")
    .upload(imageFileName, imageFile, {
      cacheControl: "3600",
      upsert: false,
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
 */

export default async function generateDataUrl(
  event: React.ChangeEvent<HTMLInputElement>,
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>
) {
  const imageFile = event.target.files![0];
  const imageIdGen = new ShortUniqueId({ length: 5 });

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = () => {
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
    };
    reader.readAsDataURL(imageFile);
  }
}
