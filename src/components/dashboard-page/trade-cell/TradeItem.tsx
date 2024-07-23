import { TradeDetails } from "@/types/types";
import { motion } from "framer-motion";
import Image from "next/image";
import formatDateTime from "@/utils/formatDate";
import { useSelector } from "react-redux";
import { currentUserState } from "@/types/types";
import { FcCancel } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";
import { updateTrade } from "@/lib/actions";
import toast from "react-hot-toast";

const TradeItem: React.FC<{
  trade: TradeDetails;
  setTrades: React.Dispatch<React.SetStateAction<TradeDetails[]>>;
}> = ({ trade, setTrades }) => {
  const getClassName = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "pending":
        return "text-amber-400";
      case "declined":
        return "text-red-500";
      default:
        return "";
    }
  };

  const currentUser = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user
  );

  const isSeller = currentUser.username === trade.recipient.username;

  return (
    <motion.li className="flex z-20 justify-between items-center p-2 rounded-md">
      <main className="flex gap-2 items-center">
        <div className="relative h-[80px] w-[80px]">
          <Image
            className="rounded-md"
            fill
            src={trade.requestedItem.images[0].imageUrl}
            alt={trade.requestedItem.listedProduct.productName}
          />
        </div>
        <div className="flex flex-col text-sm">
          <h4 className="font-bold w-[200px] truncate">
            {trade.requestedItem.listedProduct.productName}
          </h4>
          <p>
            Status:{" "}
            <span className={getClassName(trade.tradeStatus)}>
              {trade.tradeStatus}
            </span>
          </p>
          <p className="font-extralight text-xs">
            {formatDateTime(trade.createdAt)}
          </p>
        </div>
      </main>

      {isSeller ? (
        <div className="flex gap-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.2 }}
            className="hover:cursor-pointer"
            onClick={() => {
              setTrades((currTrades) => {
                return currTrades.map((currTrade) => {
                  if (currTrade.id === trade.id) {
                    return { ...trade, tradeStatus: "completed" };
                  } else {
                    return trade;
                  }
                });
              });
              toast.success("Trade has been accepted");
              updateTrade(trade.id, "accept");
            }}
          >
            <FcCheckmark size={30} />
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.2 }}
            className="hover:cursor-pointer"
            onClick={() => {
              setTrades((currTrades) => {
                return currTrades.map((currTrade) => {
                  if (currTrade.id === trade.id) {
                    return { ...trade, tradeStatus: "declined" };
                  } else {
                    return trade;
                  }
                });
              });
              toast.success("Trade has been declined");
              updateTrade(trade.id, "decline");
            }}
          >
            <FcCancel size={30} />
          </motion.button>
        </div>
      ) : (
        <motion.button
          className="bg-gray-300 dark:bg-black p-2 rounded-lg text-sm"
          whileHover={{ scale: 1.1 }}
        >
          View Details
        </motion.button>
      )}
    </motion.li>
  );
};

export default TradeItem;
