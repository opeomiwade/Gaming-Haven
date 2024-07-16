"use client";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUserActions } from "@/redux/store/redux-store";
import { getUserDetails } from "@/lib/http";
import { useRouter } from "next/navigation";
import { BsController } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { push } = useRouter();
  const [idToken, _setIdToken, removeItem] =
    useLocalStorage<string>("accessToken");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!idToken) {
      push("/login");
    } else {
      getUserDetails(idToken).then((currentUserDetails) =>
        dispatch(currentUserActions.setCurrentUser({ ...currentUserDetails }))
      );
    }
  }, []);

  return (
    <main>
      <AnimatePresence>
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ y: -200, opacity: 0 }}
          className="flex flex-col flex-grow items-center text-center"
        >
          <motion.div
            animate={{ y: [10, 0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              repeatType: "reverse",
            }}
          >
            <BsController size={500} />
          </motion.div>
          <h1 className="text-4xl font-bold">Welcome to Gaming Haven</h1>
          <p className="text-lg mt-2">
            Your ultimate marketplace for all gaming resellers and second-hand
            gaming gear.
          </p>
          <Link href={"dashboard"}>
            <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
              Go to Dashboard
            </button>
          </Link>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
