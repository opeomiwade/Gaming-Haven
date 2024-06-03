"use client";
import classes from "@/CSS/modal.module.css";
import { motion } from "framer-motion";

function SellModal() {
  return (
    <motion.dialog className={`${classes.modal} ${false ? "flex" : ""}`} >
      <div className="bg-zinc-800 rounded-lg h-[80%] w-[50%] p-4">
        <h1></h1>
        <hr className="my-6" />
      </div>
    </motion.dialog>
  );
}

export default SellModal;
