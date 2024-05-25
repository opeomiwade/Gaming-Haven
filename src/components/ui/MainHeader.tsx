"use client";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import SwapHorizSharpIcon from "@mui/icons-material/SwapHorizSharp";
import { motion } from "framer-motion";

function MainHeader() {
  return (
    <header className="flex justify-around">
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
          className="bg-zinc-800 rounded-md p-2 w-[10%] hover:text-black"
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
            src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-5b47d.appspot.com/o/account%20circle.jpeg?alt=media&token=ec3c29d8-5b89-447b-ac2e-651af9e4e394"
            className="rounded-full h-[40px] w-[40px] hover:cursor-pointer"
          />{" "}
          <p>Welcome Ope!</p>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
