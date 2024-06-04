"use client";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    // adds dark class to html root element
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark"); // stores theme settings
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light"); // stores theme settings
    }
  }, [darkMode]);

  return (
    <div
      onClick={() => setDarkMode(!darkMode)}
      className="relative w-16 h-8 flex items-center dark:bg-zinc-800 bg-white cursor-pointer rounded-full p-1"
    >
      <FaMoon className="text-zinc-900" size={18} />
      <div
        style={darkMode ? { left: "2px" } : { right: "2px" }}
        className="absolute bg-gray-300 dark:bg-gray-400 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
      ></div>
      <BsSunFill className="ml-auto text-yellow-400" size={18} />
    </div>
  );
};

export default ThemeToggle;
