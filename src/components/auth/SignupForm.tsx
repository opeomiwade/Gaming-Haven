"use client";
import Button from "../ui/FormButton";
import Link from "next/link";
import { useFormState } from "react-dom";
import { signupUser } from "@/lib/actions";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const [state, formAction] = useFormState(signupUser, { message: null });
  const [storedValue, setStoredValue] = useLocalStorage<string>("accessToken");
  const [errorMessage, setMessage] = useState<string | undefined>();
  const { register, watch } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
  });
  const { email, username, password, confirmPassword } = watch();


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
      setMessage(undefined);
    };
  }, [password, confirmPassword]);

  return (
    <>
      <form className="flex gap-7 flex-col" action={formAction}>
        <input
          className="p-4 rounded-md dark:bg-gray-500 bg-gray-300 md:w-[500px] focus:outline-none"
          placeholder="Enter your username"
          type="name"
          {...register("username")}
        />
        <input
          className="p-4 rounded-md dark:bg-gray-500 bg-gray-300 md:w-[500px] focus:outline-none"
          placeholder="Enter your email"
          type="email"
          {...register("email")}
        />
        <input
          className="p-4 rounded-md dark:bg-gray-500 bg-gray-300 md:w-[500px] focus:outline-none"
          placeholder="Enter your password"
          type="password"
          {...register("password")}
        />
        <input
          className="p-4 rounded-md dark:bg-gray-500 bg-gray-300 md:w-[500px] focus:outline-none"
          placeholder="Please confirm your password"
          type="password"
          {...register("confirmPassword")}
        />
        <Button
          disabled={
            password.trim().length < 1 ||
            password !== confirmPassword ||
            email.trim().length < 1 ||
            username.trim().length < 1
          }
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
