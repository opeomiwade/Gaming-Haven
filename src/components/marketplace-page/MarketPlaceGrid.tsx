"use client";
import { useEffect, useContext } from "react";
import toTitleCase from "@/utils/toTitleCase";
import { useQuery } from "@tanstack/react-query";
import { filterListings } from "@/lib/actions";
import { CircularProgress } from "@mui/material";
import { DashDetails, Listing } from "@/types/types";
import queryClient from "@/lib/http";
import ListingContext from "@/context/ListingContext";
import CategoryHeader from "./CategoryHeader";
import FilterComponent from "./FilterComponent";
import MarketListing from "./MarketListing";

const MarketPlaceGrid = () => {
  const ctx = useContext(ListingContext);

  const {
    data: listings,
    isFetching,
    isError,
    error,
  } = useQuery<Listing[]>({
    queryKey: ["listings", ctx.filters],
    queryFn: () => filterListings(ctx.filters),
    staleTime: 5000,
  });
  
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
      <CategoryHeader />
      <section className="p-4 h-full flex flex-col">
        <h1 className="text-3xl font-bold">
          {ctx.filters.categoryName == "pcs"
            ? ctx.filters.categoryName.toUpperCase()
            : toTitleCase(ctx.filters.categoryName!)}
        </h1>
        <hr className="w-full my-4" />
        <FilterComponent />
        {isFetching ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-full w-full p-2 gap-5 ">
            {listings?.map((listing) => {
              return (
                <MarketListing key={listing.listingId} listing={listing} />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default MarketPlaceGrid;
