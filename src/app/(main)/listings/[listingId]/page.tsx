import { getListing, getListingByCategory } from "@/lib/actions";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import Image from "next/image";
import { Listing } from "@/types/types";
import { GoDotFill } from "react-icons/go";
import formatDateTime from "@/utils/formatDate";
import Seller from "@/components/listing-item-page/SellerFooter";
import Actions from "@/components/listing-item-page/ListingItemActions";
import Link from "next/link";
import { notFound } from "next/navigation";

const StoreItem: React.FC<{ params: any }> = async ({ params }) => {
  const listing = (await getListing(params.listingId).catch((error) => {
    if (error.statusCode === 404) {
      notFound();
    }
  })) as Listing;

  const similarItems = (await getListingByCategory(
    listing.listedProduct.category.name
  )) as Listing[];
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <CircularProgress />
        </div>
      }
    >
      <h1 className="text-2xl font-bold px-6 py-4">
        {listing.listedProduct.productName}
      </h1>
      <main className="flex flex-col gap-2 p-6">
        <section className="flex gap-2 w-full h-full">
          <div className="w-[50%] p-6">
            <ul className="flex flex-col gap-2 h-screen">
              {listing.images.map((image) => {
                return (
                  <div key={image.imageId} className="relative h-full">
                    <Image
                      src={image.imageUrl}
                      fill
                      alt={listing.listedProduct.productName}
                    />
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col font-light gap-4 p-6 sticky top-[150px] h-full">
            <h2 className="font-bold text-lg">£{listing.price}</h2>
            <p className="flex items-center gap-2">
              {listing.condition} <GoDotFill size={8} />{" "}
              <span className="underline font-semibold">
                {listing.listedProduct.manufacturer}
              </span>
            </p>
            <p>{listing.description}</p>
            <p className="text-gray-400 font-semibold text-xs">
              Listed {formatDateTime(listing.createdAt)}
            </p>
            <Actions seller={listing.seller} />
            <Seller listing={listing} />
          </div>
        </section>
        <section className="flex flex-col gap-2 w-full h-full">
          <h3 className="font-bold text-xl">Similar Items</h3>
          <div className="grid grid-cols-5 gap-6 h-full">
            {similarItems
              .filter((item) => item.listingId !== listing.listingId)
              .map((item: Listing) => {
                return (
                  <Link
                    href={`/listings/${item.listingId}`}
                    key={item.listingId}
                    className="flex flex-col justify-center relative h-full p-2 rounded-md gap-2"
                  >
                    <Image
                      src={item.images[0].imageUrl}
                      alt={item.listedProduct.productName}
                      height={300}
                      width={300}
                    />
                    <p className="text-sm">{item.listedProduct.productName}</p>
                    <p className="font-semibold text-left text-green-500">
                      £{listing.price}
                    </p>
                  </Link>
                );
              })}
          </div>
        </section>
      </main>
    </Suspense>
  );
};

export default StoreItem;
