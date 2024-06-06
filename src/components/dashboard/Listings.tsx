import { Listing } from "@/types/types";
import ListingItem from "./ListingItem";

const Listings: React.FC<{ listings: Listing[] }> = ({ listings }) => {
  return (
    <ul className="space-y-6 overflow-y-auto max-h-[70%]">
      {listings.map((listing) => {
        return <ListingItem key={listing.listingId} listing={listing} />;
      })}
    </ul>
  );
};

export default Listings;
