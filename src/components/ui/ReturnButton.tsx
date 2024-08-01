"use client"
import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

function ReturnButton() {
  const router = useRouter();
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      className="flex items-center text-sm text-md w-fit text-green-500"
      onClick={() => router.back()}
    >
      <IoIosArrowRoundBack size={30} />
      Return
    </motion.button>
  );
}

export default ReturnButton;
