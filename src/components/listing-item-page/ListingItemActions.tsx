"use client";
import { Category, User, currentUserState } from "@/types/types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@/components/listing-item-page/Button";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import EditListingModal from "../modals/EditListingModal";
import { deleteListing } from "@/lib/actions";
import { usePathname } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import queryClient from "@/lib/http";

const Actions: React.FC<{ seller: User; category: Category }> = ({
  seller,
  category,
}) => {
  const currentUser = useSelector(
    (state: { currentUser: { user: currentUserState } }) =>
      state.currentUser.user
  );
  const isCurrentUser = seller.username === currentUser.username;
  const [openModal, setOpen] = useState<boolean>(false);
  const path = usePathname();
  const [storedValue] = useLocalStorage<string>("accessToken");
  const router = useRouter();

  function clickHandler() {
    setOpen(!openModal);
  }

  function deleteClickHandler() {
    const listingId = path.split("/")[2];
    deleteListing(parseInt(listingId), storedValue!).catch((error) =>
      console.log(error)
    );
    queryClient.invalidateQueries({ queryKey: ["listings"] });
    router.back();
  }

  return (
    <>
      {openModal && <EditListingModal setOpen={setOpen} />}
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
          <Button className="flex hover:bg-gray-300 hover:border-0 items-center gap-2 justify-center border-2 rounded-md border-black dark:border-white p-2 font-bold">
            Add to Bag
          </Button>
          <Button className="flex hover:bg-gray-300 hover:border-0 items-center gap-2 justify-center border-2 rounded-md border-black dark:border-white p-2 font-bold">
            Make Offer
          </Button>
          <Button className="flex hover:bg-gray-300 hover:border-0 items-center gap-2 justify-center border-2 rounded-md border-black dark:border-white p-2 font-bold">
            Offer Trade
          </Button>
          {category.name.toLowerCase() == "consoles" && (
            <Link href={"/"}>
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
