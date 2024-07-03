import { getListing, filterListings } from "@/lib/actions";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import Image from "next/image";
import { Listing } from "@/types/types";
import { GoDotFill } from "react-icons/go";
import formatDateTime from "@/utils/formatDate";
import Seller from "@/components/listing-item-page/SellerFooter";
import Actions from "@/components/listing-item-page/ListingItemActions";
import { notFound } from "next/navigation";
import SimilarItems from "@/components/listing-item-page/SimilarItems";
import NoSSRWrapper from "@/components/client-wrappers/NoSSRWrapper";

const ListingPage: React.FC<{ params: any }> = async ({ params }) => {
  const listing = (await getListing(params.listingId).catch((error) => {
    if (error.statusCode === 404) {
      notFound();
    }
  })) as Listing;

  const similarItems = (await filterListings({
    categoryName: listing.listedProduct.category.name,
  })) as Listing[];

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
        <section className="flex gap-4 w-full h-full">
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
          <NoSSRWrapper>
            <div className="flex flex-col font-light gap-4 p-6 sticky top-[150px] h-full w-[40%]">
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

              <Actions
                seller={listing.seller}
                category={listing.listedProduct.category}
              />
              <Seller listing={listing} />
            </div>{" "}
          </NoSSRWrapper>
        </section>
        <SimilarItems activeListing={listing} similarItems={similarItems} />
      </main>
    </Suspense>
  );
};

export default ListingPage;
