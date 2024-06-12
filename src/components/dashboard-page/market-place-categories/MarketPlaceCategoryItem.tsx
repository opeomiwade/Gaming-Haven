import { Listing } from "@/types/types";
import { motion } from "framer-motion";

const MarketPlaceCategoryItem: React.FC<{ listing: Listing }> = ({
  listing,
}) => {
  return (
    <li className="flex justify-between rounded-md hover:cursor-pointer mx-6">
      <div className="flex gap-4 items-center">
        <img
          src={listing.images[0].imageUrl}
          alt={listing.listedProduct.productName}
          className="h-[50px] w-[50px] rounded-lg"
        />
        <div className="flex flex-col gap-2 items-start">
          <p className="text-xs font-semibold">
            {listing.listedProduct.productName}
          </p>
          <p className="text-xs font-semibold">
            Condition: {listing.condition}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[10%] items-center">
        <p className="text-sm font-bold text-green-500">£{listing.price.toFixed(2)}</p>
        <motion.button
          whileHover={{ scale: 1.3 }}
          className="font-bold px-2 dark:bg-black bg-gray-300 rounded-lg hover:cursor-pointer"
        >
          Buy
        </motion.button>
      </div>
    </li>
  );
};

export default MarketPlaceCategoryItem;
