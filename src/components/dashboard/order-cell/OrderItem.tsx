import { Order, currentUserState } from "@/types/types";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import formatDateTime from "@/utils/formatDate";
import { useSelector } from "react-redux";

const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
  const currentUsername = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user.username
  );

  const soldTab = currentUsername === order.seller.username;
  return (
    <motion.li
      whileHover={{ scale: 1.1 }}
      className="flex hover:cursor-pointer gap-4 md:w-full z-20 items-center justify-around p-2"
    >
      <div className="flex flex-col gap-2 text-sm">
        <p className="text-white">
          Order Id: <span className="font-bold">{order.orderId}</span>
        </p>
        <p>
          {soldTab ? "Bought by" : "Sold By"}:{" "}
          <span className="font-bold">
            {soldTab ? order.buyer.username : order.seller.username}
          </span>
        </p>
        <p className="text-gray-300 font-bold">
          Bought on:{" "}
          <span className="font-[400] text xs">
            {formatDateTime(order.orderDate)}
          </span>
        </p>
      </div>
      <p>
        {soldTab ? "Income" : "Expense"}: <span className="text-green-300">£{order.totalPrice}</span>
      </p>
      <ArrowForwardIosIcon />
    </motion.li>
  );
};

export default OrderItem;
