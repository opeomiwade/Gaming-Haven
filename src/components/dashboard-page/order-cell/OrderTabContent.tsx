import { useState } from "react";
import { DashDetails } from "@/types/types";
import OrderList from "./OrderList";
import Tabs from "@/components/ui/NavTabs";
import Link from "next/link";
import { motion } from "framer-motion";
import Listings from "../Listings";
import EmptyPlaceHolder from "@/components/ui/EmptyPlaceHolder";

const Orders: React.FC<{ dashDetails: DashDetails }> = ({ dashDetails }) => {
  const [selected, setSelected] = useState<string>("Purchases");
  return (
    <div className="relative h-full">
      <Tabs
        tabs={["Purchases", "Sales"]}
        setSelected={setSelected}
        selected={selected}
        layoutId="active-tab-orders"
      />
      <hr className="my-4" />
      {selected === "Purchases" && <OrderList orders={dashDetails.orders} />}
      {selected === "Sales" ? (
        dashDetails.soldListings && dashDetails.soldListings.length > 0 ? (
          <Listings listings={dashDetails.soldListings} />
        ) : (
          <EmptyPlaceHolder
            messageText="You have made no sales"
            buttonText="View Store"
            href="/my-store"
          />
        )
      ) : null}

      {(selected === "Purchases" && dashDetails.orders.length > 0) ||
      (selected === "Sales" && dashDetails.soldListings.length > 0) ? (
        <div className="absolute w-full bottom-4">
          <hr className="my-4" />
          <Link
            href={
              selected === "Purchases" ? "/orders/purchases" : "/orders/sales"
            }
          >
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "gray" }}
              transition={{ type: "spring", stiffness: 500 }}
              className="text-lg dark:bg-black bg-gray-300 p-2 rounded-lg w-full"
            >
              {selected.toLowerCase() === "purchases"
                ? "View All Orders"
                : "View All Sales"}
            </motion.button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Orders;
