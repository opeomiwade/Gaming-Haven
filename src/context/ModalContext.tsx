"use client"
import { createContext, useState } from "react";

const ModalContext = createContext({
  open: false,
  openSellModal: () => {},
  closeSellModal: () => {},
});

export function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  const values = {
    open,
    openSellModal: openModal,
    closeSellModal: closeModal,
  };

  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
}

export default ModalContext;
