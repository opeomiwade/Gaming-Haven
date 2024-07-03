import { Listing } from "@/types/types";
import ListingImage from "./ImageComponent";
import { motion } from "framer-motion";
import { MdOutlineBookmark } from "react-icons/md";
import { MdBookmarkBorder } from "react-icons/md";
import { useContext } from "react";
import ListingContext from "@/context/ListingContext";
import NoSSRWrapper from "../client-wrappers/NoSSRWrapper";

const MarketListing: React.FC<{
  listing: Listing;
}> = ({ listing }) => {
  const ctx = useContext(ListingContext);
  return (
    <div className="flex flex-col gap-2">
      <NoSSRWrapper>
        <ListingImage images={listing.images} listingId={listing.listingId} />
      </NoSSRWrapper>
      <div className="w-full flex justify-between">
        <p className="text-sm">{listing.listedProduct.productName}</p>
        {ctx.savedListings &&
        ctx.savedListings.some(
          (savedListing) => savedListing.listingId === listing.listingId
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
};

export default MarketListing;
