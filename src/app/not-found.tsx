"use client";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Controller from "@mui/icons-material/SportsEsports";
import useLocalStorage from "@/hooks/useLocalStorage";

const inter = Inter({ subsets: ["latin"] });

function NotFound() {
  const router = useRouter();
  const [storedValue] = useLocalStorage("accessToken");
  return (
    <main
      className={`${inter.className} flex flex-col items-center h-screen w-full dark:bg-zinc-800 bg-white text-black dark:text-white`}
    >
      <h2 className="font-bold text-5xl sticky top-4">
        <Controller style={{ fontSize: "70px" }} /> Gaming Haven
      </h2>
      <div className="flex flex-col gap-12 flex-grow items-center justify-center">
        <h3 className="text-[70px]">404 | Page Not Found</h3>
        {storedValue ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ stiffness: 500, type: "spring" }}
            onClick={() => router.back()}
            className="p-4 bg-gray-400 font-semibold hover:cursor-pointer rounded-md text-lg w-[40%]"
          >
            Go Back
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ stiffness: 500, type: "spring" }}
            className="p-4 bg-gray-400 font-semibold hover:cursor-pointer rounded-md text-lg w-[40%]"
          >
            <Link href="/login">Go Back</Link>
          </motion.button>
        )}
      </div>
    </main>
  );
}

export default NotFound;
