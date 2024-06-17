import { motion } from "framer-motion";
const CategoryHeader: React.FC<{
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
}> = ({ setSelected, selected }) => {
  return (
    <section className="flex gap-4 bg-white dark:bg-black w-full z-20 p-4 sticky top-[72px] opacity-100 border-y-[1px]">
      <motion.button
        onClick={() => setSelected("consoles")}
        className={`text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800 rounded-md ${
          selected === "consoles" ? "dark:bg-zinc-800 bg-gray-300" : ""
        }`}
      >
        Consoles
      </motion.button>
      <motion.button
        onClick={() => setSelected("controllers")}
        className={`text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800 rounded-md ${
          selected === "controllers" ? "dark:bg-zinc-800 bg-gray-300" : ""
        }`}
      >
        Controllers
      </motion.button>
      <motion.button
        onClick={() => setSelected("keyboards")}
        className={`text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800 rounded-md ${
          selected === "keyboards" ? "dark:bg-zinc-800 bg-gray-300" : ""
        }`}
      >
        Keyboards
      </motion.button>
      <motion.button
        onClick={() => setSelected("mouses")}
        className={`text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800 rounded-md ${
          selected === "mouses" ? "dark:bg-zinc-800 bg-gray-300" : ""
        }`}
      >
        Mouses
      </motion.button>
      <motion.button
        onClick={() => setSelected("pcs")}
        className={`text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800 rounded-md ${
          selected === "pcs" ? "dark:bg-zinc-800 bg-gray-300" : ""
        }`}
      >
        PCs
      </motion.button>
      <motion.button
        onClick={() => setSelected("headphones")}
        className={`text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800 rounded-md ${
          selected === "headphones" ? "dark:bg-zinc-800 bg-gray-300" : ""
        }`}
      >
        Headphones
      </motion.button>
    </section>
  );
};

export default CategoryHeader;
