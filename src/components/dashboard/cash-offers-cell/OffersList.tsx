import { Offer } from "@/types/types";
import OfferItem from "./CashOfferItem";

const OffersList: React.FC<{ offers: Offer[] }> = ({ offers }) => {
  return (
    <ul className="mt-4 overflow-y-auto h-[60%] space-y-6 overflow-x-hidden">
      {offers.map((offer) => {
        return <OfferItem key={offer.id} offer={offer} />;
      })}
    </ul>
  );
};

export default OffersList;
