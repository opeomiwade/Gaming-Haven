import { Offer } from "@/types/types";
import OfferItem from "./CashOfferItem";

const OffersList: React.FC<{
  offers: Offer[];
  emptyPlaceHolderText: string;
}> = ({ offers, emptyPlaceHolderText }) => {
  return (
    <ul className="mt-4 overflow-y-auto h-[60%] space-y-6 overflow-x-hidden">
      {offers.length == 0 ? (
        <div className="flex items-center justify-center h-full text-xl">
          <p className="font-bold text-gray-500 dark:text-white">{emptyPlaceHolderText}</p>
        </div>
      ) : (
        offers.map((offer) => {
          return <OfferItem key={offer.id} offer={offer} />;
        })
      )}
    </ul>
  );
};

export default OffersList;
