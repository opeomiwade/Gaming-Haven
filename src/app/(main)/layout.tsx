import "../globals.css";
import Sidebar from "@/components/ui/Sidebar";
import ReduxProviderWrapper from "@/redux/ProviderWrapper";
import MainHeader from "@/components/ui/MainHeader";
import QueryClientProviderWrapper from "@/components/client-wrappers/QueryClientProviderWrapper";
import { Toaster } from "react-hot-toast";


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
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
  );
}
