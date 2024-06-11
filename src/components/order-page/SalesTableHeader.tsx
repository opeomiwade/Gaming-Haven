const SalesTableHeader: React.FC = () => {
  return (
    <div className="flex p-4 mt-10 justify-between items-center text-sm text-gray-400 font-semibold border-b-[1px]">
      <p className="w-[10%]">Order Id</p>
      <p className="w-[60%] ">Buyer Info </p>
      <p className="w-[20%] ">Sold On</p>
      <p className="w-[10%] ">Total</p>
    </div>
  );
};

export default SalesTableHeader;
