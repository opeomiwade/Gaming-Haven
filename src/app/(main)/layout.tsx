import "../globals.css";
import Sidebar from "@/components/ui/Sidebar";
import ReduxProviderWrapper from "@/redux/ProviderWrapper";
import MainHeader from "@/components/ui/MainHeader";
import QueryClientProviderWrapper from "@/components/client-wrappers/QueryClientProviderWrapper";
import { Toaster } from "react-hot-toast";
import { ModalContextProvider } from "@/context/ModalContext";
import SellModal from "@/components/modals/SellModal";

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
            <ModalContextProvider>
              <SellModal />
              <MainHeader />
              {children}
            </ModalContextProvider>
          </div>
        </div>
      </ReduxProviderWrapper>
    </QueryClientProviderWrapper>
  );
}
