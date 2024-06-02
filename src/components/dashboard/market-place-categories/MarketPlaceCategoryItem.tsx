import { Product } from "@/types/types";
import { motion } from "framer-motion";

const MarketPlaceCategoryItem: React.FC<{ product: Product }> = ({
  product,
}) => {
  return (
    <motion.li
      className="flex justify-between z-20 p-2 rounded-md hover:cursor-pointer"
    >
      <div className="flex gap-4 items-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-5b47d.appspot.com/o/account%20circle.jpeg?alt=media&token=ec3c29d8-5b89-447b-ac2e-651af9e4e394"
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
          whileHover={{ scale: 1.2}}
          className="font-bold px-2 bg-black rounded-lg hover: cursor-pointer"
        >
          Buy
        </motion.button>
      </div>
    </motion.li>
  );
};

export default MarketPlaceCategoryItem;
