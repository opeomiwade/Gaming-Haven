import { Order } from "@/types/types";
import formatDateTime from "@/utils/formatDate";
import { motion } from "framer-motion";

const purchaseTableRow: React.FC<{ purchase: Order }> = ({ purchase }) => {
  return (
    <li className="flex p-4 justify-between items-center bpurchase-b-[1px] font-light text-sm">
      <p className="font-bold w-[10%]">{purchase.orderId}</p>
      <div className="flex flex-col items-start justify-center w-[50%]">
        {purchase.listing.map((listing) => {
          return (
            <p key={listing.listedProduct.productId} className="text-sm">
              {listing.listedProduct.productName}{" "}
              <span className="font-semibold">from</span>{" "}
              <span className="underline">{listing.seller.username}</span>
            </p>
          );
        })}
      </div>
      <p className="w-[20%]">{formatDateTime(purchase.orderDate)}</p>
      <p className="font-semibold w-[10%] text-left">£{purchase.totalPrice.toFixed(2)}</p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="w-[10%] font-bold rounded-md p-2 bg-gray-300 dark:bg-zinc-800"
      >
        View Receipt
      </motion.button>
    </li>
  );
};

export default purchaseTableRow;
