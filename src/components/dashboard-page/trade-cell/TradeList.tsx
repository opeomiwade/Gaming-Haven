import { TradeDetails } from "@/types/types";
import TradeItem from "./TradeItem";

const TradeList: React.FC<{
  trades: TradeDetails[];
  emptyPlaceHolderText: string;
}> = ({ trades, emptyPlaceHolderText }) => {
  return trades.length > 0 ? (
    <ul className="mt-4 overflow-y-auto h-[60%] space-y-6 overflow-x-hidden">
      {trades.map((trade) => {
        return <TradeItem key={trade.id} trade={trade} />;
      })}
    </ul>
  ) : (
    <div className="w-full h-[300px] flex items-center justify-center">
      <p className="font-bold text-xl text-gray-500 dark:text-white">{emptyPlaceHolderText}</p>
    </div>
  );
};

export default TradeList;
