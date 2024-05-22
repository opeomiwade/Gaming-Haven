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
function useLocalStorage<T>(key: string, value?: string) {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : value;
    } catch (error) {
      console.log(error);
      return value;
    }
  });

  const removeItem = useCallback(() => {
    setStoredValue(undefined);
  }, []);

  useEffect(() => {
    if (value === undefined || storedValue === undefined) {
      localStorage.removeItem(key); // Remove the item from localStorage if value is undefined
      return;
    }
    localStorage.setItem(key, JSON.stringify(value)); // Otherwise, store the value in localStorage
  }, [key, value, storedValue]);

  return [storedValue, setStoredValue, removeItem];
}

export default useLocalStorage;
