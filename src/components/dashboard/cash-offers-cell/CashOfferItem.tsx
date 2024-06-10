"use client";
import { Offer, currentUserState } from "@/types/types";
import { GoDotFill } from "react-icons/go";
import { FcCancel } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const OfferItem: React.FC<{ offer: Offer }> = ({ offer }) => {
  const currentUser = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user
  );
  const isSeller = currentUser.username === offer.recipient.username;
  return (
    <li className="flex gap-4 md:w-full z-20 items-center p-4 justify-between">
      <div className="flex items-center gap-2">
        <img
          src={offer.listing.images[0].imageUrl}
          className="h-[60px] w-[60px]"
        />
        <div className="flex flex-col gap-2 justify-center">
          <p className="flex gap-[2px] font-light text-sm items-center w-fit">
            {offer.listing.listedProduct.productName} <GoDotFill size={5} />{" "}
            <span className="underline">
              {offer.listing.listedProduct.manufacturer}
            </span>
          </p>
          <p className="text-sm font-light">
            Price:{" "}
            <span className="text-green-500">£{offer.listing.price}</span>
          </p>
          <p className="font-bold text-sm">Offer: £{offer.offer}</p>
        </div>
      </div>
      {isSeller ? (
        <div className="flex gap-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.2 }}
            className="hover:cursor-pointer"
          >
            <FcCheckmark size={30} />
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.2 }}
            className="hover:cursor-pointer"
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
