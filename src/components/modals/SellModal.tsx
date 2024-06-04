"use client";
import classes from "@/CSS/modal.module.css";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Close from "@mui/icons-material/Close";
import generateDataUrl from "@/utils/imageDataUrl";
import CancelIcon from "@mui/icons-material/Cancel";
import { postItem } from "@/lib/actions";

const SellModal: React.FC<{ open: boolean; closeModal: () => void }> = ({
  open,
  closeModal,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>();
  const formRef = useRef<HTMLFormElement>();

  function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    generateDataUrl(event, setImages);
    inputRef.current!.value = "";
  }
  function removeImage(event: React.MouseEvent<HTMLDivElement>) {
    const imageUrl = event.currentTarget.id;
    setImages(() => images.filter((image) => image !== imageUrl));
  }

  return (
    <motion.dialog
      className={`${classes.modal} ${open ? "flex" : ""}`}
      open={open}
    >
      <form
        ref={formRef as React.Ref<HTMLFormElement>}
        className="dark:bg-zinc-800 dark:text-white bg-white rounded-lg h-[80%] lg:w-[60%] w-[80%] p-4 overflow-y-auto space-y-6 text-xs"
        action={postItem}
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
              closeModal();
            }}
          >
            <Close style={{ fontSize: "40px" }} />
          </button>
        </section>
        <hr className="my-2" />
        <div className="h-fit flex flex-col gap-10">
          <div className="flex items-center gap-4">
            {images.length > 0 &&
              images.map((image, index) => {
                return (
                  <div key={image} className="relative">
                    <div
                      className="absolute top-[-12px] right-[-5px] hover:cursor-pointer p-0"
                      id={image}
                      onClick={removeImage}
                    >
                      <CancelIcon style={{ fill: "gray", fontSize: "20px" }} />
                    </div>
                    <img src={image} className="h-[60px] w-[65px]" />
                    <input
                      hidden
                      value={image}
                      id={image}
                      name={`image-${index}`}
                    />
                  </div>
                );
              })}
            <button
              onClick={() => inputRef.current?.click()}
              type="button"
              className="flex items-center justify-center border-[1px] border-dashed p-4 hover:cursor-pointer"
            >
              <AddPhotoAlternateIcon />
            </button>
          </div>
          <section className="flex gap-2 flex-col">
            <p className="text-lg text-left font-semibold">Description</p>
            <textarea
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
              name="product_name"
              type="text"
              required
              className="w-full dark:bg-zinc-800 focus:outline-none p-2 rounded-md border-[1px] border-solid dark:border-white"
              placeholder="i.e dulashock 4, PS4, etc"
            />
            <label className="text-sm">Category </label>
            <select
              name="product_type"
              className="dark:bg-zinc-800 focus:outline-none border-[1px] border-solid p-2 rounded-md"
              defaultValue={"Console"}
              required
            >
              <option value="">--Select a Category--</option>
              <option value="console">Console</option>
              <option value="controller">Controller</option>
              <option value="headphones">Headphones</option>
              <option value="pcs">PCs</option>
              <option value="games">Games</option>
              <option value="keyboard">Keyboard</option>
              <option value="mouse">Mouse</option>
            </select>
            <label className="text-sm">Condition </label>
            <select
              className="dark:bg-zinc-800 w-full focus:outline-none border-[1px] border-solid p-2 rounded-md"
              defaultValue={"Console"}
              name="condition"
              required
            >
              <option value="">--Condition--</option>
              <option value="console">Brand New</option>
              <option value="controller">Like New</option>
              <option value="headphones">Used - Good </option>
              <option value="pcs">Used - Fair</option>
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
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ stiffness: 500, type: "spring" }}
          type="submit"
          onClick={() => formRef.current?.reset()}
          className="text-sm dark:bg-black bg-gray-300 dark:text-white rounded-lg font-bold p-2 w-[50%] focus:outline-none hover:cursor-pointer hover:bg-gray-500"
        >
          Post
        </motion.button>
        <input
          type="file"
          hidden
          ref={inputRef as React.Ref<HTMLInputElement>}
          onChange={inputChangeHandler}
          accept="image/jpeg image/png image/jpg image/heic"
        />
      </form>
    </motion.dialog>
  );
};

export default SellModal;
