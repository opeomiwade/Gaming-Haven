import { getListing, filterListings, getListingOffers } from "@/lib/actions";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import Image from "next/image";
import { Listing, Offer } from "@/types/types";
import { GoDotFill } from "react-icons/go";
import formatDateTime from "@/utils/formatDate";
import Seller from "@/components/listing-item-page/SellerFooter";
import Actions from "@/components/listing-item-page/ListingItemActions";
import { notFound } from "next/navigation";
import SimilarItems from "@/components/listing-item-page/SimilarItems";
import NoSSRWrapper from "@/components/client-wrappers/NoSSRWrapper";
import ReturnButton from "@/components/ui/ReturnButton";

const ListingPage: React.FC<{ params: any }> = async ({ params }) => {
  const listing = (await getListing(params.listingId).catch((error) => {
    if (error.statusCode === 404) {
      notFound();
    }
  })) as Listing;

  const offers = (await getListingOffers(params.listingId).catch((error) => {
    if (error.statusCode === 404) {
      notFound();
    }
  })) as Offer[];

  const similarItems = (await filterListings({
    categoryName: listing.listedProduct && listing.listedProduct.category.name,
  })) as Listing[];

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <CircularProgress />
        </div>
      }
    >
      <header className="px-6 py-4">
        <h1 className="text-2xl font-bold">
          {listing.listedProduct.productName}
        </h1>
        <ReturnButton />
      </header>

      <main className="flex flex-col gap-2 p-6">
        <section className="flex flex-col md:flex-row gap-4 w-full h-full">
          <div className="md:w-[50%] w-full p-6">
            <ul className="flex flex-col gap-2 h-full">
              {listing.images.map((image) => {
                return (
                  <div key={image.imageId} className="relative h-[400px]">
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
            <div className="flex flex-col font-light gap-4 p-6 sticky top-[150px] h-full md:w-[40%] w-full">
              <header className="flex gap-4 items-center">
                <h2 className="font-bold text-lg">£{listing.price}</h2>
                {offers.length > 0 && (
                  <div className="bg-green-100 rounded-md text-black text-xs p-1 font-semibold flex items-center gap-2">
                    <span style={{ fontSize: "20px" }}>💷</span>
                    {offers.length} offer(s)
                  </div>
                )}
              </header>
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
