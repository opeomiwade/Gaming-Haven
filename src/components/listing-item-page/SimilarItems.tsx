import { Listing } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

function SimilarItems({
  similarItems,
  activeListing,
}: {
  similarItems: Listing[];
  activeListing: Listing;
}) {
  return (
    <div className="grid grid-cols-5 gap-6 h-full">
      {similarItems
        .filter((item) => item.listingId !== activeListing.listingId)
        .map((item: Listing) => {
          return (
            <Link
              href={`/listings/${item.listingId}`}
              key={item.listingId}
              className="flex flex-col justify-center relative h-full p-2 rounded-md gap-2"
            >
              <div className="relative h-[150px]">
                <Image
                  src={item.images[0].imageUrl}
                  alt={item.listedProduct.productName}
                  fill
                />
              </div>
              <p className="text-sm">{item.listedProduct.productName}</p>
              <p className="font-semibold text-left text-green-500">
                £{item.price.toFixed(2)}
              </p>
            </Link>
          );
        })}
    </div>
  );
}

export default SimilarItems;
