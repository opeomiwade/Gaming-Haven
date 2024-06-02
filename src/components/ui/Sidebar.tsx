"use client";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import Controller from "@mui/icons-material/SportsEsports";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import CollapseIcon from "@mui/icons-material/KeyboardDoubleArrowLeftSharp";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import useLocalStorage from "@/hooks/useLocalStorage";
import classes from "@/CSS/navbar.module.css";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const {push} = useRouter()
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [_storedValue, _setStoredValue, removeItem] =
    useLocalStorage("accessToken");
  const [bottomSidebar, setBottom] = useState<boolean>();

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
    removeItem()
    push("/login")
  }

  return (
    <motion.aside
      animate={{
        width: !bottomSidebar ? (isExpanded ? "fit-content" : "80px") : "",
      }}
      transition={{ duration: 0.2 }}
      className={
        bottomSidebar
          ? classes["bottom-navbar"]
          : "w-fit flex flex-col h-full bg-zinc-800 rounded-r-md shadow-xl justify-between fixed"
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
            className="text-center text-2xl hover:text-black hover:cursor-pointer font-extrabold"
          >
            <Controller style={{ fontSize: "50px" }} />
            {isExpanded && <p>Gaming Haven</p>}
          </motion.h1>
        </Link>

        {!bottomSidebar && <hr className="w-full my-4" />}
        <Link
          href="/dashboard"
          className="flex items-center gap-4 text-lg font-bold hover:text-black"
        >
          <DashboardIcon style={{ fontSize: "40px" }} />
          {isExpanded && <p>Dashboard</p>}
        </Link>

        <Link
          href="/marketplace"
          className="flex items-center gap-4 text-lg font-bold hover:text-black"
        >
          <PeopleIcon style={{ fontSize: "40px" }} />
          {isExpanded && <p>MarketPlace</p>}
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 text-lg font-bold hover:text-black"
        >
          <MailIcon style={{ fontSize: "40px" }} />
          {isExpanded && <p>Inbox</p>}
        </Link>
        {bottomSidebar && (
          <button
            onClick={logOut}
            className="flex items-center gap-4 text-lg hover:text-red-500 font-bold"
          >
            <LogoutIcon style={{ fontSize: "50px" }} />
            {isExpanded && <p>Log out</p>}
          </button>
        )}
      </div>
      {!bottomSidebar && (
        <div className="flex flex-col gap-4 items-start p-4">
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
            className="flex items-center gap-4 text-lg hover:text-black font-bold w-full"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 0 : 180 }}
              transition={{ duration: 0.5 }}
            >
              <CollapseIcon style={{ fontSize: "55px" }} />
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
