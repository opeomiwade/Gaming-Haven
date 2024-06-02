import { useState } from "react";
import { DashDetails } from "@/types/types";
import OrderList from "./OrderList";
import Tabs from "@/components/ui/NavTabs";

const Orders: React.FC<{ dashDetails: DashDetails }> = ({ dashDetails }) => {
  const [selected, setSelected] = useState<string>("Bought");
  return (
    <>
      <Tabs
        tabs={["Bought", "Sold"]}
        setSelected={setSelected}
        selected={selected}
        layoutId="active-tab-orders"
      />
      <hr className="my-4" />
      {selected === "Bought" && <OrderList orders={dashDetails.placedOrders} />}
      {selected === "Sold" && <OrderList orders={dashDetails.receivedOrders} />}
    </>
  );
};

export default Orders;
