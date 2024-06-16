"use client";
import { Listing } from "@/types/types";
import { defaultImageUrl } from "@/utils/imageDataUrl";


const Seller: React.FC<{ listing: Listing }> = ({ listing }) => {
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
