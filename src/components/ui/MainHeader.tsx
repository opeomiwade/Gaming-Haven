"use client";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import SwapHorizSharpIcon from "@mui/icons-material/SwapHorizSharp";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { currentUserState } from "@/types/types";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/lib/http";
import { useDispatch } from "react-redux";
import { currentUserActions } from "@/redux/store/redux-store";
import useLocalStorage from "@/hooks/useLocalStorage";

function MainHeader() {
  const dispatch = useDispatch();
  const [idToken, _setIdToken, removeItem] =
    useLocalStorage<string>("accessToken");
  const [mediumScreen, setMediumScreen] = useState<boolean>();

  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/instagram-clone-5b47d.appspot.com/o/account%20circle.jpeg?alt=media&token=ec3c29d8-5b89-447b-ac2e-651af9e4e394";

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
  }, []);

  return (
    <header
      className={`flex justify-around ${
        mediumScreen ? "items-center p-4" : "ml-[230px]"
      } mt-4 w-full`}
    >
      <div className="flex w-[60%] gap-8">
        <form className="bg-zinc-800 w-[80%] p-2 rounded-full flex justify-between">
          <input
            className="focus:outline-none bg-zinc-800 w-full"
            placeholder="Search for gaming items"
          />
          <button type="submit">
            <SearchSharpIcon />
          </button>
        </form>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-zinc-800 rounded-md p-2 md:w-[10%] hover:text-black"
        >
          Sell
        </motion.button>
      </div>

      <div className="flex w-fit gap-6">
        <motion.button whileHover={{ scale: 1.5 }}>
          <SwapHorizSharpIcon />
        </motion.button>
        <motion.button whileHover={{ scale: 1.5 }}>
          <ShoppingCartSharpIcon />
        </motion.button>
        <div className="flex gap-2 items-center">
          <img
            src={currentUser.imageUrl || defaultImageUrl}
            className="rounded-full h-[40px] w-[40px] hover:cursor-pointer"
          />{" "}
          <p>Welcome {currentUser.username}!</p>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
