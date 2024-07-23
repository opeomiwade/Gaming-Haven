import { Offer } from "@/types/types";
import OfferItem from "./CashOfferItem";
import { useState } from "react";

const OffersList: React.FC<{
  offers: Offer[];
  emptyPlaceHolderText: string;
}> = ({ offers, emptyPlaceHolderText }) => {

  const [offersState, setOffers] = useState<Offer[]>(offers);

  return (
    <ul className="mt-4 overflow-y-auto h-[60%] space-y-6 overflow-x-hidden">
      {offers.length == 0 ? (
        <div className="flex items-center justify-center h-full text-xl">
          <p className="font-bold text-gray-500 dark:text-white">
            {emptyPlaceHolderText}
          </p>
        </div>
      ) : (
        offersState
          .filter((offer) => offer.status == "pending")
          .map((offer) => {
            return <OfferItem key={offer.id} offer={offer} setOffers={setOffers} />;
          })
      )}
    </ul>
  );
};

export default OffersList;
