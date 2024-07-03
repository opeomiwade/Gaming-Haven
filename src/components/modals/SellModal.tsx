"use client";
import classes from "@/CSS/modal.module.css";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import { postItem } from "@/lib/actions";
import { ImageFile, currentUserState } from "@/types/types";
import { useSelector, useDispatch } from "react-redux";
import useLocalStorage from "@/hooks/useLocalStorage";
import { sellModalActions } from "@/redux/store/redux-store";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/lib/http";
import { FieldValues } from "react-hook-form";
import ModalForm from "./ModalForm";
import NoSSRWrapper from "../client-wrappers/NoSSRWrapper";

const SellModal = () => {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>();
  const dispatch = useDispatch();
  const [idToken, _setIdToken, _removeItem] =
    useLocalStorage<string>("accessToken");

  const username = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user.username
  );

  const { mutate, error, isPending } = useMutation({
    mutationFn: postItem,
    mutationKey: ["listing", "new", username],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      formRef.current?.reset();
      setImageFiles([]);
      setImageUrls([]);
      dispatch(sellModalActions.closeModal());
    },
  });

  const open = useSelector(
    (state: { sellModal: { open: boolean } }) => state.sellModal.open
  );

  async function submitHandler(listingDetails: FieldValues) {
    console.log(listingDetails)
    mutate({ listingDetails, accessToken: idToken! });
  }

  return (
    <NoSSRWrapper>
      <motion.dialog
        className={`${classes.modal} ${open ? "flex" : ""}`}
        open={open}
      >
        <ModalForm
          isPending={isPending}
          error={error}
          formTitle="Sell Item"
          setImageUrls={setImageUrls}
          setImageFiles={setImageFiles}
          imageUrls={imageUrls}
          imageFiles={imageFiles}
          submitHandler={submitHandler}
          ref={formRef as React.MutableRefObject<HTMLFormElement>}
        />
      </motion.dialog>
    </NoSSRWrapper>
  );
};

export default SellModal;
