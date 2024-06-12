"use client";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import Controller from "@mui/icons-material/SportsEsports";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useLocalStorage from "@/hooks/useLocalStorage";
import classes from "@/CSS/navbar.module.css";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardDoubleArrowRight as CollapseIcon } from "react-icons/md";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { push } = useRouter();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [_storedValue, _setStoredValue, removeItem] =
    useLocalStorage("accessToken");
  const [bottomSidebar, setBottom] = useState<boolean>();
  const path = usePathname();
  console.log(path)

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width < 768) {
          setBottom(true);
        } else {
          setBottom(false);
        }
      }
    });
    resizeObserver.observe(document.documentElement);
    return () => {
      resizeObserver.disconnect();
    };
  });

  async function logOut() {
    removeItem();
    push("/login");
  }

  return (
    <motion.aside
      animate={{
        width: !bottomSidebar ? (isExpanded ? "250px" : "80px") : "",
      }}
      transition={{ duration: 0.2 }}
      className={
        bottomSidebar
          ? `${classes["bottom-navbar"]} dark:bg-zinc-800 dark:text-white bg-white text-black`
          : "w-fit overflow-y-auto top-0 left-0 flex flex-col h-screen rounded-r-md shadow-2xl z-20 justify-between sticky dark:bg-zinc-800 dark:text-white bg-white text-black"
      }
    >
      <div
        className={`flex ${
          !bottomSidebar
            ? "flex-col gap-4 p-4"
            : "w-full justify-between items-center"
        } items-start`}
      >
        <Link href="/">
          <motion.h1
            whileHover={{ scale: 1.1 }}
            className={`text-center text-2xl dark:hover:text-black hover:cursor-pointer hover:text-gray-300 font-extrabold`}
          >
            <Controller style={{ fontSize: "50px" }} />
            {isExpanded && <p>Gaming Haven</p>}
          </motion.h1>
        </Link>

        {!bottomSidebar && <hr className="w-full my-4" />}
        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.2 }}
            className={`flex items-center gap-4 text-lg font-bold dark:hover:text-black hover:text-gray-300 ${path.toLowerCase().includes("dashboard") ? "text-gray-300 dark:" : ""}`}
          >
            <DashboardIcon style={{ fontSize: "40px" }} />
            {isExpanded && <p>Dashboard</p>}
          </motion.button>
        </Link>

        <Link href="/marketplace">
          <motion.button
            whileHover={{ scale: 1.2 }}
            className={`flex items-center gap-4 text-lg font-bold dark:hover:text-black hover:text-gray-300 ${path.toLowerCase().includes("marketplace") ? "text-gray-300" : ""}`}
          >
            <PeopleIcon style={{ fontSize: "40px" }} />
            {isExpanded && <p>MarketPlace</p>}
          </motion.button>
        </Link>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.2 }}
            className={`flex items-center gap-4 text-lg font-bold dark:hover:text-black hover:text-gray-300 ${path.toLowerCase().includes("inbox") ? "text-gray-300" : ""}`}
          >
            <MailIcon style={{ fontSize: "40px" }} />
            {isExpanded && <p>Inbox</p>}
          </motion.button>
        </Link>
        {bottomSidebar && (
          <button onClick={logOut}>
            <motion.button
              whileHover={{ scale: 1.2 }}
              className="flex items-center gap-4 text-lg hover:text-red-500 font-bold"
            >
              <LogoutIcon style={{ fontSize: "50px" }} />
              {isExpanded && <p>Log out</p>}
            </motion.button>
          </button>
        )}
      </div>
      {!bottomSidebar && (
        <div className="flex flex-col gap-4 items-start p-4">
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
            className="flex items-center gap-4 text-lg dark:hover:text-black font-bold w-full hover:text-gray-300"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <CollapseIcon size={55} />
            </motion.div>
            {isExpanded && <p>Collapse</p>}
          </button>

          <button
            onClick={logOut}
            className="flex items-center gap-4 text-lg hover:text-red-500 font-bold"
          >
            <LogoutIcon style={{ fontSize: "50px" }} />
            {isExpanded && <p>Log out</p>}
          </button>
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;
