import Button from "./FormButton";
import Link from "next/link";

const SignupForm = () => {
  return (
    <form className="flex gap-7 flex-col">
      <input
        className="p-4 rounded-md bg-gray-500 w-[500px] focus:outline-none"
        placeholder="Enter your full name"
        type="name"
        required
      />
      <input
        className="p-4 rounded-md bg-gray-500 w-[500px] focus:outline-none"
        placeholder="Enter your email"
        type="email"
        required
      />
      <input
        className="p-4 rounded-md bg-gray-500 w-[500px] focus:outline-none"
        placeholder="Enter your password"
        type="password"
        required
      />
      <input
        className="p-4 rounded-md bg-gray-500 w-[500px] focus:outline-none"
        placeholder="Please confirm your password"
        type="password"
        required
      />
      <Button />
      <Link href="/">
        <p className="hover:underline cursor-pointer">
          Have an Account? <span className="font-bold">Log In</span>
        </p>
      </Link>
    </form>
  );
};

export default SignupForm;
