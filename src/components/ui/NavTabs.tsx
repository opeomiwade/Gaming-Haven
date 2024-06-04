"use client";
import { motion } from "framer-motion";
import { TabProps } from "@/types/types";

export const Tab: React.FC<TabProps> = ({
  isSelected,
  onSelect,
  children,
  layoutId,
}) => {
  return (
    <li>
      {isSelected && (
        <motion.div
          layoutId={layoutId}
          className="border-t-2 border-white rounded-lg"
        />
      )}
      <button
        className={
          isSelected
            ? "dark:text-white text-black"
            : "dark:text-gray-200 text-gray-500 font-light"
        }
        onClick={onSelect}
      >
        {children}
      </button>
    </li>
  );
};

const Tabs: React.FC<{
  tabs: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  layoutId: string;
}> = ({ tabs, selected, setSelected, layoutId }) => {
  return (
    <menu className="dark:bg-black bg-gray-300 px-4 py-2 flex gap-12 justify-center rounded-full mt-2 font-semibold items-center">
      {tabs.map((tab) => {
        return (
          <Tab
            isSelected={selected == tab}
            onSelect={() => setSelected(tab)}
            layoutId={layoutId}
            key={tab}
          >
            {tab}
          </Tab>
        );
      })}
    </menu>
  );
};

export default Tabs;
