"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";

const Button = ({ disabled }: { disabled: boolean }) => {
  const pathName = usePathname();
  const { pending } = useFormStatus();
  return (
    <motion.button
      className={`rounded-lg p-4 text-black font-bold md:w-[500px] ${
        disabled ? "bg-gray-700" : "bg-white"
      }`}
      whileHover={disabled ? {} : { scale: 1.1, backgroundColor: "green" }}
      disabled={disabled}
      type="submit"
    >
      {pathName.includes("signup") && pending
        ? "Signing Up..."
        : pathName.includes("signup")
        ? "Signup"
        : pathName.includes("login") && pending
        ? "Logging In..."
        : "Log In"}
    </motion.button>
  );
};

export default Button;
