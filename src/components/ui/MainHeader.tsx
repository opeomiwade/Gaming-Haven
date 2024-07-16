"use client";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSwap } from "react-icons/io";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { currentUserState } from "@/types/types";
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

function MainHeader() {
  const dispatch = useDispatch();
  const [idToken, _setIdToken, _removeItem] =
    useLocalStorage<string>("accessToken");
  const [mediumScreen, setMediumScreen] = useState<boolean>();
  const [open, setOpen] = useState<boolean>(false);

  const currentUser = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user
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
          <motion.button whileHover={{ scale: 1.5 }}>
            <FaShoppingCart size={25} />
          </motion.button>
          <div className="flex gap-2 items-center">
            <img
              src={currentUser.imageUrl || defaultImageUrl}
              className="rounded-full h-[40px] w-[40px] hover:cursor-pointer"
              onClick={() => setOpen(true)}
            />{" "}
            <p>Welcome {currentUser.username}!</p>
          </div>
        </div>
      </header>
    </>
  );
}

export default MainHeader;
