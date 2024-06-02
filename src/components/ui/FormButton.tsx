"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Button = ({
  pending,
  disabled,
}: {
  pending: boolean;
  disabled: boolean;
}) => {
  const pathName = usePathname();
  return (
    <motion.button
      className={`rounded-lg p-4 text-black font-bold md:w-[500px] ${
        disabled ? "bg-gray-700" : "bg-white"
      }`}
      whileHover={disabled ? {} : { scale: 1.1, backgroundColor: "green" }}
      disabled={disabled}
      type="submit"
    >
      {pathName && pathName.includes("signup")
        ? pending
          ? "Signing Up..."
          : "Signup"
        : pending
        ? "Loging In ...."
        : "Log In"}
    </motion.button>
  );
};

export default Button;
