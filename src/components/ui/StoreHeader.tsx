import { motion } from "framer-motion";
import { useState } from "react";

const StoreHeader = () => {
  const [hoverStart, setHoverStart] = useState<boolean>();

  return (
    <>
      <div className="flex gap-4 bg-white dark:bg-black w-full z-20 p-4 sticky top-20 opacity-100 border-y-[1px]">
        <motion.button className="text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800">
          Consoles
        </motion.button>
        <motion.button className="text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800">
          Controllers
        </motion.button>
        <motion.button className="text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800">
          Keyboards
        </motion.button>
        <motion.button className="text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800">
          Mouses
        </motion.button>
        <motion.button className="text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800">
          PCs
        </motion.button>
        <motion.button className="text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800">
          Manufacturers
        </motion.button>
      </div>
    </>
  );
};

export default StoreHeader;
