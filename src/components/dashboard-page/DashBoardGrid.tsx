import { CiCreditCard1 } from "react-icons/ci";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { IoMdSwap } from "react-icons/io";
import BookmarkOutlined from "@mui/icons-material/BookmarkOutlined";
import { MdOutlineStore } from "react-icons/md";
import { DashDetails } from "@/types/types";
import TradeTabContent from "./trade-cell/TradeTabContent";
import Listings from "./Listings";
import { motion } from "framer-motion";
import OrderTabContent from "./order-cell/OrderTabContent";
import MarketPlaceTopCategories from "./market-place-categories/MarketplaceTopCategories";
import Link from "next/link";
import { GiCash } from "react-icons/gi";
import { useEffect, useState } from "react";
import CashOffersTabContent from "./cash-offers-cell/CashOfferTabContent";
import EmptyPlaceHolder from "../ui/EmptyPlaceHolder";
import SavedListings from "./saved-listing-cell/SavedListings";
import { useDispatch } from "react-redux";
import { sellModalActions } from "@/redux/store/redux-store";

const DashBoardGrid: React.FC<{ dashDetails: DashDetails }> = ({
  dashDetails,
}) => {
  const [smallScreen, setSmallScreen] = useState<boolean>();
  const dispatch = useDispatch();
  const completedSentTrades =
    dashDetails &&
    dashDetails.sentTrades.filter((trade) => trade.tradeStatus === "completed")
      .length;

  const completedReceivedTrades =
    dashDetails &&
    dashDetails.receivedTrades.filter(
      (trade) => trade.tradeStatus === "completed"
    ).length;

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width < 768) {
          setSmallScreen(true);
        } else {
          setSmallScreen(false);
        }
      }
    });
    resizeObserver.observe(document.documentElement);
    return () => {
      resizeObserver.disconnect();
    };
  });

  return (
    <div
      className={`flex flex-col justify-between lg:grid grid-cols-[4fr_1fr_1fr_1fr_1fr] grid-rows-10_155px h-full gap-4 p-6  ${
        smallScreen ? "pb-[90px]" : ""
      }`}
    >
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl dark:shadow-none shadow-gray-400 p-4">
        <h3 className="font-bold">Overview of Gaming MarketPlace</h3>
        <div className="flex items-center gap-10 w-fit">
          <div className="dark:bg-black rouned-lg w-fit rounded-lg">
            <CiCreditCard1 size={100} />
          </div>
          <div className="flex flex-col">
            <p className="text-md">Total Sales</p>
            <p className="text-2xl font-bold ">
              £{dashDetails?.marketplaceTotalSales}
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg col-span-3 row-span-2 grid grid-cols-2 grid-rows-2 gap-4">
        <div className="dark:bg-zinc-800 bg-white rounded-lg p-4 flex flex-col items-center shadow-xl dark:shadow-none shadow-gray-400">
          <div className="dark:bg-black rounded-full w-fit h-git p-2">
            <IoMdSwap size={30} />
          </div>
          <p className="font-bold text-center">Completed Trades</p>
          <p className="text-white-300 text-lg">
            {completedReceivedTrades + completedSentTrades}
          </p>
        </div>
        <div className="dark:bg-zinc-800 bg-white rounded-lg p-4 flex flex-col items-center shadow-xl dark:shadow-none shadow-gray-400">
          <div className="dark:bg-black rounded-full w-fit h-fit p-2">
            <FaMoneyBill size={30} />
          </div>
          <p className="font-bold text-center">Total Income</p>
          <p className="text-green-500 font-semibold">
            £{dashDetails?.totalIncome}
          </p>
        </div>
        <div className="dark:bg-zinc-800 bg-white rounded-lg p-4 flex flex-col items-center shadow-xl dark:shadow-none shadow-gray-400">
          <div className="dark:bg-black rounded-full w-fit h-fit p-2">
            <FaArrowUp size={30} />
          </div>
          <p className="font-bold text-center">Total Expenses</p>
          <p className="text-green-500 font-semibold">
            £{dashDetails?.totalExpenses}
          </p>
        </div>
        <div className="dark:bg-zinc-800 bg-white rounded-lg p-4 flex flex-col items-center shadow-xl dark:shadow-none shadow-gray-400">
          <div className="dark:bg-black rounded-full w-fit h-fit p-2">
            <FaArrowDown size={30} />
          </div>
          <p className="font-bold text-center">Net Income</p>
          <p className="text-green-500 font-semibold">
            £{dashDetails?.netIncome}
          </p>
        </div>
      </div>
      <div
        className={`rounded-lg dark:bg-zinc-800 bg-white col-start-1 row-span-3 p-4 ${
          smallScreen ? "h-[600px]" : ""
        } shadow-xl dark:shadow-none shadow-gray-400`}
      >
        <p className="font-bold text-lg">Top MarketPlace Gaming Categories</p>
        <hr className="my-4" />
        <MarketPlaceTopCategories />
        <div className="relative bottom-2">
          <hr className="my-4" />
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "gray" }}
            transition={{ type: "spring", stiffness: 500 }}
            className="text-lg dark:bg-black bg-gray-300 p-2 rounded-lg w-full"
          >
            Explore All
          </motion.button>
        </div>
      </div>
      <div className="dark:bg-zinc-800 bg-white col-start-1 rounded-lg row-span-3 p-4 shadow-xl dark:shadow-none shadow-gray-400 flex flex-col">
        <p className="font-bold text-lg">My Orders</p>
        <OrderTabContent dashDetails={dashDetails} />
      </div>
      <div
        className={`dark:bg-zinc-800 bg-white col-start-2 row-start-3 row-span-3 col-span-3 rounded-lg p-4 ${
          smallScreen ? "h-[500px]" : ""
        } shadow-xl dark:shadow-none shadow-gray-400`}
      >
        <p className="flex gap-2 items-center font-bold text-lg">
          <IoMdSwap size={25} />
          Trade Offers
        </p>
        <TradeTabContent dashDetails={dashDetails} />
      </div>
      <div
        className={`dark:bg-zinc-800 bg-white rounded-lg p-4 col-start-2 col-span-3 row-span-3 ${
          smallScreen ? "h-[500px]" : ""
        } shadow-xl dark:shadow-none shadow-gray-400`}
      >
        <p className="flex gap-2 font-bold text-lg">
          <GiCash size={25} /> Cash Offers
        </p>
        <CashOffersTabContent dashDetails={dashDetails} />
      </div>
      <div
        className={`col-start-2 col-span-3 dark:bg-zinc-800 bg-white row-span-3 rounded-lg p-4 flex flex-col ${
          smallScreen ? "h-[400px]" : ""
        } shadow-xl dark:shadow-none shadow-gray-400`}
      >
        <p className="font-bold text-lg">
          <BookmarkOutlined />
          Saved Listings
        </p>

        {dashDetails.savedListings.length > 0 ? (
          <>
            <hr className="my-4" />
            <SavedListings listings={dashDetails.savedListings} />
          </>
        ) : (
          <EmptyPlaceHolder
            buttonText="Browse Marketplace"
            href="/marketplace"
          />
        )}
      </div>
      <div
        className={`dark:bg-zinc-800 bg-white rounded-lg col-start-1 row-start-8 row-span-3 p-4 ${
          smallScreen ? "h-[600px]" : ""
        } shadow-xl dark:shadow-none shadow-gray-400`}
      >
        <p className="flex gap-2 items-center font-bold text-lg">
          <MdOutlineStore size={30} />
          My Store
        </p>
        {dashDetails.listedProducts.length > 0 ? (
          <>
            <hr className="my-4" />
            <Listings listings={dashDetails.listedProducts} />{" "}
            <div className="relative bottom-0">
              <hr className="my-4" />
              <Link href={"/my-store"}>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "gray" }}
                  transition={{ type: "spring", stiffness: 500 }}
                  className="text-lg dark:bg-black bg-gray-300 p-2 rounded-lg w-full"
                >
                  View All Items
                </motion.button>
              </Link>
            </div>
          </>
        ) : (
          <EmptyPlaceHolder
            buttonText="List an Item"
            clickHandler={() => dispatch(sellModalActions.openModal())}
          />
        )}
      </div>
    </div>
  );
};

export default DashBoardGrid;
