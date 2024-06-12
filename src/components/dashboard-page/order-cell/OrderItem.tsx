import { Order } from "@/types/types";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import formatDateTime from "@/utils/formatDate";
import Link from "next/link";

const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
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
            Total:{" "}
            <span className="font-bold">£{order.totalPrice.toFixed(2)}</span>
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
