import { motion } from "framer-motion";
import Link from "next/link";

const EmptyPlaceHolder: React.FC<{
  buttonText?: string;
  messageText?: string;
  href?: string;
}> = ({ buttonText, href, messageText }) => {
  if (href) {
    return (
      <div className="w-full flex flex-col gap-2 items-center justify-center h-[300px]">
        {messageText && (
          <p className="font-bold text-xl text-gray-500 dark:text-white">{messageText}</p>
        )}
        <Link href={href}>
          <motion.button
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 500 }}
            className={`text-sm font-semibold dark:bg-black bg-gray-300 py-2 px-4 rounded-md`}
          >
            {buttonText}
          </motion.button>
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center h-[300px]">
      {messageText && (
        <p className="font-bold text-gray-500 dark:text-white text-xl">{messageText}</p>
      )}
      <motion.button
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 500 }}
        className={`text-sm font-semibold dark:bg-black bg-gray-300 py-2 px-4 rounded-md`}
      >
        {buttonText}
      </motion.button>
    </div>
  );
};

export default EmptyPlaceHolder;
