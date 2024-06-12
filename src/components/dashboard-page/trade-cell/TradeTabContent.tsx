import { useState } from "react";
import { DashDetails } from "@/types/types";
import TradeList from "./TradeList";
import Tabs from "@/components/ui/NavTabs";
import Link from "next/link";
import { motion } from "framer-motion";

const Trades: React.FC<{ dashDetails: DashDetails }> = ({ dashDetails }) => {
  const [selected, setSelected] = useState<string>("Sent");
  return (
    <>
      <Tabs
        tabs={["Sent", "Received"]}
        setSelected={setSelected}
        selected={selected}
        layoutId="active-tab-trades"
      />
      <hr className="my-4" />
      {selected === "Sent" && (
        <TradeList
          trades={dashDetails.sentTrades}
          emptyPlaceHolderText="You have made no trade offers"
        />
      )}
      {selected === "Received" && (
        <TradeList
          trades={dashDetails.receivedTrades}
          emptyPlaceHolderText="You  have received no trade offers"
        />
      )}
      {(selected === "Sent" && dashDetails.orders.length > 0) ||
      (selected === "Received" && dashDetails.soldListings.length > 0) ? (
        <div className="relative bottom-0">
          <hr className="my-4" />
          <Link href="/trades">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "gray" }}
              transition={{ type: "spring", stiffness: 500 }}
              className="text-lg dark:bg-black bg-gray-300 p-2 rounded-lg w-full"
            >
              View All Trades
            </motion.button>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default Trades;
