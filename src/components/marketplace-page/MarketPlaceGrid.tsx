"use client";
import { useEffect, useState, useContext } from "react";
import toTitleCase from "@/utils/toTitleCase";
import { useQuery } from "@tanstack/react-query";
import { getListingByCategory } from "@/lib/actions";
import { CircularProgress } from "@mui/material";
import { DashDetails, Listing } from "@/types/types";
import queryClient from "@/lib/http";
import ListingContext from "@/context/ListingContext";
import CategoryHeader from "./CategoryHeader";
import FilterComponent from "./FilterComponent";
import MarketListing from "./MarketListing";

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
              return <MarketListing listing={listing} />;
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default MarketPlaceGrid;
