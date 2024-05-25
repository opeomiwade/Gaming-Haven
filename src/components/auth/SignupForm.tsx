"use client";
import Button from "./FormButton";
import Link from "next/link";
import { useFormStatus, useFormState } from "react-dom";
import { signupUser } from "@/lib/actions";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const SignupForm = () => {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(signupUser, { message: null });
  const [storedValue, setStoredValue] = useLocalStorage<string>("accessToken");

  useEffect(() => {
    if (state.accessToken) {
      setStoredValue(state.accessToken);
    }
  }, [state]);

  useEffect(() => {
    if (storedValue) {
      redirect("/");
    }
  }, [storedValue]);

  return (
    <>
      <form className="flex gap-7 flex-col" action={formAction}>
        <input
          name="username"
          className="p-4 rounded-md bg-gray-500 md:w-[500px] focus:outline-none"
          placeholder="Enter your username"
          type="name"
          required
        />
        <input
          name="email"
          className="p-4 rounded-md bg-gray-500 md:w-[500px] focus:outline-none"
          placeholder="Enter your email"
          type="email"
          required
        />
        <input
          name="password"
          className="p-4 rounded-md bg-gray-500 md:w-[500px] focus:outline-none"
          placeholder="Enter your password"
          type="password"
          required
        />
        <input
          name="password"
          className="p-4 rounded-md bg-gray-500 md:w-[500px] focus:outline-none"
          placeholder="Please confirm your password"
          type="password"
          required
        />
        <Button pending={pending} />
        <Link href="/">
          <p className="hover:underline cursor-pointer">
            Have an Account? <span className="font-bold">Log In</span>
          </p>
        </Link>
      </form>
      {state.message && state.isError && (
        <p className="text-red-500 font-bold text-center mt-4">{state.message}</p>
      )}
    </>
  );
};

export default SignupForm;
