import { motion } from "framer-motion";
import Link from "next/link";

const Button: React.FC<{ listingId: number }> = ({ listingId }) => {
  return (
    <Link href={`/listings/${listingId}`} className="w-[40%]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="bg-gradient-to-tl from-gray-200 to-white dark:from-gray-700 dark:to-white-400 text-center p-2 bg-gray-300 rounded-lg text-md text-black font-semibold hover:shadow-md hover:shadow-zinc-700"
      >
        View Details
      </motion.button>
    </Link>
  );
};

export default Button;
