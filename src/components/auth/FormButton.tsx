"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Button = () => {
  const pathName = usePathname();
  return (
    <motion.button
      className="rounded-lg bg-white p-4 text-black font-bold md:w-[500px]"
      whileHover={{ scale: 1.1, backgroundColor: "green" }}
      transition={{ type: "spring", stiffness: 500 }}
    >
      {pathName && pathName.includes("signup") ? "Signup" : "Login"}
    </motion.button>
  );
};

export default Button;
