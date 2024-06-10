"use client";
import Button from "../ui/FormButton";
import Link from "next/link";
import { useFormState } from "react-dom";
import loginUser from "@/lib/actions";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import GoogleIcon from "@mui/icons-material/Google";
import { motion } from "framer-motion";
import { googleSignIn } from "@/lib/auth";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const { push } = useRouter();
  const [state, formAction] = useFormState(loginUser, { message: null });
  const [storedValue, setStoredValue] = useLocalStorage<string>("accessToken");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (state.accessToken) {
      setStoredValue(state.accessToken);
    }
  }, [state]);

  useEffect(() => {
    if (storedValue) {
      push("/");
    }
  }, [storedValue]);

  useEffect(() => {
    if (email.trim().length < 1 || password.trim().length < 1) {
      setDisabled(true);
    } else setDisabled(false);
  }, [password, email]);

  return (
    <div>
      <form id="login" className="flex gap-7 flex-col" action={formAction}>
        <input
          name="email"
          id="email"
          className="p-4 rounded-md dark:bg-gray-500 bg-gray-300 md:w-[500px] focus:outline-none"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <input
          name="password"
          id="password"
          className="p-4 rounded-md dark:bg-gray-500 bg-gray-300 md:w-[500px] focus:outline-none"
          placeholder="Enter your password"
          type="password"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Button disabled={disabled} />
      </form>
      <motion.button
        onClick={googleSignIn}
        whileHover={{ scale: 1.1 }}
        type="button"
        className="dark:bg-white border-2 dark:border-0 text-black font-bold p-4 rounded-lg w-full flex items-center gap-2 justify-center my-4 hover:bg-blue-400"
      >
        <GoogleIcon />
        Sign in with google
      </motion.button>
      <Link href="signup">
        <p className="hover:underline cursor-pointer">
          Dont have and account? <span className="font-bold">Sign up</span>
        </p>
      </Link>
      {state.message && state.isError && (
        <p className="text-red-500 font-bold text-center">{state.message}</p>
      )}
    </div>
  );
};

export default AuthForm;
