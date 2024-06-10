"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();
  return (
    <section className="flex flex-col h-screen items-center justify-center w-full gap-2">
      <h2 className="text-2xl font-semibold">404 | Listing was not found</h2>
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ stiffness: 500, type: "spring" }}
        onClick={() => router.back()}
        className="p-2 bg-gray-400 font-semibold hover:cursor-pointer rounded-md text-lg"
      >
        Go Back
      </motion.button>
    </section>
  );
}

export default NotFound;
