import Button from "./FormButton";
import Link from "next/link";
const AuthForm: React.FC<{ params?: Object }> = ({ params }) => {
  return (
    <form className="flex gap-7 flex-col">
      <input
        className="p-4 rounded-md bg-gray-500 md:w-[500px] focus:outline-none"
        placeholder="Enter your email"
        type="email"
        required
      />
      <input
        className="p-4 rounded-md bg-gray-500 md:w-[500px] focus:outline-none"
        placeholder="Enter your password"
        type="password"
        required
      />
      <Button />
      <Link href="signup">
        <p className="hover:underline cursor-pointer">
          Dont have and account? <span className="font-bold">Sign up</span>
        </p>
      </Link>
    </form>
  );
};

export default AuthForm;
