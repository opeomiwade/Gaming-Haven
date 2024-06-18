import { GoChevronDown } from "react-icons/go";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const FilterButton: React.FC<{
  children: React.ReactNode;
  options?: string[];
}> = ({ children, options }) => {
  const [isClicked, setClicked] = useState<boolean>(false);
  const checkboxRef = useRef<HTMLInputElement>();
  return (
    <div className="relative">
      <button
        className="rounded-md border-gray-300 border-[1px] dark:border-white p-2 flex gap-2 hover:cursor-pointer items-center text-sm"
        onClick={() => setClicked(!isClicked)}
      >
        <p>{children}</p>
        <motion.div
          animate={{ rotate: isClicked ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <GoChevronDown size={25} />
        </motion.div>
      </button>
      {isClicked && (
        <div className="flex flex-col gap-2 dark:bg-zinc-800 bg-white rounded-md z-30 absolute top-[100%] shadow-lg border-[1px] mt-2 p-2 max-h-[250px] overflow-y-auto overflow-x-hidden max-w-[220px]">
          <form className="flex flex-col">
            {options ? (
              options?.map((option) => (
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    name={option}
                    value={option}
                    ref={checkboxRef as React.Ref<HTMLInputElement>}
                    id={option}
                    onChange={() => {
                      if (checkboxRef.current?.checked) {
                      } else {
                      }
                    }}
                    className="hover:cursor-pointer"
                  />
                  <label htmlFor="new">{option}</label>
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-2 text-sm w-full">
                <div className="flex gap-2">
                  <label className="flex flex-col items-center">
                    <span>Min</span>
                    <span className="font-bold">£</span>
                    <input
                      type="number"
                      min={1}
                      className="border p-1 rounded focus:outline-none w-[100px]"
                    />
                  </label>
                  <label className="flex flex-col items-center">
                    <span>Max</span>
                    <span className="font-bold">£</span>
                    <input
                      type="number"
                      className="border p-1 rounded focus:outline-none w-[100px]"
                    />
                  </label>
                </div>
                <button className="bg-gray-300 p-1 font-bold rounded-lg w-20 mx-auto">
                  Done
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
