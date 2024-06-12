import { useState } from "react";
import { DashDetails } from "@/types/types";
import Tabs from "@/components/ui/NavTabs";
import OffersList from "./OffersList";

const CashOffersTabContent: React.FC<{ dashDetails: DashDetails }> = ({
  dashDetails,
}) => {
  const [selected, setSelected] = useState<string>("Sent");
  return (
    <>
      <Tabs
        tabs={["Sent", "Received"]}
        setSelected={setSelected}
        selected={selected}
        layoutId="active-tab-trades"
      />
      <hr className="my-4" />
      {selected === "Sent" && (
        <OffersList
          offers={dashDetails.sentOffers}
          emptyPlaceHolderText="You have made no offers"
        />
      )}
      {selected === "Received" && (
        <OffersList
          offers={dashDetails.receivedOffers}
          emptyPlaceHolderText="You have received no offers"
        />
      )}
    </>
  );
};

export default CashOffersTabContent;
