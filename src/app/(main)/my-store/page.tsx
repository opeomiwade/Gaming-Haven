"use client";
import { MdOutlineStore } from "react-icons/md";
import { getUserListings } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { Listing, currentUserState } from "@/types/types";
import StoreItem from "@/components/store-page/StoreItem";
import { useSelector } from "react-redux";

const StorePage = () => {
  const username = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user.username
  );
  const { data: listings, isFetching } = useQuery({
    queryKey: ["listings", username],
    queryFn: getUserListings,
  });

  return (
    <main className="flex flex-col">
      <h1 className="text-3xl font-bold px-6 flex gap-2 items-center">
        <MdOutlineStore size={45} />
        My Store
      </h1>
      {isFetching ? (
        <div className="h-screen flex items-center justify-center w-full">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full p-6 gap-10 h-full">
          {listings.map((listing: Listing) => {
            return <StoreItem key={listing.listingId} listing={listing} />;
          })}
        </div>
      )}
    </main>
  );
};

export default StorePage;
