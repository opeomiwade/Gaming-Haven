"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ModalForm from "./ModalForm";
import { ImageFile } from "@/types/types";
import queryClient from "@/lib/http";
import { editListing } from "@/lib/actions";
import classes from "@/CSS/modal.module.css";
import { FieldValues } from "react-hook-form";
import { usePathname } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

const EditListingModal: React.FC<{
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const [mounted, setMounted] = useState(false);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>();
  const path = usePathname();
  const [storedValue] = useLocalStorage<string>("accessToken");
  const listingId = path.split("/")[2];

  useEffect(() => {
    setMounted(true);
  }, []);

  const { mutate, error, isPending } = useMutation({
    mutationFn: editListing,
    mutationKey: ["listing", "edit", listingId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      formRef.current?.reset();
      setImageFiles([]);
      setImageUrls([]);
      closeModal();
    },
  });

  async function submitHandler(updatedListingDetails: FieldValues) {
    mutate({
      id: parseInt(listingId),
      updatedListingDetails,
      accessToken: storedValue!,
    });
  }

  function closeModal() {
    if (setOpen) {
      setOpen(false);
    }
  }

  if (!mounted) {
    return null; // Render nothing on the server
  }

  const portalElement = document.getElementById("edit-listing");
  if (!portalElement) {
    return null; // If the target element doesn't exist, render nothing
  }

  return createPortal(
    <motion.dialog className={`${classes.modal} flex`} open>
      <ModalForm
        formTitle="Edit Listing"
        setImageUrls={setImageUrls}
        setImageFiles={setImageFiles}
        imageUrls={imageUrls}
        imageFiles={imageFiles}
        isPending={isPending}
        error={error}
        ref={formRef as React.RefObject<HTMLFormElement>}
        submitHandler={submitHandler}
        closeModal={closeModal}
      />
    </motion.dialog>,
    portalElement
  );
};

export default EditListingModal;
