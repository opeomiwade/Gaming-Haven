"use client";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import toTitleCase from "@/utils/toTitleCase";
import { useQuery } from "@tanstack/react-query";
import { getListingByCategory } from "@/lib/actions";
import { CircularProgress } from "@mui/material";
import { DashDetails, Listing } from "@/types/types";
import { MdOutlineBookmark } from "react-icons/md";
import { MdBookmarkBorder } from "react-icons/md";
import queryClient from "@/lib/http";
import ListingImage from "./ImageComponent";
import ListingContext from "@/context/ListingContext";
import CategoryHeader from "./CategoryHeader";
import FilterComponent from "./FilterComponent";

const MarketPlaceGrid = () => {
  const [selected, setSelected] = useState<string>("consoles");
  const {
    data: listings,
    isFetching,
    isError,
    error,
  } = useQuery<Listing[]>({
    queryKey: ["listings", selected],
    queryFn: () => getListingByCategory(selected),
    staleTime: 60000,
  });
  const ctx = useContext(ListingContext);
  const dashDetails = queryClient.getQueryData<DashDetails>([
    "dashboard-details",
  ]);

  useEffect(() => {
    if (dashDetails) {
      ctx.setSavedListings(dashDetails.savedListings);
    }
  }, [dashDetails]);
  if (isError) {
    return (
      <div className="flex flex-col gap-4 h-screen items-center justify-center">
        <h1 className="text-5xl font-bold">An Error Occured</h1>
        <p className="text-2xl">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <CategoryHeader setSelected={setSelected} selected={selected} />
      <section className="p-4 h-full flex flex-col">
        <h1 className="text-3xl font-bold">{toTitleCase(selected)}</h1>
        <hr className="w-full my-4" />
        <FilterComponent />
        {isFetching ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid grid-cols-5 h-full w-full p-2 gap-5">
            {listings?.map((listing) => {
              return (
                <div key={listing.listingId} className="flex flex-col gap-2">
                  <ListingImage
                    images={listing.images}
                    listingId={listing.listingId}
                  />
                  <div className="w-full flex justify-between">
                    <p className="text-sm">
                      {listing.listedProduct.productName}
                    </p>
                    {ctx.savedListings &&
                    ctx.savedListings.some(
                      (savedListing) =>
                        savedListing.listingId === listing.listingId
                    ) ? (
                      <motion.button
                        whileTap={{ scale: 1.2 }}
                        transition={{
                          stiffness: 400,
                          duration: 0.6,
                          type: "spring",
                        }}
                        onClick={() => {
                          ctx.removeSavedListingHandler(listing.listingId);
                        }}
                      >
                        <MdOutlineBookmark size={25} />
                      </motion.button>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 1.2 }}
                        transition={{
                          stiffness: 400,
                          duration: 0.6,
                          type: "spring",
                        }}
                        onClick={() => {
                          ctx.addSavedListingHandler(listing);
                        }}
                      >
                        <MdBookmarkBorder size={25} />
                      </motion.button>
                    )}
                  </div>
                  <p className="text-sm text-green-500 font-bold">
                    £{listing.price.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default MarketPlaceGrid;
