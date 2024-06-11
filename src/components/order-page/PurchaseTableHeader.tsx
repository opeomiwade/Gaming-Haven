const OrderTableHeader: React.FC = () => {
  return (
    <div className="flex p-4 mt-10 justify-between items-center text-sm text-gray-400 font-semibold border-b-[1px]">
      <p className="w-[10%] ">Order ID</p>
      <p className="w-[50%] ">Purchased Items</p>
      <p className="w-[20%] ">Order Date</p>
      <p className="w-[10%] ">Total Price</p>
      <p className="w-[10%] "></p>
    </div>
  );
};

export default OrderTableHeader;
