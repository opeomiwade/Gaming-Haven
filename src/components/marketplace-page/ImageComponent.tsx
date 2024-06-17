import { useState } from "react";
import { Image } from "@/types/types";
import Link from "next/link";

const ListingImage: React.FC<{ images: Image[]; listingId: number }> = ({
  images,
  listingId,
}) => {
  const [imageHover, setHover] = useState<boolean>(false);
  if (images.length < 2) {
    return (
      <img
        src={images[0].imageUrl}
        className="h-[200px] w-full hover:cursor-pointer"
      />
    );
  }

  return !imageHover ? (
    <Link href={`/listings/${listingId}`}>
      <div
        className="w-full h-full hover:cursor-pointer"
        onMouseEnter={() => setHover(true)}
      >
        <img src={images[0].imageUrl} className="h-[200px] w-full" />
      </div>
    </Link>
  ) : (
    <Link href={`/listings/${listingId}`}>
      <div
        className="w-full h-full hover:cursor-pointer"
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={images[1] ? images[1].imageUrl : ""}
          className="h-[200px] w-full"
        />
      </div>
    </Link>
  );
};

export default ListingImage;
