"use client"
import { redirect } from "next/navigation";
import useLocalStorage from "./hooks/useLocalStorage";

export default function Home() {
  const [storedValue, setStoredValue, removeItem] = useLocalStorage<string>("accessToken");
  if (storedValue) {
    return <>Home</>;
  } else {
    redirect("login");
  }
}
