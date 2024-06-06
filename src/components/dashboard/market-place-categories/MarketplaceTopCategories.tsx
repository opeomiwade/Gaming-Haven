import Tabs from "@/components/ui/NavTabs";
import axiosInstance from "@/lib/axiosInstance";
import { Listing } from "@/types/types";
import { useEffect, useState } from "react";
import MarketPlaceCategoryItem from "../market-place-categories/MarketPlaceCategoryItem";

const MarketPlaceTopCategories = () => {
  const [selected, setSelected] = useState<string>("Consoles");
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`/listings/category/${selected.toLowerCase()}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")!
          )}`,
        },
      })
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => console.log(error));
  }, [selected]);

  return (
    <>
      <Tabs
        layoutId="active-tab-market-place-cat"
        tabs={["Consoles", "Controllers", "Headphones"]}
        selected={selected}
        setSelected={setSelected}
      />
      <ul className="mt-4 space-y-6 h-[60%] overflow-y-auto">
        {listings.map((listing) => (
          <MarketPlaceCategoryItem key={listing.listingId} listing={listing} />
        ))}
      </ul>
    </>
  );
};

export default MarketPlaceTopCategories;
