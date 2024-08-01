import { getOrder, getOrderItems } from "@/lib/actions";
import formatDateTime from "@/utils/formatDate";
import { Listing, Order } from "@/types/types";
import MotionButton from "@/components/ui/MotionButton";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { IoMdMail } from "react-icons/io";
import ReturnButton from "@/components/ui/ReturnButton";
import { defaultImageUrl } from "@/utils/imageDataUrl";

const OrderPage: React.FC<{ params: any }> = async ({ params }) => {
  const purchase = (await getOrder(parseInt(params.orderId)).catch((error) =>
    console.log(error.message)
  )) as Order;
  const orderItems: Listing[] = await getOrderItems(
    parseInt(params.orderId)
  ).catch((error) => console.log(error.message));
  return (
    <Suspense
      fallback={
        <div className="flex justify-center w-full h-screen">
          <CircularProgress />
        </div>
      }
    >
      <main className="w-full flex p-6 flex-col">
        <div className="rounded-md p-6 bg-white dark:bg-zinc-800 dark:border-2 dark:text-white w-full">
          <header className="flex items-center justify-between p-2">
            <ReturnButton />
            <h2 className="text-3xl font-bold text-center mx-auto">
              Gaming Haven Receipt
            </h2>
          </header>
          <hr />
          <div className="my-6">
            <p className="text-lg font-semibold">
              Order ID: {purchase.orderId}
            </p>
            <p className="text-sm">
              Date: {formatDateTime(purchase.orderDate)}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Buyer Information</h3>
            <div className="flex items-center gap-2 my-4">
              <div className="h-[60px] w-[60px] rounded-full relative">
                <Image
                  src={purchase.buyer.imageUrl || defaultImageUrl}
                  fill
                  className="rounded-full"
                  alt={purchase.buyer.username}
                />
              </div>
              <div className="font-semibold text-md">
                <p className="text-sm">{purchase.buyer.username}</p>
                <p className="text-sm">{purchase.buyer.email}</p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Purchased Items</h3>
            <ul>
              {orderItems.map((item) => (
                <li
                  key={item.price}
                  className="flex justify-between py-2 border-b border-gray-200"
                >
                  <div className="flex gap-2 items-center">
                    <div className="h-[150px] w-[150px] relative">
                      <Image
                        src={item.images[0].imageUrl}
                        fill
                        alt={item.listedProduct.productName}
                      />
                    </div>
                    <div className="flex flex-col text-lg items-start gap-2">
                      <p className="">{item.listedProduct.productName}</p>
                      <p className="text-sm text-gray-500">
                        Seller: {item.seller.username}
                      </p>
                      <Link
                        href={"/"}
                        className="flex items-start gap-2 hover:cursor-pointer hover:text-blue-500 hover:underline text-sm"
                      >
                        <IoMdMail size={20} />
                        Message User
                      </Link>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">
                    £{item.price.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <p className="text-lg font-bold text-right">
              Total: £{purchase.totalPrice.toFixed(2)}
            </p>
          </div>
          <div className="w-full flex justify-center mt-4">
            <MotionButton
              whileHover={{ scale: 1.1 }}
              className="dark:bg-white bg-black dark:text-black text-white font-semibold p-2 rounded-md text-lg w-[40%]"
            >
              Leave Feedback
            </MotionButton>
          </div>
        </div>
      </main>
    </Suspense>
  );
};

export default OrderPage;
