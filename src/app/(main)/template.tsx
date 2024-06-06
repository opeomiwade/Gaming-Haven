"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import isTokenExpired from "@/utils/jwt";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (isTokenExpired(token!)) {
      router.push("/login");
       // Redirect to login page if token is expired
    }
  }, [router]);

  return <>{children}</>;
}
