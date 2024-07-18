"use client";
import ReturnButton from "@/components/ui/ReturnButton";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import MotionButton from "@/components/ui/MotionButton";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Listing } from "@/types/types";
import { defaultImageUrl } from "@/utils/imageDataUrl";
import { cartActions } from "@/redux/store/redux-store";
import { motion } from "framer-motion";

function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector(
    (state: { cart: { items: Listing[] } }) => state.cart.items
  );

  return (
    <main className="flex flex-col p-6 gap-2 border-t-2">
      <header className="mb-4">
        <div className="flex justify-between">
          <ReturnButton />
          <Link href={"/marketplace/consoles"}>
            <MotionButton
              whileHover={{ scale: 1.2 }}
              className="p-2 dark:bg-white bg-black dark:text-black text-white rounded-md w-[200px] text-sm"
            >
              Back To MarketPlace
            </MotionButton>
          </Link>
        </div>

        <h1 className="text-4xl font-bold">My Cart</h1>
      </header>
      <section className="flex flex-col gap-4 items-center">
        {cart.map((item) => (
          <article
            key={item.listingId}
            className="border-[1px] p-2 grid grid-cols-[2fr,1fr] h-[250px] w-[80%] rounded-md shadow-lg"
          >
            <div className="flex items-center gap-8">
              <Link href={`/listings/${item.listingId}`}>
                <div className="relative h-[200px] w-[300px]">
                  <Image
                    src={item.images[0].imageUrl}
                    alt={item.listedProduct.productName}
                    fill
                  />
                </div>
              </Link>

              <div className="flex flex-col gap-4">
                <Link href={`/listings/${item.listingId}`}>
                  <p className="font-semibold hover:text-blue-500">
                    {item.listedProduct.productName}
                  </p>
                </Link>
                <p className="font-bold text-green-500">£{item.price}</p>
                <MotionButton
                  whileHover={{ scale: 1.1 }}
                  onClick={() =>
                    dispatch(
                      cartActions.removeCart({ listingId: item.listingId })
                    )
                  }
                >
                  <FaRegTrashAlt size={30} />
                </MotionButton>
              </div>
            </div>
            <div className="grid grid-rows-2">
              <section className="flex flex-col justify-start p-4 gap-2">
                <h2 className="font-bold text-xl">Seller</h2>
                <div className="flex items-center gap-2">
                  <div className="h-[60px] w-[60px] rounded-full relative">
                    <Image
                      src={item.seller.imageUrl || defaultImageUrl}
                      fill
                      alt={item.seller.username}
                    />
                  </div>

                  <div>
                    <p className="text-md">{item.seller.username}</p>
                    <p>Reviews here</p>
                  </div>
                </div>
              </section>
              <section className="flex items-center h-full">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="text-md rounded-md bg-black dark:bg-white dark:text-black text-white font-semibold p-2 w-full h-fit hover:bg-gray-400"
                >
                  Checkout
                </motion.button>
              </section>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default CartPage;
