import Image from "next/image";
import loginImage from "@/app/assets/kid-gaming.jpeg";
import Controller from "@mui/icons-material/SportsEsports";
import AuthForm from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <main className="flex h-screen">
      <div
        className="h-screen flex justify-center items-center p-4"
        style={{ backgroundColor: "gray" }}
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
          <Controller style={{fontSize:"50px"}} />
          Gaming Haven
        </h1>
        <AuthForm />
      </div>
    </main>
  );
}
