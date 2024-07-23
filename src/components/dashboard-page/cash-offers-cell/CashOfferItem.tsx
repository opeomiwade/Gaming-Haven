"use client";
import { Offer, currentUserState } from "@/types/types";
import { GoDotFill } from "react-icons/go";
import { FcCancel } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { updateOffer } from "@/lib/actions";
import toast from "react-hot-toast";
import { LuUndo2 } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";

const OfferItem: React.FC<{
  offer: Offer;
  setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
}> = ({ offer, setOffers }) => {
  const currentUser = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user
  );

  const isSeller = currentUser.username === offer.recipient.username;

  const getClassName = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "pending":
        return "text-amber-400";
      case "declined":
        return "text-red-500";
      default:
        return "";
    }
  };

  function undoAction(toastId: string, offerId: number) {
    setOffers((currOffers) => {
      return currOffers.map((currOffer) => {
        if (currOffer.id === offer.id) {
          return { ...offer, status: "pending" };
        } else {
          return currOffer;
        }
      });
    });
    updateOffer(offerId, "pending");
    toast.dismiss(toastId);
  }

  return (
    <li className="flex gap-4 md:w-full z-20 items-center p-4 justify-between">
      <div className="flex items-center gap-2">
        <Link href={`/listings/${offer.listing.listingId}`}>
          <div className="h-[80px] w-[80px] relative">
            <Image
              className="rounded-md"
              fill
              alt={offer.listing.listedProduct.productName}
              src={offer.listing.images[0].imageUrl}
            />
          </div>
        </Link>
        <div className="flex flex-col text-xs justify-center">
          <p className="flex gap-[2px] font-bold text-sm items-center w-fit">
            {offer.listing.listedProduct.productName} <GoDotFill size={5} />{" "}
            <span className="underline">
              {offer.listing.listedProduct.manufacturer}
            </span>
          </p>
          <p>
            Price:{" "}
            <span className="text-green-500">£{offer.listing.price}</span>
          </p>
          <p className="font-bold">Offer: £{offer.offer}</p>
          <p>
            Status:{" "}
            <span className={getClassName(offer.status)}>{offer.status}</span>
          </p>
        </div>
      </div>
      {isSeller ? (
        <div className="flex gap-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.2 }}
            className="hover:cursor-pointer"
            onClick={() => {
              setOffers((currOffers) => {
                return currOffers.map((currOffer) => {
                  if (currOffer.id === offer.id) {
                    return { ...offer, status: "completed" };
                  } else {
                    return currOffer;
                  }
                });
              });
              toast((t) => (
                <span className="flex gap-2 items-center">
                  <FaCheckCircle size={20} className="text-green-500" />
                  Offer has been accepted
                  <button onClick={() => undoAction(t.id, offer.id)}>
                    <LuUndo2 size={20} />
                  </button>
                </span>
              ));
              updateOffer(offer.id, "completed").catch((error) =>
                console.log(error)
              );
            }}
          >
            <FcCheckmark size={30} />
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.2 }}
            className="hover:cursor-pointer"
            onClick={() => {
              setOffers((currOffers) => {
                return currOffers.map((currOffer) => {
                  if (currOffer.id === offer.id) {
                    return { ...offer, status: "declined" };
                  } else {
                    return currOffer;
                  }
                });
              });
              toast((t) => (
                <span className="flex gap-2 items-center text-sm">
                  <FaCheckCircle size={20} className="text-green-500" />
                  Offer has been declined
                  <button onClick={() => undoAction(t.id, offer.id)}>
                    <LuUndo2 size={20} />
                  </button>
                </span>
              ));
              updateOffer(offer.id, "declined").catch((error) =>
                console.log(error)
              );
            }}
          >
            <FcCancel size={30} />
          </motion.button>
        </div>
      ) : (
        <motion.button
          className="bg-gray-300 dark:bg-black p-2 rounded-lg text-sm"
          whileHover={{ scale: 1.1 }}
        >
          Make new offer
        </motion.button>
      )}
    </li>
  );
};

export default OfferItem;
