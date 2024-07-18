"use client";
import { motion } from "framer-motion";
import React from "react";

const MotionButton: React.FC<{
  children: React.ReactNode;
  whileHover?: Object;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, whileHover, className, onClick }) => {
  return (
    <motion.button
      whileHover={whileHover}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default MotionButton;
