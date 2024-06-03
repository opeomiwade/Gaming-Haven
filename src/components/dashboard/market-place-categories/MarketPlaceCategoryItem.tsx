import { Product } from "@/types/types";
import { motion } from "framer-motion";

const MarketPlaceCategoryItem: React.FC<{ product: Product }> = ({
  product,
}) => {
  return (
    <li className="flex justify-between rounded-md hover:cursor-pointer mx-6">
      <div className="flex gap-4 items-center">
        <img
          src={product.images[0].imageUrl}
          alt={product.productName}
          className="h-[50px] w-[50px] rounded-lg"
        />
        <div className="flex flex-col gap-2 items-start">
          <p className="text-white text-xs font-semibold">
            {product.productName}
          </p>
          <p className="text-white text-xs font-semibold">
            Condition: {product.condition}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm font-bold text-green-300">£{product.price}</p>
        <motion.button
          whileHover={{ scale: 1.3 }}
          className="font-bold px-2 bg-black rounded-lg hover:cursor-pointer"
        >
          Buy
        </motion.button>
      </div>
    </li>
  );
};

export default MarketPlaceCategoryItem;
