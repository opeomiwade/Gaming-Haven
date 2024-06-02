import { TradeDetails } from "@/types/types";
import TradeItem from "./TradeItem";

const TradeList: React.FC<{ trades: TradeDetails[] }> = ({ trades }) => {
  return (
    <ul className="mt-4 overflow-y-auto h-[60%] space-y-6">
      {trades.map((trade) => {
        return <TradeItem key={trade.id} trade={trade}/>
      })}
    </ul>
  );
};

export default TradeList;
