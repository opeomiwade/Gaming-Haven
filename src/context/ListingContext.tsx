"use client";
import React, { createContext, useState } from "react";
import { Listing } from "@/types/types";
import { removeSavedListing, addSavedListing } from "@/lib/http";
import queryClient from "@/lib/http";
import { FilterQueryParams } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

const ListingContext = createContext({
  removeSavedListingHandler: (_listingId: number) => {},
  addSavedListingHandler: (_listing: Listing) => {},
  savedListings: [] as Listing[],
  setSavedListings: (_newValue: React.SetStateAction<Listing[]>) => {},
  filters: {} as FilterQueryParams,
  setFilters: (_newValue: React.SetStateAction<FilterQueryParams>) => {},
  removeFilter: (_filterKey: string, _filterCondition: string) => {},
  editListing: () => {},
  deleteListing: () => {},
});

export const ListingContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [filters, setFilters] = useState<FilterQueryParams>({
    categoryName: "consoles",
  });

  function removeSavedListingHandler(listingId: number) {
    setSavedListings(() =>
      savedListings.filter(
        (savedListing) => listingId !== savedListing.listingId
      )
    );
    removeSavedListing(listingId).catch((error) => console.log(error));
    queryClient.invalidateQueries({ queryKey: ["dashboard-details"] });
  }

  function removeFilter(filterKey: string, filterCondition: string) {
    if (filterKey == "manufacturers" || filterKey == "condition") {
      const updatedValues = filters[filterKey]?.filter(
        (value) => value.toLowerCase() !== filterCondition.toLowerCase()
      );
      setFilters((prevFilters) => {
        return { ...prevFilters, [filterKey]: updatedValues };
      });
    } else {
      const updateFilters = Object.fromEntries(
        Object.entries(filters).filter((entry) => !entry.includes(filterKey))
      ) as FilterQueryParams;
      setFilters(updateFilters);
    }
  }

  function addSavedListingHandler(listing: Listing) {
    setSavedListings((prevListings) => [...prevListings, listing]);
    addSavedListing(listing.listingId).catch((error) => console.log(error));
    queryClient.invalidateQueries({ queryKey: ["dashboard-details"] });
  }

  function editListing() {
    console.log("ope");
  }

  function deleteListing() {
    console.log("ope");
  }

  const values = {
    removeSavedListingHandler,
    addSavedListingHandler,
    savedListings,
    setSavedListings,
    filters,
    setFilters,
    removeFilter,
    editListing,
    deleteListing,
  };

  return (
    <ListingContext.Provider value={values}>{children}</ListingContext.Provider>
  );
};

export default ListingContext;
