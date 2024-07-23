import { Order } from "@/types/types";
import classes from "../../CSS/modal.module.css";
import { createPortal } from "react-dom";
import formatDateTime from "@/utils/formatDate";
import { Listing } from "@/types/types";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";

const ReceiptModal: React.FC<{
  purchase: Order;
  open: boolean;
  orderItems: Listing[];
  setClickedPurchase: React.Dispatch<React.SetStateAction<Order | undefined>>;
}> = ({ purchase, open, orderItems, setClickedPurchase }) => {
  const portalElement = document.getElementById("receipt");

  if (!portalElement) {
    return null; // If the target element doesn't exist, render nothing
  }

  return createPortal(
    <dialog open={open} className={`${classes.modal} ${open ? "flex" : ""}`}>
      <div className="rounded-md p-6 bg-white dark:bg-zinc-800 dark:text-white  w-[40%]">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-center mx-auto">
            Gaming Haven Receipt
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setClickedPurchase(undefined)}
          >
            <IoIosClose size={50} />
          </motion.button>
        </header>
        <hr />
        <div className="my-6">
          <p className="text-sm font-semibold">Order ID: {purchase.orderId}</p>
          <p className="text-sm">Date: {formatDateTime(purchase.orderDate)}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Buyer Information</h3>
          <div className="flex items-center gap-2 my-4">
            <img
              src={purchase.buyer.imageUrl}
              className="rounded-full h-[60px] w-[60px]"
            />
            <div className="font-semibold text-md">
              <p className="text-sm">{purchase.buyer.username}</p>
              <p className="text-sm">{purchase.buyer.email}</p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Purchased Items</h3>
          <ul>
            {orderItems.map((item) => (
              <li
                key={item.price}
                className="flex justify-between py-2 border-b border-gray-200"
              >
                <div>
                  <p className="text-sm">{item.listedProduct.productName}</p>
                  <p className="text-xs text-gray-500">
                    Seller: {item.seller.username}
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  £{item.price.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <p className="text-lg font-bold text-right">
            Total: £{purchase.totalPrice.toFixed(2)}
          </p>
        </div>
        <div className="w-full flex justify-center mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="dark:bg-white bg-black dark:text-black text-white font-semibold p-2 rounded-md text-sm w-[40%]"
          >
            Leave Feedback
          </motion.button>
        </div>
      </div>
    </dialog>,
    portalElement
  );
};

export default ReceiptModal;
