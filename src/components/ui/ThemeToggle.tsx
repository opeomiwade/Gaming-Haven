"use client";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import NoSSRWrapper from "../client-wrappers/NoSSRWrapper";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    console.log(theme)
    if (theme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    // adds dark class to html root element
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "dark"); // stores theme settings
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light"); // stores theme settings
    }
  }, [darkMode]);

  return (
    <NoSSRWrapper>
      <div
        onClick={() => setDarkMode(!darkMode)}
        className="relative w-16 h-8 flex items-center dark:bg-zinc-800 bg-gray-200 cursor-pointer rounded-full p-1"
      >
        <BsSunFill className="text-yellow-400" size={18} />
        <div
          style={darkMode ? { left: "2px" } : { right: "2px" }}
          className="absolute bg-gray-300 dark:bg-gray-400 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
        ></div>
        <FaMoon className="ml-auto text-zinc-900" size={18} />
      </div>
    </NoSSRWrapper>
  );
};

export default ThemeToggle;
