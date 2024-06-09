import Image from "next/image";
import loginImage from "@/assets/kid-gaming.jpeg";
import Controller from "@mui/icons-material/SportsEsports";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex h-screen">
      <div
        className="h-screen justify-center items-center p-4 hidden md:flex bg-gray-400 dark:bg-zinc-500"
      >
        <Image
          src={loginImage}
          alt="Image of someone gaming"
          className="rounded-md"
          height={300}
        />
      </div>
      <div className="h-screen flex flex-col items-center justify-center w-full gap-10">
        <h1 className="text-4xl">
          <Controller style={{ fontSize: "50px" }} />
          Gaming Haven
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
