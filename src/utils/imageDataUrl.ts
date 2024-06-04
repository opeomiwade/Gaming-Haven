/**
 * Method called when trying to upload image file from computer.
 * Reads the file content and
 * Converts image file url to a data url, so it can be displayed.
 * @param {React.ChangeEvent} event
 * @param {React.Dispatch} setUrl
 */
export default function generateDataUrl(
  event: React.ChangeEvent<HTMLInputElement>,
  setImages: React.Dispatch<React.SetStateAction<string[]>>
) {
  const imageFile = event.target.files![0];
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = () => {
      setImages((prevState: string[]) => {
        return [...prevState, reader.result! as string];
      });
    };
    reader.readAsDataURL(imageFile);
  }
}
