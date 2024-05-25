"use client";
import { useEffect, useState, useCallback } from "react";

/**
 * custom hook to handle localtstorage items
 * @param {string} key
 * @param {string} value
 * @returns {string} storedValue - stored value in the localstorage
 * @returns {Dispatch<SetStateAction<T | undefined>>} setStoredValue - set state dispatch action to update localstorage value
 * @returns {VoidFunction} removeItem - function to remove item from localstorage
 */
function useLocalStorage<T>(
  key: string,
  value?: string
): [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>,
  () => void
] {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : value;
      }
    } catch (error) {
      return localStorage.getItem(key) ? localStorage.getItem(key) : value;
    }
    return value;
  });

  const removeItem = useCallback(() => {
    setStoredValue(undefined);
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }, [key]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (storedValue !== undefined) {
        localStorage.setItem(key, JSON.stringify(value || storedValue)); // Otherwise, store the value in localStorage
      } else {
        localStorage.removeItem(key);
      }
    }
  }, [key, value, storedValue]);

  return [storedValue, setStoredValue, removeItem];
}

export default useLocalStorage;
