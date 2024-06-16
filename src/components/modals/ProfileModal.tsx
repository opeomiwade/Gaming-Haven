import { motion } from "framer-motion";
import classes from "@/CSS/modal.module.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserState } from "@/types/types";
import generateDataUrl from "@/utils/imageDataUrl";
import { uploadImage } from "@/utils/imageDataUrl";
import { currentUserActions } from "@/redux/store/redux-store";
import { IoIosClose } from "react-icons/io";
import supabase from "@/config/supabase";
import { defaultImageUrl } from "@/utils/imageDataUrl";

const ProfileModal: React.FC<{ open: boolean; closeModal: () => void }> = ({
  open,
  closeModal,
}) => {
  const dialogRef = useRef<HTMLDialogElement>();
  const inputRef = useRef<HTMLInputElement>();
  const dispatch = useDispatch();
  const [image, setImage] = useState<string>("");
  const currentUser = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user
  );

  async function onDone() {
    closeModal();
    const path = `/${currentUser.username}/`;
    if (image) {
      uploadImage(inputRef.current!.files![0], path, false).then((imageUrl) => {
        dispatch(currentUserActions.updateUserData({ imageUrl: imageUrl }));
      });
      const { data, error } = await supabase
        .from("users")
        .update({ image_url: currentUser.imageUrl })
        .eq("username", currentUser.username)
        .select();
      setImage("");
      inputRef.current!.value = "";
    }
  }

  async function removeHandler() {
    dispatch(currentUserActions.updateUserData({ imageUrl: defaultImageUrl }));
    const { data, error } = await supabase
      .from("users")
      .update({ image_url: defaultImageUrl })
      .eq("username", currentUser.username)
      .select();
  }

  function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    generateDataUrl(event, null, setImage);
  }

  return (
    <dialog
      ref={dialogRef as React.Ref<HTMLDialogElement>}
      className={`${classes.modal} ${open ? "flex" : ""}`}
      open={open}
    >
      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-lg text-lg dark:bg-zinc-800 bg-white p-2 w-[30%]"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-bold mx-auto text-center">
            Change Profile Photo
          </h2>
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={() => closeModal()}
          >
            <IoIosClose size={40} />
          </motion.button>
        </div>
        <hr className="my-2" />
        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={() => {
            inputRef.current!.value = "";
            inputRef.current?.click();
          }}
        >
          <img
            className="rounded-full w-[70px] h-[70px] mx-auto my-2"
            src={(image.trim().length > 0 && image) || currentUser.imageUrl}
            alt="profile picture"
          />
        </motion.button>

        <div className="flex flex-col gap-2 items-center text-md">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="font-semibold text-red-500 w-fit"
            onClick={removeHandler}
          >
            Remove Current Photo
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="font-semibold w-fit text-blue-500"
            onClick={onDone}
          >
            Done
          </motion.button>
        </div>
        <input
          hidden
          ref={inputRef as React.Ref<HTMLInputElement>}
          type="file"
          onChange={inputChangeHandler}
          accept="image/jpeg image/png image/jpg image/heic"
        />
      </motion.div>
    </dialog>
  );
};

export default ProfileModal;
