"use client";
import { Listing } from "@/types/types";
import Image from "next/image";
import { defaultImageUrl } from "@/utils/imageDataUrl";

const Seller: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <>
      <hr className="w-full" />
      <div className="flex  gap-2">
        <div className="rounded-full h-[70px] w-[70px] relative">
          <Image
            src={listing.seller.imageUrl || defaultImageUrl}
            alt={listing.seller.username}
            className="rounded-full"
            fill
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-sm">{listing.seller.username}</p>
        </div>
      </div>
      <hr className="w-full" />
    </>
  );
};

export default Seller;
