"use client";
import Button from "./FormButton";
import Link from "next/link";
import { useFormStatus, useFormState } from "react-dom";
import loginUser, { navigate } from "@/lib/actions";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import GoogleIcon from "@mui/icons-material/Google";
import { motion } from "framer-motion";
import { googleSignIn } from "@/lib/googleSigIn";

const AuthForm = () => {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(loginUser, { message: null });
  const [storedValue, setStoredValue] = useLocalStorage<string>("accessToken");

  useEffect(() => {
    if (state.accessToken) {
      setStoredValue(state.accessToken);
    }
  }, [state]);

  useEffect(() => {
    if(storedValue){
      navigate("")
    }

  }, [storedValue])

  return (
    <>
      <form id="login" className="flex gap-7 flex-col" action={formAction}>
        <input
          name="email"
          id="email"
          className="p-4 rounded-md bg-gray-500 md:w-[500px] focus:outline-none"
          placeholder="Enter your email"
          type="email"
          required
        />
        <input
          name="password"
          id="password"
          className="p-4 rounded-md bg-gray-500 md:w-[500px] focus:outline-none"
          placeholder="Enter your password"
          type="password"
          required
        />
        <Button pending={pending} />
        <motion.button
          onClick={googleSignIn}
          whileHover={{ scale: 1.1 }}
          type="button"
          className="bg-white text-black font-bold p-4 rounded-lg flex items-center gap-2 justify-center hover:bg-blue-400"
        >
          <GoogleIcon />
          Sign in with google
        </motion.button>
        <Link href="signup">
          <p className="hover:underline cursor-pointer">
            Dont have and account? <span className="font-bold">Sign up</span>
          </p>
        </Link>
      </form>
      {state.message && state.isError && (
        <p className="text-red-500 font-bold text-center">{state.message}</p>
      )}
    </>
  );
};

export default AuthForm;
