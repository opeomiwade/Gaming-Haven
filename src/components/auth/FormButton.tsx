"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Button = ({ pending }: { pending: boolean }) => {
  const pathName = usePathname();
  return (
    <motion.button
      className="rounded-lg bg-white p-4 text-black font-bold md:w-[500px]"
      whileHover={{ scale: 1.1, backgroundColor: "green" }}
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
