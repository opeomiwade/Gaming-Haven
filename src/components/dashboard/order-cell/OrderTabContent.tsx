import { useState } from "react";
import { DashDetails } from "@/types/types";
import OrderList from "./OrderList";
import Tabs from "@/components/ui/NavTabs";
import Link from "next/link";
import { motion } from "framer-motion";

const Orders: React.FC<{ dashDetails: DashDetails }> = ({ dashDetails }) => {
  const [selected, setSelected] = useState<string>("Purchases");
  return (
    <>
      <Tabs
        tabs={["Purchases", "Sales"]}
        setSelected={setSelected}
        selected={selected}
        layoutId="active-tab-orders"
      />
      <hr className="my-4" />
      {selected === "Purchases" && (
        <OrderList orders={dashDetails.placedOrders} />
      )}
      {selected === "Sales" && (
        <OrderList orders={dashDetails.receivedOrders} />
      )}
      <hr className="my-4" />
      <Link
        href={selected === "Purchases" ? "/orders/purchases" : "/orders/sales"}
      >
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "gray" }}
          transition={{ type: "spring", stiffness: 500 }}
          className="text-lg dark:bg-black bg-gray-300 p-2 rounded-lg w-full"
        >
          View All Orders
        </motion.button>
      </Link>
    </>
  );
};

export default Orders;
