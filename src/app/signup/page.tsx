import SignupForm from "@/components/auth/SignupForm";
import Controller from "@mui/icons-material/SportsEsports";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signup Page",
  description: "A marketplace for everything gaming",
};

function SignupPage() {
  return (
    <>
      <header className="mt-4">
        <Link href="/">
          <h1 className="text-center text-4xl mb-4 hover:text-gray-500">
            <Controller style={{ fontSize: "50px" }} />
            Gaming Haven
          </h1>
        </Link>
      </header>
      <main className="m-4">
        <div className="shadow-2xl rounded-lg p-4 border-2 border-gray-500 w-fit mx-auto mt-8">
          <h2 className="text-center text-xl m-4">
            Fill in all details to sign up
          </h2>
          <SignupForm />
        </div>
      </main>
      <footer className="absolute bottom-2 w-full">
        <p className="text-center">
          <Link href="/">
            <span className="font-bold hover:underline">Gaming Haven</span>
          </Link>{" "}
          © 2024 by Ope Omiwade
        </p>
      </footer>
    </>
  );
}

export default SignupPage;
