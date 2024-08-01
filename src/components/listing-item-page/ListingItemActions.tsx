"use client";
import { Category, User, currentUserState } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "@/components/listing-item-page/Button";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import EditListingModal from "../modals/EditListingModal";
import { deleteListing, getListing } from "@/lib/actions";
import { usePathname } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import queryClient from "@/lib/http";
import { useDispatch } from "react-redux";
import { cartActions } from "@/redux/store/redux-store";
import { Listing } from "@/types/types";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { sendOffer } from "@/lib/actions";
import TradeModal from "../modals/TradeModal";

const Actions: React.FC<{ seller: User; category: Category }> = ({
  seller,
  category,
}) => {
  const currentUser = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user
  );
  const cart = useSelector(
    (state: { cart: { items: Listing[] } }) => state.cart.items
  );
  const isCurrentUser = seller.username === currentUser.username;
  const [openModal, setOpen] = useState<boolean>(false);
  const [openTradeModal, setOpenTradeModal] = useState<boolean>(false);
  const [openOfferForm, setOpenOfferForm] = useState<boolean>();
  const [listing, setListing] = useState<Listing>();
  const path = usePathname();
  const [accessToken] = useLocalStorage<string>("accessToken");
  const router = useRouter();
  const listingId = path.split("/")[2];
  const dispatch = useDispatch();
  const notInCart = !cart.some(
    (item) => item.listingId === parseInt(listingId)
  );
  function clickHandler() {
    setOpen(!openModal);
  }

  useEffect(() => {
    getListing(parseInt(listingId))
      .then((listing) => {
        setListing(listing);
      })
      .catch((error) => console.log(error.message));
  }, []);

  function deleteClickHandler() {
    deleteListing(parseInt(listingId), accessToken!).catch((error) =>
      console.log(error)
    );
    queryClient.invalidateQueries({ queryKey: ["listings"] });
    router.back();
  }

  function closeOfferTradeModal() {
    setOpenTradeModal(false);
  }

  async function addToCartHandler() {
    dispatch(cartActions.addToCart(listing));
  }

  async function cashOfferSubmitHandler(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setOpenOfferForm(false);
    const fd = new FormData(event.currentTarget);
    const { cashOffer } = Object.fromEntries(fd.entries());
    try {
      sendOffer(
        parseInt(listingId),
        currentUser.email,
        cashOffer as string,
        accessToken!
      );
      toast.success("Your offer has been sent", {
        icon: <span style={{ fontSize: "24px" }}>💷</span>,
      });
    } catch (error: any) {
      console.log(error.message);
      toast.error("An error occured:" + error.message);
    }
    event.currentTarget.reset();
  }

  return (
    <>
      {openModal && <EditListingModal setOpen={setOpen} />}
      {openTradeModal && (
        <TradeModal closeModal={closeOfferTradeModal} listing={listing!} />
      )}
      {isCurrentUser ? (
        <>
          <Button
            className="dark:bg-zinc-800 bg-black p-2 rounded-md text-white font-semibold"
            onClick={clickHandler}
          >
            Edit
          </Button>
          <Button
            onClick={deleteClickHandler}
            className="flex hover:bg-red-500 hover:border-0 items-center gap-2 justify-center border-2 rounded-md border-black dark:border-white p-2 font-bold"
          >
            <MdDelete size={25} />
            Delete Listing
          </Button>
          <Button className="flex hover:bg-gray-300 hover:border-0 items-center gap-2 justify-center border-2 rounded-md border-black dark:border-white p-2 font-bold">
            View Offers
          </Button>
        </>
      ) : (
        <>
          <Button className="dark:bg-zinc-800 bg-black p-2 rounded-md text-white font-semibold">
            Buy
          </Button>
          <Button
            onClick={
              notInCart
                ? addToCartHandler
                : () =>
                    dispatch(
                      cartActions.removeCart({ listingId: parseInt(listingId) })
                    )
            }
            className={`flex ${
              notInCart ? "hover:bg-gray-300" : "hover:bg-red-500"
            } hover:border-0 items-center gap-2 justify-center border-2 rounded-md border-black dark:border-white p-2 font-bold`}
          >
            {notInCart ? "Add to Bag" : "Remove From Bag"}
          </Button>
          <Button
            onClick={() => setOpenOfferForm(!openOfferForm)}
            className="flex hover:bg-gray-300 hover:border-0 items-center gap-2 justify-center border-2 rounded-md border-black dark:border-white p-2 font-bold"
          >
            Make Offer
          </Button>
          <AnimatePresence>
            {openOfferForm && (
              <motion.form
                onSubmit={cashOfferSubmitHandler}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex p-2 items-center gap-2">
                  <span className="font-semibold">£</span>
                  <input
                    className="rounded-md focus:outline-none w-full dark:bg-black"
                    placeholder="Enter your offer"
                    required
                    name="cashOffer"
                    type="number"
                  />
                  <Button className="rounded-md text-sm text-white bg-green-500 p-2 font-semibold">
                    Send
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <Button
            onClick={() => setOpenTradeModal(true)}
            className="flex hover:bg-gray-300 hover:border-0 items-center gap-2 justify-center border-2 rounded-md border-black dark:border-white p-2 font-bold"
          >
            Offer Trade
          </Button>
          {category.name.toLowerCase() == "consoles" && (
            <Link href={`${listingId}/games`}>
              <Button className="flex hover:bg-blue-500 w-full items-center gap-2 justify-center text-white rounded-md bg-blue-400  p-2 font-bold">
                View Available Games
              </Button>
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default Actions;
