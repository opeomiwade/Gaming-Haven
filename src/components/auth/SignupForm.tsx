"use client";
import Button from "../ui/FormButton";
import Link from "next/link";
import { useFormStatus, useFormState } from "react-dom";
import { signupUser } from "@/lib/actions";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Ref, useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";

const SignupForm = () => {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(signupUser, { message: null });
  const [storedValue, setStoredValue] = useLocalStorage<string>("accessToken");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setMessage] = useState<string | undefined>();

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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (password !== confirmPassword) {
      timer = setTimeout(() => {
        setMessage("Password do not match");
      }, 5000);
    } else {
      setMessage(undefined);
    }
    return () => {
      clearTimeout(timer);
      setMessage(undefined)
    };
  }, [password, confirmPassword]);

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
          onChange={(event) => setPassword(event.currentTarget.value)}
          value={password}
        />
        <input
          name="confirm-password"
          className="p-4 rounded-md bg-gray-500 md:w-[500px] focus:outline-none"
          placeholder="Please confirm your password"
          type="password"
          required
          onChange={(event) => setConfirmPassword(event.currentTarget.value)}
          value={confirmPassword}
        />
        <Button
          pending={pending}
          disabled={password.trim().length < 1 || password !== confirmPassword}
        />
        <Link href="/login">
          <p className="hover:underline cursor-pointer">
            Have an Account? <span className="font-bold">Log In</span>
          </p>
        </Link>
      </form>
      {((state.message && state.isError) || errorMessage) && (
        <p className="text-red-500 font-bold text-center mt-4">
          {state.message || errorMessage}
        </p>
      )}
    </>
  );
};

export default SignupForm;
