import { Product } from "@/types/types";
import { motion } from "framer-motion";

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <motion.li
      whileHover={{ scale: 1.1 }}
      className="flex hover:cursor-pointer gap-4 md:w-full z-20 items-center justify-around p-2"
    >
      <img
        src={product.images[0].imageUrl}
        alt={product.productName}
        className="h-[50px] w-[50px] rounded-lg"
      />
      <div className="flex flex-col items-center">
        <p className="font-normal">{product.productName}</p>
        <p className="text-xs font-semibold">Condition: {product.condition}</p>
      </div>
      <p className="text-green-300">£{product.price}</p>
    </motion.li>
  );
};

export default ProductItem;
