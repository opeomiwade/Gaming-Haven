import { Listing } from "@/types/types";
import Image from "next/image";
import Button from "./StoreItemButton";

const StoreItem: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <article className="flex flex-col gap-2 rounded-lg shadow-lg dark:bg-zinc-800 bg-white h-[400px]">
      <header className="h-[70%] w-full flex flex-col gap-2">
        <div className="relative h-full object-cover">
          <Image
            src={listing.images[0].imageUrl}
            fill
            className="rounded-t-md"
            alt={listing.listedProduct.productName}
          />
          {listing.status === "sold" && (
            <>
              <div className="absolute inset-0 bg-gray-700 opacity-50 rounded-t-md"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-4xl font-bold bg-yellow-500 px-6 py-3 rounded shadow-lg">
                  Sold
                </span>
              </div>
            </>
          )}
        </div>
        <div className="p-2">
          <div className="flex justify-between">
            <h2>{listing.listedProduct.productName}</h2>
            <p className="text-green-500">£{listing.price}</p>
          </div>
          <p className="text-xs text-gray-400">
            by {listing.listedProduct.manufacturer}
          </p>
        </div>
      </header>
      <div className="flex flex-col gap-2 p-2 relative">
        <p className="text-sm font-extralight">{listing.description}</p>
        <p className="text-sm">
          Condition: <span className="font-bold">{listing.condition}</span>
        </p>
      </div>
      <div className="text-right p-2">
        <Button listingId={listing.listingId} />
      </div>
    </article>
  );
};

export default StoreItem;
