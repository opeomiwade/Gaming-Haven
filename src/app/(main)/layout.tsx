import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/ui/Sidebar";
import ReduxProviderWrapper from "@/redux/ProviderWrapper";
import MainHeader from "@/components/ui/MainHeader";
import QueryClientProviderWrapper from "@/components/client-wrappers/QueryClientProviderWrapper";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gaming Haven",
  description: "The marketplace and home for everything gaming",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} dark:bg-black dark:text-white bg-white`}
      >
        <QueryClientProviderWrapper>
          <ReduxProviderWrapper>
            <Toaster />
            <div className="flex">
              <Sidebar />
              <div className="w-full">
                <MainHeader />
                {children}
              </div>
            </div>
          </ReduxProviderWrapper>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
