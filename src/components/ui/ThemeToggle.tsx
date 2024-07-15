"use client";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import NoSSRWrapper from "../client-wrappers/NoSSRWrapper";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // adds dark class to html root element
    // Toggles between "dark" and "light" classes on the html root element
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.classList.toggle("light", !darkMode);

    // Stores the current theme setting in localStorage
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <NoSSRWrapper>
      <div
        onClick={() => setDarkMode(!darkMode)}
        className="relative w-16 h-8 flex items-center dark:bg-zinc-800 bg-gray-200 cursor-pointer rounded-full p-1"
      >
        <BsSunFill className="text-yellow-400" size={18} />
        <div
          style={darkMode ? { right: "2px" } : { left: "2px" }}
          className="absolute bg-gray-300 dark:bg-gray-400 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
        ></div>
        <FaMoon className="ml-auto text-zinc-900" size={18} />
      </div>
    </NoSSRWrapper>
  );
};

export default ThemeToggle;
