"use client";
import classes from "@/CSS/modal.module.css";
import { motion } from "framer-motion";

function SellModal() {
  return (
    <motion.dialog className={classes.modal}>
      <div className="bg-zinc-800 rounded-full"></div>
    </motion.dialog>
  );
}

export default SellModal;
