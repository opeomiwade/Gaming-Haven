import "../globals.css";
import Sidebar from "@/components/ui/Sidebar";
import ReduxProviderWrapper from "@/redux/ProviderWrapper";
import MainHeader from "@/components/ui/MainHeader";
import QueryClientProviderWrapper from "@/components/client-wrappers/QueryClientProviderWrapper";
import { Toaster } from "react-hot-toast";
import { ListingContextProvider } from "@/context/ListingContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SellModal from "@/components/modals/SellModal";
import NoSSRWrapper from "@/components/client-wrappers/NoSSRWrapper";

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
            <ListingContextProvider>
              <NoSSRWrapper>
                <SellModal />
              </NoSSRWrapper>
              <MainHeader />
              {children}
            </ListingContextProvider>
          </div>
        </div>
      </ReduxProviderWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProviderWrapper>
  );
}
