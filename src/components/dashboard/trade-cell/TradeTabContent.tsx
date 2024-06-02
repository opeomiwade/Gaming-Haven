import { useState } from "react";
import { DashDetails } from "@/types/types";
import TradeList from "./TradeList";
import Tabs from "@/components/ui/NavTabs";

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
      <hr className="my-4"/>
      {selected === "Sent" && <TradeList trades={dashDetails.sentTrades} />}
      {selected === "Received" && (
        <TradeList trades={dashDetails.receivedTrades} />
      )}
    </>
  );
};

export default Trades;
