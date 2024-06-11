"use client";
import { motion } from "framer-motion";
import React from "react";

const StoreItemButton: React.FC<{
  children: React.ReactNode;
  className: string;
}> = ({ children, className }) => {
  return (
    <motion.button whileHover={{ scale: 1.1 }} className={className}>
      {children}
    </motion.button>
  );
};

export default StoreItemButton;
