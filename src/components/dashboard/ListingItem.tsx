import { Listing } from "@/types/types";
import { motion } from "framer-motion";

const ListingItem: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <motion.li
      whileHover={{ scale: 1.1 }}
      className="flex hover:cursor-pointer gap-4 md:w-full z-20 items-center justify-around p-2"
    >
      <img
        src={listing.images[0].imageUrl}
        alt={listing.listedProduct.productName}
        className="h-[50px] w-[50px] rounded-lg"
      />
      <div className="flex flex-col items-center">
        <p className="font-normal">{listing.listedProduct.productName}</p>
        <p className="text-xs font-semibold">Condition: {listing.condition}</p>
      </div>
      <p className="text-green-500">£{listing.price}</p>
    </motion.li>
  );
};

export default ListingItem;
