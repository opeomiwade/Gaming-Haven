"use client";
import { motion } from "framer-motion";
import React from "react";

const StoreItemButton: React.FC<{
  children: React.ReactNode;
  className: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ children, className, onClick: clickHandler }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      className={className}
      onClick={clickHandler}
    >
      {children}
    </motion.button>
  );
};

export default StoreItemButton;
