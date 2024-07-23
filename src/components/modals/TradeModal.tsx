import classes from "../../CSS/modal.module.css";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { LuArrowLeftRight } from "react-icons/lu";
import { Listing } from "@/types/types";
import { GoDotFill } from "react-icons/go";
import queryClient, { getUserListings } from "@/lib/http";
import { useSelector } from "react-redux";
import { currentUserState } from "@/types/types";
import formatDateTime from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { defaultImageUrl } from "@/utils/imageDataUrl";
import { initiateTrade } from "@/lib/actions";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const TradeModal: React.FC<{ closeModal: () => void; listing: Listing }> = ({
  closeModal,
  listing,
}) => {
  const username = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user.username
  );
  const portalElement = document.getElementById("trade-modal");
  const [userListings, setuserListings] = useState<Listing[]>();
  const [selectedListings, setSelectedListings] = useState<Listing[]>([]);

  useEffect(() => {
    queryClient
      .fetchQuery({
        queryKey: ["listings", username],
        queryFn: getUserListings,
      })
      .then((listings) => setuserListings(listings));
  }, []);

  if (!portalElement) {
    return null; // If the target element doesn't exist, render nothing
  }

  async function proposeTradeClickHandler() {
    try {
      await initiateTrade({
        listingId: listing.listingId,
        offeredItems: selectedListings,
      });
      toast.success("Trade sent successfully");
      closeModal()
      setSelectedListings([])
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return createPortal(
    <dialog open className={`${classes.modal} flex p-2`}>
      <div className="bg-white dark:bg-zinc-800 dark:text-white rounded-md lg:w-[80%] md:w-full h-[700px] p-2">
        <header className="flex items-center justify-between h-[5%]">
          <h2 className="text-2xl font-bold text-center mx-auto">Trade </h2>
          <motion.button whileHover={{ scale: 1.1 }} onClick={closeModal}>
            <IoIosClose size={50} />
          </motion.button>
        </header>
        <hr className="my-4" />
        <div className="grid grid-cols-[3fr,1fr,3fr] p-2 h-[80%] relative overflow-y-auto">
          <div className="flex flex-col items-center justify-center gap-4">
            {userListings ? (
              userListings?.map((listing) => {
                return (
                  <div
                    key={listing.listingId}
                    onClick={() => {
                      if (selectedListings.includes(listing)) {
                        setSelectedListings(() =>
                          selectedListings.filter(
                            (selectedListing) =>
                              selectedListing.listingId !== listing.listingId
                          )
                        );
                      } else {
                        setSelectedListings((prevListings) => [
                          ...prevListings,
                          listing,
                        ]);
                      }
                    }}
                    className={`shadow-sm rounded-md flex flex-col p-2 gap-2 w-full hover:cursor-pointer hover:border-2 hover:border-green-500 dark:border-blue-500 ${
                      selectedListings?.includes(listing)
                        ? "border-2 border-green-500 dark:border-blue-500"
                        : ""
                    }`}
                  >
                    <header className="flex items-center gap-4">
                      <img
                        src={listing.images[0].imageUrl}
                        className="h-[100px] w-[100px rounded-full]"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm">{listing.description}</p>
                        <p className="text-xs text-gray-300">
                          Listed on {formatDateTime(listing.createdAt)}
                        </p>
                      </div>
                    </header>
                    <p className="font-bold text-right text-green-500">
                      £{listing.price}
                    </p>
                  </div>
                );
              })
            ) : (
              <CircularProgress />
            )}
          </div>
          <div className="flex items-center justify-center h-fit sticky top-[45%]">
            <LuArrowLeftRight size={70} />
          </div>
          <div className="flex flex-col gap-2 justify-center h-fit sticky top-[50px]">
            <header className="flex items-center justify-center gap-2">
              {" "}
              <img
                src={listing.seller.imageUrl || defaultImageUrl}
                className="h-[40px] w-[40px] rounded-full"
              />
              <h3 className="text-sm text-center">
                @{listing.seller.username}
              </h3>
            </header>

            <img
              src={listing.images[0].imageUrl}
              className="h-[300px] w-[300px] rounded-md mx-auto"
            />
            <p className="flex gap-2 justify-center items-center text-md text-center font-semibold">
              {listing.listedProduct.productName} <GoDotFill size={8} />{" "}
              <span className="text-xs font-extralight">
                {listing.condition}
              </span>
            </p>
            <p className="text-xs text-gray-500 text-center">
              {listing.description}
            </p>
            <p className="text-green-400 font-bold text-center text-sm">
              £{listing.price}
            </p>
          </div>
        </div>
        <footer className="flex justify-center items-end w-full h-[10%]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-green-500 dark:bg-zinc-800 dark:border-2 dark:border-blue-500 text-white text-md rounded-md p-2 mx-auto w-[40%] font-bold"
            onClick={proposeTradeClickHandler}
          >
            Propose Trade
          </motion.button>
        </footer>
      </div>
    </dialog>,
    portalElement
  );
};

export default TradeModal;
