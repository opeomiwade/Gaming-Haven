"use client";
import React, { SetStateAction, createContext, useState } from "react";
import { Listing } from "@/types/types";
import { removeSavedListing, addSavedListing } from "@/lib/http";
import queryClient from "@/lib/http";

const ListingContext = createContext({
  removeSavedListingHandler: (_listingId: number) => {},
  addSavedListingHandler: (_listing: Listing) => {},
  savedListings: [] as Listing[],
  setSavedListings: (_newValue: React.SetStateAction<Listing[]>) => {},
});

export const ListingContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [savedListings, setSavedListings] = useState<Listing[]>([]);

  function removeSavedListingHandler(listingId: number) {
    setSavedListings(() =>
      savedListings.filter(
        (savedListing) => listingId !== savedListing.listingId
      )
    );
    removeSavedListing(listingId).catch((error) => console.log(error));
    queryClient.invalidateQueries({ queryKey: ["dashboard-details"] });
  }

  function addSavedListingHandler(listing: Listing) {
    setSavedListings((prevListings) => [...prevListings, listing]);
    addSavedListing(listing.listingId).catch((error) => console.log(error));
    queryClient.invalidateQueries({ queryKey: ["dashboard-details"] });
  }

  const values = {
    removeSavedListingHandler,
    addSavedListingHandler,
    savedListings,
    setSavedListings,
  };

  return (
    <ListingContext.Provider value={values}>{children}</ListingContext.Provider>
  );
};

export default ListingContext;
