"use client";
import { Listing } from "@/types/types";

const Seller: React.FC<{ listing: Listing }> = ({ listing }) => {
  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/instagram-clone-5b47d.appspot.com/o/account%20circle.jpeg?alt=media&token=ec3c29d8-5b89-447b-ac2e-651af9e4e394";
  return (
    <>
      <hr className="w-full" />
      <div className="flex  gap-2">
        <img
          src={listing.seller.imageUrl || defaultImageUrl}
          className="rounded-full h-[70px] w-[70px]"
        />
        <div className="flex flex-col">
          <p className="font-bold text-sm">{listing.seller.username}</p>
        </div>
      </div>
      <hr className="w-full" />
    </>
  );
};

export default Seller;
