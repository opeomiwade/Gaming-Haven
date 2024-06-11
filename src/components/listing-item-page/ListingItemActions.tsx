"use client";
import { User, currentUserState } from "@/types/types";
import React from "react";
import { useSelector } from "react-redux";
import Button from "@/components/listing-item-page/Button";
import { MdDelete } from "react-icons/md";

const Actions: React.FC<{ seller: User }> = ({ seller }) => {
  const currentUser = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user
  );
  const isCurrentUser = seller.username === currentUser.username;
  return (
    <>
      {isCurrentUser ? (
        <>
          <Button className="dark:bg-zinc-800 bg-black p-2 rounded-md text-white font-semibold">
            Edit
          </Button>
          <Button className="flex hover:bg-red-500 hover:border-0 items-center gap-2 justify-center border-2 rounded-md border-black dark:border-white p-2 font-bold">
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
          <Button className="flex hover:bg-gray-300 hover:border-0 items-center gap-2 justify-center border-2 rounded-md border-black dark:border-white p-2 font-bold">
            Add to Bag
          </Button>
          <Button className="flex hover:bg-gray-300 hover:border-0 items-center gap-2 justify-center border-2 rounded-md border-black dark:border-white p-2 font-bold">
            Make Offer
          </Button>
          <Button
            className="flex hover:bg-gray-300 hover:border-0 items-center gap-2 justify-center border-2 rounded-md border-black dark:border-white p-2 font-bold"
          >
            Offer Trade
          </Button>
        </>
      )}
    </>
  );
};

export default Actions;
