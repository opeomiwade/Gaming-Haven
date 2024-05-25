"use client";
import { motion } from "framer-motion";
import { TabProps } from "@/types/types";
import { useState } from "react";

export const Tab: React.FC<TabProps> = ({ isSelected, onSelect, children }) => {
  return (
    <li>
      {isSelected ? (
        <motion.div
          layoutId="active-tab"
          className="bg-zinc-800 p-2 rounded-full"
        >
          <button
            className="text-white"
            onClick={onSelect}
          >
            {children}
          </button>
        </motion.div>
      ) : (
        <button
          className="text-white"
          onClick={onSelect}
        >
          {children}
        </button>
      )}
    </li>
  );
};

const Tabs = () => {
  const [selected, setSelected] = useState<string>("consoles");

  return (
    <menu className="bg-black px-4 py-2 flex gap-2 justify-between rounded-lg mt-2 font-semibold items-center">
      <Tab
        isSelected={selected == "consoles"}
        onSelect={() => setSelected("consoles")}
      >
        Consoles
      </Tab>
      <Tab
        isSelected={selected == "controllers"}
        onSelect={() => setSelected("controllers")}
      >
        Controller
      </Tab>
      <Tab
        isSelected={selected == "gaming headphones"}
        onSelect={() => setSelected("gaming headphones")}
      >
        Gaming Headphones
      </Tab>
    </menu>
  );
};

export default Tabs;
