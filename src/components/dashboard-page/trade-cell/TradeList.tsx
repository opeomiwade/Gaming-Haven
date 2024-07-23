import { TradeDetails } from "@/types/types";
import TradeItem from "./TradeItem";
import { useState } from "react";

const TradeList: React.FC<{
  trades: TradeDetails[];
  emptyPlaceHolderText: string;
}> = ({ trades, emptyPlaceHolderText }) => {

  const [tradesState, setTrades] = useState<TradeDetails[]>(trades);

  return trades.length > 0 ? (
    <ul className="mt-4 overflow-y-auto h-[60%] space-y-6 overflow-x-hidden">
      {tradesState
        .filter((trade) => trade.tradeStatus == "pending")
        .map((trade) => {
          return <TradeItem key={trade.id} trade={trade} setTrades={setTrades} />;
        })}
    </ul>
  ) : (
    <div className="w-full h-[300px] flex items-center justify-center">
      <p className="font-bold text-xl text-gray-500 dark:text-white">
        {emptyPlaceHolderText}
      </p>
    </div>
  );
};

export default TradeList;
