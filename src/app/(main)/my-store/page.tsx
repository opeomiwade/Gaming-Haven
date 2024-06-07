"use client";
import { FaBagShopping } from "react-icons/fa6";
import Header from "@/components/store/Header";
import { getUserListings } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { Listing } from "@/types/types";
import StoreItem from "@/components/store/StoreItem";

const StorePage = () => {
  const { data: listings, isFetching } = useQuery({
    queryKey: ["user-listings"],
    queryFn: getUserListings,
  });

  return (
    <main className="flex flex-col">
      <h1 className="text-3xl font-bold px-6 flex gap-2">
        <FaBagShopping />
        My Store
      </h1>
      {isFetching ? (
        <div className="h-screen flex items-center justify-center w-full">
          <CircularProgress />
        </div>
      ) : (
        <>
          {/* <Header /> */}
          <div className="grid sm:grid-cols-1 grid-cols-2 md:grid-cols-3 w-full p-6 gap-10 h-full">
            {listings.map((listing: Listing) => {
              return <StoreItem key={listing.listingId} listing={listing} />;
            })}
          </div>
        </>
      )}
    </main>
  );
};

export default StorePage;
