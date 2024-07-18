import Tabs from "@/components/ui/NavTabs";
import { Listing, FilterQueryParams } from "@/types/types";
import { useEffect, useState } from "react";
import MarketPlaceCategoryItem from "./MarketPlaceCategoryItem";
import { filterListings } from "@/lib/actions";
import { CircularProgress } from "@mui/material";

const MarketPlaceTopCategories = () => {
  const [filters, setFilters] = useState<FilterQueryParams>({
    categoryName: "Consoles",
  });
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    filterListings(filters)
      .then((response) => {
        setListings(response);
      })
      .catch((error) => console.log(error));
  }, [filters]);

  return (
    <>
      <Tabs
        layoutId="active-tab-marketplace-cat"
        tabs={["Consoles", "Controllers", "Headphones"]}
        filters={filters}
        setFilters={setFilters}
      />
      <ul className="mt-4 space-y-6 h-[60%] overflow-y-auto">
        {listings == undefined ? (
          <CircularProgress />
        ) : (
          listings.map((listing) => (
            <MarketPlaceCategoryItem
              key={listing.listingId}
              listing={listing}
            />
          ))
        )}
      </ul>
    </>
  );
};

export default MarketPlaceTopCategories;
