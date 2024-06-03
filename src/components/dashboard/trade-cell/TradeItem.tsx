import { TradeDetails } from "@/types/types";
import { motion } from "framer-motion";
import TradeIcon from "@mui/icons-material/SwapHoriz";

const TradeItem: React.FC<{ trade: TradeDetails }> = ({ trade }) => {
  return (
    <motion.li
      whileHover={{ scale: 1.1 }}
      className="flex justify-around z-20 items-center p-2 rounded-md hover:cursor-pointer"
    >
      <div className="flex flex-col items-center gap-2 w-fit">
        <p className="text-xs max-w-[100px] truncate text-green-300 font-semibold">
          {trade.product1.productName}
        </p>
        <div className="border-green-300 border-2 rounded-lg p-[2px]">
          <img
            src={trade.product1.images[0].imageUrl}
            className="h-[50px] w-[50px] rounded-lg"
          />
        </div>

        <p className="text-white text-xs text-center">
          <span className="font-bold">from: </span>
          {trade.user1.username}
        </p>
      </div>
      <TradeIcon style={{ fontSize: "50px" }} />
      <div className="flex flex-col items-center gap-2 w-fit">
        <p className="text-xs max-w-[100px] truncate text-green-300 font-semibold">
          {trade.product2.productName}
        </p>
        <div className="border-green-300 border-2 rounded-lg p-[2px]">
          <img
            src={trade.product2.images[0].imageUrl}
            className="h-[50px] w-[50px] rounded-lg"
          />
        </div>

        <p className="text-white text-xs text-center">
          <span className="font-bold">from: </span> {trade.user2.username}
        </p>
      </div>
    </motion.li>
  );
};

export default TradeItem;
