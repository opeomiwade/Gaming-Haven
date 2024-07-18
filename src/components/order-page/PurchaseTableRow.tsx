import { Listing, Order } from "@/types/types";
import formatDateTime from "@/utils/formatDate";
import { motion } from "framer-motion";
import { getOrderItems } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import ReceiptModal from "../modals/ReceiptModal";
import { useState } from "react";

const PurchaseTableRow: React.FC<{
  purchase: Order;
}> = ({ purchase }) => {
  const { data: orderItems, isFetching } = useQuery<Listing[]>({
    queryKey: ["order-items", { orderId: purchase.orderId }],
    queryFn: () => getOrderItems(purchase.orderId),
    staleTime: 60000,
  });
  const [clickedPurchase, setClickedPurchase] = useState<Order | undefined>();

  if (isFetching) return <p className="loading p-4">Loading....</p>;

  return (
    <>
      <ReceiptModal
        purchase={purchase}
        open={
          clickedPurchase !== undefined &&
          clickedPurchase.orderId === purchase.orderId
        }
        orderItems={orderItems!}
        setClickedPurchase={setClickedPurchase}
      />
      <li className="flex p-4 justify-between items-center border-b-[1px] font-light text-sm">
        <p className="font-bold w-[10%]">{purchase.orderId}</p>
        <div className="flex flex-col items-start justify-center w-[50%]">
          {orderItems?.map((item) => {
            return (
              <p key={item.listedProduct.productId} className="text-sm">
                {item.listedProduct.productName}{" "}
                <span className="font-semibold">from</span>{" "}
                <span className="underline">{item.seller.username}</span>
              </p>
            );
          })}
        </div>
        <p className="w-[20%]">{formatDateTime(purchase.orderDate)}</p>
        <p className="font-semibold w-[10%] text-left">
          £{purchase.totalPrice.toFixed(2)}
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="w-[10%] font-bold rounded-md p-2 bg-gray-300 dark:bg-zinc-800"
          onClick={() => setClickedPurchase(purchase)}
        >
          View Receipt
        </motion.button>
      </li>
    </>
  );
};

export default PurchaseTableRow;
