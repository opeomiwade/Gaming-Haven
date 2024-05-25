"use client";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import Controller from "@mui/icons-material/SportsEsports";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import CollapseIcon from "@mui/icons-material/KeyboardDoubleArrowLeftSharp";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { navigate } from "@/lib/actions";
import useLocalStorage from "@/hooks/useLocalStorage";
import store from "@/store/redux-store";
import { Provider } from "react-redux";

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const showSidebar =
    !pathname.includes("login") && !pathname.includes("signup");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [_storedValue, _setStoredValue, removeItem] =
    useLocalStorage("accessToken");

  function logOut() {
    removeItem();
    try {
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("sign out successful");
        navigate("login");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Provider store={store}>
      <main className={showSidebar ? "flex gap-6" : ""}>
        {showSidebar && (
          <motion.aside
            animate={{ width: isExpanded ? "fit-content" : "80px" }}
            transition={{ duration: 0.2 }}
            className="w-fit flex flex-col h-screen bg-zinc-800 rounded-r-md shadow-xl justify-between fixed"
          >
            <div className="flex flex-col gap-4 p-4 items-start">
              <Link href="/">
                <motion.h1
                  whileHover={{ scale: 1.1 }}
                  className="text-center text-2xl hover:text-black hover:cursor-pointer font-extrabold"
                >
                  <Controller style={{ fontSize: "50px" }} />
                  {isExpanded && <p>Gaming Haven</p>}
                </motion.h1>
              </Link>

              <hr className="w-full my-4" />
              <Link
                href="/dashboard"
                className="flex items-center gap-4 text-lg font-bold hover:text-black"
              >
                <DashboardIcon style={{ fontSize: "40px" }} />
                {isExpanded && <p>Dashboard</p>}
              </Link>
              <button className="flex items-center gap-4 text-lg font-bold hover:text-black">
                <SearchIcon style={{ fontSize: "40px" }} />
                {isExpanded && <p>Search</p>}
              </button>
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
            </div>
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
          </motion.aside>
        )}
        {children}
      </main>
    </Provider>
  );
};

export default Sidebar;
