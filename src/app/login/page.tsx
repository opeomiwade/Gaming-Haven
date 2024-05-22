"use client";

import Image from "next/image";
import loginImage from "@/app/assets/kid-gaming.jpeg";
import Controller from "@mui/icons-material/SportsEsports";
import LoginForm from "@/components/auth/LoginForm";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [imageVisible, setIsVisisble] = useState<boolean>(true);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width < 860) {
          setIsVisisble(false);
        } else {
          setIsVisisble(true);
        }
      }
    });
    resizeObserver.observe(document.documentElement);
  }, []);

  return (
    <main className="flex h-screen">
      {imageVisible && (
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
      )}
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
