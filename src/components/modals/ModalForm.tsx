import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { currentUserState, Listing, ImageFile } from "@/types/types";
import { useForm, FieldValues, Controller } from "react-hook-form";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Close from "@mui/icons-material/Close";
import Select from "react-select";
import { sellModalActions } from "@/redux/store/redux-store";
import CancelIcon from "@mui/icons-material/Cancel";
import { uploadImages } from "@/utils/imageDataUrl";
import generateDataUrl from "@/utils/imageDataUrl";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import queryClient from "@/lib/http";
import { usePathname } from "next/navigation";
import { getListing } from "@/lib/actions";
import { SingleValue } from "react-select";
import { CircularProgress } from "@mui/material";

interface ModalFormProps {
  formTitle: string;
  error: Error | null | undefined;
  isPending: boolean;
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setImageFiles: React.Dispatch<React.SetStateAction<ImageFile[]>>;
  imageFiles: ImageFile[];
  imageUrls: string[];
  submitHandler: (formData: FieldValues) => {};
  closeModal?: () => void;
}

const ModalForm = forwardRef<HTMLFormElement, ModalFormProps>(
  (
    {
      formTitle,
      error,
      isPending,
      setImageFiles,
      setImageUrls,
      imageFiles,
      imageUrls,
      submitHandler,
      closeModal,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>();
    const [submitAttempted, setSubmitAttempted] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [deleteImages, setDeleteImages] = useState<number[]>([]);
    const username = useSelector(
      (state: { currentUser: { user: currentUserState } }) =>
        state.currentUser.user.username
    );
    const [condition, setCondition] =
      useState<SingleValue<{ value: string | undefined; label: any }>>();
    const [category, setCategory] =
      useState<SingleValue<{ value: string | undefined; label: any }>>();
    const [defaultValues, setDefaults] = useState<Listing>();
    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      reset,
    } = useForm();
    const path = usePathname();
    const editForm = formTitle === "Edit Listing";

    useEffect(() => {
      if (editForm) {
        const listingId = path.split("/")[2];
        queryClient
          .fetchQuery<Listing>({
            queryKey: ["listings", { listingId }],
            queryFn: () => getListing(parseInt(listingId)),
            staleTime: 3000,
          })
          .then((listingDetails) => {
            setDefaults(listingDetails);
            let formDefaults = {
              productName: listingDetails.listedProduct.productName,
              description: listingDetails.description,
              price: listingDetails.price,
              manufacturer: listingDetails.listedProduct.manufacturer,
              condition: {
                value: listingDetails.condition.toLowerCase(),
                label: listingDetails.condition,
              },
              categoryName: {
                value: listingDetails.listedProduct.category.name.toLowerCase(),
                label: listingDetails.listedProduct.category.name,
              },
            };
            reset({ ...formDefaults });
          });
      }
    }, [editForm, path, reset]);

    function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
      generateDataUrl(event, setImageFiles, null);
      if (inputRef.current) {
        inputRef.current!.value = "";
      }
    }

    async function onSubmit(formData: FieldValues) {
      const path = `${username}/products/`;
      formData = {
        ...formData,
        condition: formData.condition.label,
        categoryName: formData.categoryName.label,
        deleteImages,
      };

      // if there are images to upload
      if (imageFiles.length > 0) {
        const imageUrls = await uploadImages(imageFiles, path);

        // if an edit form, remember prev uploaded images
        if (editForm) {
          formData = {
            ...formData,
            imageUrls: JSON.stringify([...imageUrls]),
          };
          console.log(formData);
        } else {
          formData = {
            ...formData,
            imageUrls: JSON.stringify(imageUrls),
          };
        }
      }
      console.log(formData)
      submitHandler(formData);
    }

    function removeImage(event: React.MouseEvent<HTMLDivElement>) {
      const id = event.currentTarget.id;
      setImageFiles(() =>
        imageFiles.filter((imageFile) => imageFile.id !== id)
      );
    }

    function removeExistingListingImage(event: React.MouseEvent) {
      const id = parseInt(event.currentTarget.id);
      setDeleteImages((prev) => [...prev, id]);
      setDefaults((prevDefaults) => {
        return {
          ...prevDefaults!,
          images: defaultValues!.images.filter((image) => image.imageId !== id),
        };
      });
    }

    return defaultValues ? (
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className="dark:bg-zinc-800 dark:text-white bg-white rounded-lg h-[80%] lg:w-[60%] w-[80%] p-4 overflow-y-auto space-y-6 text-xs"
      >
        <section className="flex items-center justify-between">
          <p className="font-bold text-2xl mx-auto">{formTitle}</p>
          <button
            className="font-bold"
            type="button"
            onClick={() => {
              setImageUrls([]);
              setImageFiles([]);
              setSubmitAttempted(false);
              setCondition(null);
              setCategory(null);
              inputRef.current!.value = "";
              if (typeof ref === "function") return;
              ref!.current!.reset();
              closeModal
                ? closeModal()
                : dispatch(sellModalActions.closeModal());
            }}
          >
            <Close style={{ fontSize: "40px" }} />
          </button>
        </section>
        <hr className="my-2" />
        <div className="h-fit flex flex-col gap-10">
          <div className="flex items-center gap-4">
            {defaultValues?.images.map((image) => {
              return (
                <div key={image.imageId} className="relative">
                  <div
                    className="absolute top-[-12px] right-[-5px] hover:cursor-pointer p-0"
                    id={image.imageId.toString()}
                    onClick={removeExistingListingImage}
                  >
                    <CancelIcon style={{ fill: "gray", fontSize: "20px" }} />
                  </div>
                  <img src={image.imageUrl} className="h-[60px] w-[65px]" />
                </div>
              );
            })}
            {imageFiles.length > 0 &&
              imageFiles.map((imageFile) => {
                return (
                  <div key={imageFile.id} className="relative">
                    <div
                      className="absolute top-[-12px] right-[-5px] hover:cursor-pointer p-0"
                      id={imageFile.id}
                      onClick={removeImage}
                    >
                      <CancelIcon style={{ fill: "gray", fontSize: "20px" }} />
                    </div>
                    <img
                      src={imageFile.dataUrl}
                      className="h-[60px] w-[65px]"
                    />
                  </div>
                );
              })}

            {imageFiles.length < 5 && (
              <button
                onClick={() => inputRef.current?.click()}
                type="button"
                className="flex items-center justify-center border-[1px] border-dashed p-4 hover:cursor-pointer"
              >
                <AddPhotoAlternateIcon />
              </button>
            )}
          </div>
          {submitAttempted && imageUrls.length < 1 && (
            <p className="text-red-500 text-xs">
              Please upload pictures of item
            </p>
          )}

          <section className="flex gap-2 flex-col">
            <p className="text-lg text-left font-semibold">Description</p>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={10}
              maxLength={1500}
              className="w-full dark:bg-zinc-800 border-[1px] border-solid p-2 text-sm rounded-md focus:outline-none"
              placeholder="e.g this is a used ps4 that come with both dualshock 4 controller"
              defaultValue={defaultValues?.description ?? ""}
            />
            {errors.description?.message && (
              <p className="text-red-500 text-xs">
                {errors.description.message as string}
              </p>
            )}
          </section>
          <section className="flex flex-col gap-4">
            <p className="text-lg font-bold">Info</p>
            <label className="text-sm">Product Name</label>
            <input
              type="text"
              className="w-full dark:bg-zinc-800 focus:outline-none p-2 rounded-md border-[1px] border-solid dark:border-white"
              placeholder="i.e dualshock 4, PS4, etc"
              {...register("productName", {
                required: "Product name is required",
              })}
              defaultValue={defaultValues?.listedProduct.productName ?? ""}
            />
            {errors.productName?.message && (
              <p className="text-red-500 text-xs">
                {errors.productName.message as string}
              </p>
            )}
            <label className="text-sm">Category </label>
            <Controller
              control={control}
              {...register("categoryName", {
                required: "Category is required",
                onChange: (e) => setCategory(e),
                value: category ?? {
                  value: defaultValues?.listedProduct.category.name,
                  label: defaultValues?.listedProduct.category.name,
                },
              })}
              render={({ field }) => {
                const { ref, ...fieldWithoutRef } = field; // Destructure `ref` out and keep the rest in `fieldWithoutRef`
                return (
                  <Select
                    {...fieldWithoutRef}
                    options={[
                      { value: "Consoles", label: "Consoles" },
                      { value: "Controllers", label: "Controllers" },
                      { value: "Headphones", label: "Headphones" },
                      { value: "PCs", label: "PCs" },
                      { value: "Keyboards", label: "Keyboards" },
                      { value: "Mouses", label: "Mouses" },
                    ]}
                  />
                );
              }}
            />
            {errors.categoryName?.message && (
              <p className="text-red-500 text-xs">
                {errors.categoryName.message as string}
              </p>
            )}
            <label className="text-sm">Condition </label>
            <Controller
              control={control}
              {...register("condition", {
                required: "Condition is required",
                onChange: (e) => setCondition(e),
                value:
                  condition ?? {
                    value: defaultValues?.condition,
                    label: defaultValues?.condition,
                  } ??
                  "",
              })}
              render={({ field }) => {
                const { ref, ...fieldWithoutRef } = field; // Destructure `ref` out and keep the rest in `fieldWithoutRef`
                return (
                  <Select
                    {...fieldWithoutRef}
                    options={[
                      { value: "brand new", label: "Brand New" },
                      { value: "like new", label: "Like New" },
                      { value: "used fair", label: "Used Fair" },
                      { value: "used good", label: "Used Good" },
                    ]}
                  />
                );
              }}
            />
            {errors.condition?.message && (
              <p className="text-red-500 text-xs">
                {errors.condition.message as string}
              </p>
            )}
            <label className="text-sm"> Manufacturer </label>
            <input
              type="text"
              className="w-full dark:bg-zinc-800 focus:outline-none p-2 border-solid border-[1px] rounded-md"
              placeholder="i.e Sony, Microsoft, Namco, EA, etc"
              {...register("manufacturer", {
                required: "Manufacturer is required",
              })}
              defaultValue={defaultValues?.listedProduct.manufacturer ?? ""}
            />
            {errors.manufacturer?.message && (
              <p className="text-red-500 text-xs">
                {errors.manufacturer.message as string}
              </p>
            )}
            <label className="text-sm"> Price: </label>
            <div className="flex items-center p-2 border-solid border-[1px] rounded-md space-x-2">
              <span className="font-bold">£</span>
              <input
                type="number"
                className="w-[95%] dark:bg-zinc-800 focus:outline-none"
                placeholder="Enter price of the item"
                {...register("price", { required: "Price is required" })}
                defaultValue={defaultValues?.price ?? ""}
              />
            </div>
            {errors.price?.message && (
              <p className="text-red-500 text-xs">
                {errors.price.message as string}
              </p>
            )}
          </section>
        </div>
        {error && (
          <p className="text-red-500 text-center text-lg">{error.message}</p>
        )}
        {editForm ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ stiffness: 500, type: "spring" }}
            type="submit"
            className="text-sm dark:bg-black bg-gray-300 dark:text-white rounded-lg font-bold p-2 w-[50%] focus:outline-none hover:cursor-pointer hover:bg-gray-500"
          >
            {isPending ? "Updating....." : "Update"}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ stiffness: 500, type: "spring" }}
            onClick={() => setSubmitAttempted(true)}
            type="submit"
            className="text-sm dark:bg-black bg-gray-300 dark:text-white rounded-lg font-bold p-2 w-[50%] focus:outline-none hover:cursor-pointer hover:bg-gray-500"
          >
            {isPending ? "Posting....." : "Post"}
          </motion.button>
        )}

        {/* image file input element */}
        <input
          type="file"
          hidden
          ref={inputRef as React.Ref<HTMLInputElement>}
          onChange={inputChangeHandler}
          accept="image/jpeg image/png image/jpg image/heic"
        />
      </form>
    ) : (
      <CircularProgress />
    );
  }
);

ModalForm.displayName = "ModalForm"; // Add displayName property here

export default ModalForm;
