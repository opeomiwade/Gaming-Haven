import { Order, currentUserState } from "@/types/types";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import formatDateTime from "@/utils/formatDate";
import { useSelector } from "react-redux";
import Link from "next/link";

const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
  const currentUsername = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user.username
  );

  const soldTab = currentUsername === order.seller.username;
  return (
    <Link href={`/orders/${order.orderId}`}>
      <motion.li
        whileHover={{ scale: 1.1 }}
        className="flex hover:cursor-pointer gap-4 md:w-[90%] z-20 items-center justify-between p-2 mx-auto"
      >
        <div className="flex flex-col gap-2 text-sm">
          <p>
            Order Id: <span className="font-bold">{order.orderId}</span>
          </p>
          <p>
            {soldTab ? "Bought by" : "Sold By"}:{" "}
            <span className="font-bold">
              {soldTab ? order.buyer.username : order.seller.username}
            </span>
          </p>
          <p className="dark:text-gray-300 text-teal-300 font-bold">
            Bought on:{" "}
            <span className="font-[400] text xs">
              {formatDateTime(order.orderDate)}
            </span>
          </p>
        </div>
        <ArrowForwardIosIcon />
      </motion.li>
    </Link>
  );
};

export default OrderItem;
