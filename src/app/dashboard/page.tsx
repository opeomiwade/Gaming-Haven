import MainHeader from "@/components/ui/MainHeader";
import PaymentSharpIcon from "@mui/icons-material/PaymentSharp";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MoneyIcon from "@mui/icons-material/Money";
import TradeIcon from "@mui/icons-material/SwapHoriz";
import Tabs from "@/components/ui/Tabs";
import BookmarkOutlined from "@mui/icons-material/BookmarkOutlined";

function DashboardPage() {
  return (
    <section className="mt-4 space-y-8 flex flex-col flex-grow ml-[230px]">
      <MainHeader />
      <h1 className="font-bold text-2xl">Gaming Haven DashBoard</h1>
      <div className="bg-black grid grid-cols-[4fr_1fr_1fr_1fr_1fr] grid-rows-10 h-full gap-4 pr-6">
        <div className="bg-zinc-800 rounded-lg shadow-xl p-4 space-y-4">
          <h3 className="font-bold">My Market Overview</h3>
          <div className="flex gap-10 w-fit">
            <div className="bg-black rouned-lg p-2 w-fit rounded-lg">
              <PaymentSharpIcon style={{ fontSize: "50px" }} />
            </div>
            <div className="flex flex-col">
              <p className="text-md">Total Sales</p>
              <p className="text-2xl font-bold ">$ 1,000,000</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg col-span-3 row-span-2 grid grid-cols-2 grid-rows-2 gap-4">
          <div className="bg-zinc-800 rounded-lg p-4 flex flex-col items-center">
            <div className="bg-black rounded-full w-fit h-git p-2">
              <TradeIcon style={{ fontSize: "30px" }} />
            </div>
            <p className="font-bold">Total Trades</p>
            <p className="text-green-300">$100,000</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4 flex flex-col items-center">
            <div className="bg-black rounded-full w-fit h-git p-2">
              <MoneyIcon style={{ fontSize: "30px" }} />
            </div>
            <p className="font-bold">Total Income</p>
            <p className="text-green-300">$100,000</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4 flex flex-col items-center">
            <div className="bg-black rounded-full w-fit h-git p-2">
              <ArrowUpwardIcon style={{ fontSize: "30px" }} />
            </div>
            <p className="font-bold">Total Expenses</p>
            <p className="text-green-300">$100,000</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4 flex flex-col items-center">
            <div className="bg-black rounded-full w-fit h-git p-2">
              <ArrowDownwardIcon style={{ fontSize: "30px" }} />
            </div>
            <p className="font-bold">Net Income</p>
            <p className="text-green-300">$100,000</p>
          </div>
        </div>
        <div className="rounded-lg bg-zinc-800 col-start-1 row-span-3 p-4">
          <p className="font-bold text-lg">Top MarketPlace Gaming Categories</p>
          <Tabs />
        </div>
        <div className="bg-zinc-800 overflow-y-auto col-start-1 rounded-lg row-span-2 p-4">
          <p className="font-bold text-lg">Items Sold by Gaming Haven</p>
        </div>
        <div className="bg-zinc-800 overflow-y-auto col-start-2 row-start-3 row-span-3 col-span-3 rounded-lg p-4">
          <p className="font-bold text-lg">
            <TradeIcon />
            {"   "} Trades
          </p>
        </div>
        <div className="col-span-3 bg-zinc-800 row-span-3 rounded-lg p-4">
          <p className="font-bold text-lg">
            <BookmarkOutlined />
            Saved Items
          </p>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
