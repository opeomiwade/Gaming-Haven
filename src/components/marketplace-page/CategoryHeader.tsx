import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import ListingContext from "@/context/ListingContext";

const CategoryHeader: React.FC<{}> = () => {
  const router = useRouter();
  const { filters, setFilters } = useContext(ListingContext);

  return (
    <section className="flex gap-4 bg-white dark:bg-black w-full z-20 p-4 sticky top-[72px] opacity-100 border-y-[1px]">
      <motion.button
        onClick={() => {
          setFilters({ categoryName: "consoles" });
          router.push("/marketplace/consoles");
        }}
        className={`text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800 rounded-md ${
          filters.categoryName === "consoles"
            ? "dark:bg-zinc-800 bg-gray-300"
            : ""
        }`}
      >
        Consoles
      </motion.button>
      <motion.button
        onClick={() => {
          setFilters({ categoryName: "controllers" });
          router.push("/marketplace/controllers");
        }}
        className={`text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800 rounded-md ${
          filters.categoryName === "controllers"
            ? "dark:bg-zinc-800 bg-gray-300"
            : ""
        }`}
      >
        Controllers
      </motion.button>
      <motion.button
        onClick={() => {
          setFilters({ categoryName: "keyboards" });
          router.push("/marketplace/keyboards");
        }}
        className={`text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800 rounded-md ${
          filters.categoryName === "keyboards"
            ? "dark:bg-zinc-800 bg-gray-300"
            : ""
        }`}
      >
        Keyboards
      </motion.button>
      <motion.button
        onClick={() => {
          setFilters({ categoryName: "mouses" });
          router.push("/marketplace/mouses");
        }}
        className={`text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800 rounded-md ${
          filters.categoryName === "mouses"
            ? "dark:bg-zinc-800 bg-gray-300"
            : ""
        }`}
      >
        Mouses
      </motion.button>
      <motion.button
        onClick={() => {
          setFilters({ categoryName: "pcs" });
          router.push("/marketplace/pcs");
        }}
        className={`text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800 rounded-md ${
          filters.categoryName === "pcs" ? "dark:bg-zinc-800 bg-gray-300" : ""
        }`}
      >
        PCs
      </motion.button>
      <motion.button
        onClick={() => {
          setFilters({ categoryName: "headphones" });
          router.push("/marketplace/headphones");
        }}
        className={`text-md font-semibold p-2 hover:bg-gray-300 hover:dark:bg-zinc-800 rounded-md ${
          filters.categoryName === "headphones"
            ? "dark:bg-zinc-800 bg-gray-300"
            : ""
        }`}
      >
        Headphones
      </motion.button>
    </section>
  );
};

export default CategoryHeader;
