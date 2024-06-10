import { Listing } from "@/types/types";
import ListingItem from "./ListingItem";
import Link from "next/link";

const Listings: React.FC<{ listings: Listing[] }> = ({ listings }) => {
  return (
    <ul className="space-y-6 overflow-y-auto max-h-[70%] overflow-x-hidden">
      {listings.map((listing) => {
        return (
          <Link key={listing.listingId} href={`/listings/${listing.listingId}`}>
            <ListingItem listing={listing} />
          </Link>
        );
      })}
    </ul>
  );
};

export default Listings;
