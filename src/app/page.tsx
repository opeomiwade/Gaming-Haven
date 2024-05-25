"use client";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";
import { navigate } from "@/lib/actions";

export default function Home() {
  const [storedValue, _setStoredValue, removeItem] =
    useLocalStorage<string>("accessToken");
  
  useEffect(() => {
    if (!storedValue) {
      navigate("login");
    }
  }, []);



  return <h1>Home</h1>;
}
