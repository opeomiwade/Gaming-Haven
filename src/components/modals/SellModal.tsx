"use client";
import classes from "@/CSS/modal.module.css";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Close from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import { postItem } from "@/lib/actions";
import { UploadedImage, currentUserState } from "@/types/types";
import { useSelector, useDispatch } from "react-redux";
import generateDataUrl from "@/utils/imageDataUrl";
import { uploadImage } from "@/utils/imageDataUrl";
import useLocalStorage from "@/hooks/useLocalStorage";
import { sellModalActions } from "@/redux/store/redux-store";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/lib/http";

const SellModal = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>();
  const formRef = useRef<HTMLFormElement>();
  const dispatch = useDispatch();
  const [idToken, _setIdToken, _removeItem] =
    useLocalStorage<string>("accessToken");
  const username = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user.username
  );

  const { mutate, error, isError, isPending, isSuccess } = useMutation({
    mutationFn: postItem,
    mutationKey: ["listing", "new", username],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      inputRef.current!.value = "";
      formRef.current?.reset();
      setImages([]);
      setImageUrls([]);
      dispatch(sellModalActions.closeModal());
    },
  });

  const open = useSelector(
    (state: { sellModal: { open: boolean } }) => state.sellModal.open
  );

  function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    generateDataUrl(event, setImages, null);
    const path = `${username}/products/`;
    uploadImage(event.target.files![0], path).then((imageUrl) =>
      setImageUrls((prevImages) => [...prevImages, imageUrl!])
    );
    inputRef.current!.value = "";
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutate({ formData, accessToken: idToken! });
  }

  function removeImage(event: React.MouseEvent<HTMLDivElement>) {
    const id = event.currentTarget.id;
    setImages(() => images.filter((image) => image.id !== id));
  }

  return (
    <motion.dialog
      className={`${classes.modal} ${open ? "flex" : ""}`}
      open={open}
    >
      <form
        ref={formRef as React.Ref<HTMLFormElement>}
        onSubmit={submitHandler}
        className="dark:bg-zinc-800 dark:text-white bg-white rounded-lg h-[80%] lg:w-[60%] w-[80%] p-4 overflow-y-auto space-y-6 text-xs"
      >
        <section className="flex items-center justify-between">
          <p className="font-bold text-2xl mx-auto">Sell an item</p>
          <button
            className="font-bold"
            type="button"
            onClick={() => {
              setImages([]);
              inputRef.current!.value = "";
              formRef.current?.reset();
              dispatch(sellModalActions.closeModal());
            }}
          >
            <Close style={{ fontSize: "40px" }} />
          </button>
        </section>
        <hr className="my-2" />
        <div className="h-fit flex flex-col gap-10">
          <div className="flex items-center gap-4">
            {images.length > 0 &&
              images.map((image) => {
                return (
                  <div key={image.id} className="relative">
                    <div
                      className="absolute top-[-12px] right-[-5px] hover:cursor-pointer p-0"
                      id={image.id}
                      onClick={removeImage}
                    >
                      <CancelIcon style={{ fill: "gray", fontSize: "20px" }} />
                    </div>
                    <img src={image.dataUrl} className="h-[60px] w-[65px]" />
                  </div>
                );
              })}
            {images.length < 5 && (
              <button
                onClick={() => inputRef.current?.click()}
                type="button"
                className="flex items-center justify-center border-[1px] border-dashed p-4 hover:cursor-pointer"
              >
                <AddPhotoAlternateIcon />
              </button>
            )}
          </div>
          <section className="flex gap-2 flex-col">
            <p className="text-lg text-left font-semibold">Description</p>
            <textarea
              required
              name="description"
              rows={10}
              maxLength={1500}
              className="w-full dark:bg-zinc-800 border-[1px] border-solid p-2 text-sm rounded-md"
              placeholder="e.g this is a used ps4 that come with both dualshock 4 controller"
            />
          </section>
          <section className="flex flex-col gap-4">
            <p className="text-lg font-bold">Info</p>
            <label className="text-sm">Product Name</label>
            <input
              name="productName"
              type="text"
              required
              className="w-full dark:bg-zinc-800 focus:outline-none p-2 rounded-md border-[1px] border-solid dark:border-white"
              placeholder="i.e dulashock 4, PS4, etc"
            />
            <label className="text-sm">Category </label>
            <select
              name="productType"
              className="dark:bg-zinc-800 focus:outline-none border-[1px] border-solid p-2 rounded-md"
              defaultValue={"Console"}
              required
            >
              <option value="console">--Select a Category--</option>
              <option value="consoles">Console</option>
              <option value="controllers">Controller</option>
              <option value="headphones">Headphones</option>
              <option value="pcs">PCs</option>
              <option value="keyboards">Keyboard</option>
              <option value="mouse">Mouse</option>
            </select>
            <label className="text-sm">Condition </label>
            <select
              className="dark:bg-zinc-800 w-full focus:outline-none border-[1px] border-solid p-2 rounded-md"
              name="condition"
              required
            >
              <option value="console">--Condition--</option>
              <option value="brand new">Brand New</option>
              <option value="like new">Like New</option>
              <option value="used-good">Used - Good </option>
              <option value="used-fair">Used - Fair</option>
            </select>
            <label className="text-sm"> Manufacturer </label>
            <input
              name="manufacturer"
              type="text"
              required
              className="w-full dark:bg-zinc-800 focus:outline-none p-2 border-solid border-[1px] rounded-md"
              placeholder="i.e Sony, Microsoft, Namco, EA, etc"
            />
            <label className="text-sm"> Price: </label>
            <div className="flex items-center p-2 border-solid border-[1px] rounded-md space-x-2">
              <span className="font-bold">£</span>
              <input
                name="price"
                type="number"
                required
                className="w-[95%] dark:bg-zinc-800 focus:outline-none"
                placeholder="Enter price of the item"
              />
            </div>
          </section>
        </div>
        {isError && error && (
          <p className="text-red-500 text-center text-lg">
            An error occured. Please try again
          </p>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ stiffness: 500, type: "spring" }}
          type="submit"
          className="text-sm dark:bg-black bg-gray-300 dark:text-white rounded-lg font-bold p-2 w-[50%] focus:outline-none hover:cursor-pointer hover:bg-gray-500"
        >
          {isPending ? "Posting....." : "Post"}
        </motion.button>
        <input
          type="file"
          hidden
          ref={inputRef as React.Ref<HTMLInputElement>}
          onChange={inputChangeHandler}
          accept="image/jpeg image/png image/jpg image/heic"
        />
        <input
          readOnly
          hidden
          value={JSON.stringify(imageUrls)}
          name={`images`}
        />
      </form>
    </motion.dialog>
  );
};

export default SellModal;
