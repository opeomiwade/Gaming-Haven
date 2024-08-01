"use client";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSwap } from "react-icons/io";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { currentUserState, Listing } from "@/types/types";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/lib/http";
import { useDispatch } from "react-redux";
import { currentUserActions } from "@/redux/store/redux-store";
import useLocalStorage from "@/hooks/useLocalStorage";
import ThemeToggle from "./ThemeToggle";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ProfileModal from "../modals/ProfileModal";
import { defaultImageUrl } from "@/utils/imageDataUrl";
import { sellModalActions } from "@/redux/store/redux-store";
import { useAnimate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

function MainHeader() {
  const dispatch = useDispatch();
  const [idToken, _setIdToken, _removeItem] =
    useLocalStorage<string>("accessToken");
  const [mediumScreen, setMediumScreen] = useState<boolean>();
  const [open, setOpen] = useState<boolean>(false);
  const [scope, animate] = useAnimate();
  const [isInitialMount, setIsInitialMount] = useState<boolean>(true); // Flag to check if it's the initial mount

  const currentUser = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user
  );

  const cart = useSelector(
    (state: { cart: { items: Listing[] } }) => state.cart.items
  );

  useEffect(() => {
    getUserDetails(idToken!).then((currentUserDetails) =>
      dispatch(currentUserActions.setCurrentUser({ ...currentUserDetails }))
    );

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width < 768) {
          setMediumScreen(true);
        } else {
          setMediumScreen(false);
        }
      }
    });
    resizeObserver.observe(document.documentElement);
  }, [idToken]);

  useEffect(() => {
    if (!isInitialMount) {
      animate(
        scope.current,
        { scale: [1.8, 1] },
        { type: "spring", stiffness: 200, duration: 5 }
      );
    } else {
      setIsInitialMount(false);
    }
  }, [cart.length]);

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <ProfileModal open={open} closeModal={closeModal} />
      <header
        className={`flex justify-around gap-4 p-4 ${
          mediumScreen ? "items-center p-4" : ""
        } w-full sticky top-0 z-20 opacity-100 dark:bg-black bg-white`}
      >
        <div className="flex w-[60%] gap-8">
          <form className="dark:bg-zinc-800 bg-gray-200 w-[80%] p-2 rounded-full flex justify-between">
            <input
              className="focus:outline-none dark:bg-zinc-800 bg-gray-200 w-full"
              placeholder="Search for gaming items"
            />
            <button type="submit">
              <FaMagnifyingGlass />
            </button>
          </form>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="dark:bg-zinc-800 bg-gray-200 rounded-md p-2 md:w-[10%] hover:text-black"
            onClick={() => dispatch(sellModalActions.openModal())}
          >
            Sell
          </motion.button>
        </div>

        <div className="flex w-fit gap-6 items-center">
          <ThemeToggle />
          <motion.button whileHover={{ scale: 1.5 }}>
            <IoMdSwap size={30} />
          </motion.button>
          <Link href="/cart">
            <motion.button whileHover={{ scale: 1.5 }} ref={scope}>
              <FaShoppingCart size={25} />
            </motion.button>
          </Link>

          <div className="flex gap-2 items-center">
            <div
              className="relative h-[40px] w-[40px]"
              onClick={() => setOpen(true)}
            >
              <Image
                src={currentUser.imageUrl || defaultImageUrl}
                className="rounded-full h-[40px] w-[40px] hover:cursor-pointer"
                fill
                alt={currentUser.username}
              />
            </div>{" "}
            <p>Welcome {currentUser.username}!</p>
          </div>
        </div>
      </header>
    </>
  );
}

export default MainHeader;
