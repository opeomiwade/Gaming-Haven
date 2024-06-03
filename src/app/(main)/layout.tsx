import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/ui/Sidebar";
import ReduxProviderWrapper from "@/redux/ProviderWrapper";
import MainHeader from "@/components/ui/MainHeader";
import QueryClientProviderWrapper from "@/components/client-wrappers/QueryClientProviderWrapper";
import SellModal from "@/components/modals/SellModal";

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
      <body className={`${inter.className}`}>
        <QueryClientProviderWrapper>
          <ReduxProviderWrapper>
            <div className="flex">
              <SellModal />
              <MainHeader />
              <Sidebar />
            </div>
            {children}
          </ReduxProviderWrapper>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
