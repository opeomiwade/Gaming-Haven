import { useState } from "react";
import { Image as ImageType } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

const ListingImage: React.FC<{ images: ImageType[]; listingId: number }> = ({
  images,
  listingId,
}) => {
  const [imageHover, setHover] = useState<boolean>(false);
  if (images.length > 0 && images.length < 2) {
    return (
      <Link href={`/listings/${listingId}`}>
        <div className="w-full h-full hover:cursor-pointer">
          <div className="relative h-[200px] w-full">
            <Image src={images[0].imageUrl} fill alt="" />
          </div>
        </div>
      </Link>
    );
  }

  return !imageHover && images.length > 0 ? (
    <Link href={`/listings/${listingId}`}>
      <div
        className="w-full h-full hover:cursor-pointer"
        onMouseEnter={() => setHover(true)}
      >
        <div className="relative h-[200px] w-full">
          <Image src={images[0].imageUrl} fill alt="" />
        </div>
      </div>
    </Link>
  ) : (
    <Link href={`/listings/${listingId}`}>
      <div
        className="w-full h-full hover:cursor-pointer"
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative h-[200px] w-full">
          <Image
            src={images[1] ? images[1].imageUrl : ""}
            className="h-[200px] w-full"
            fill
            alt=""
          />
        </div>
      </div>
    </Link>
  );
};

export default ListingImage;
