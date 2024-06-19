const PriceFormFilter: React.FC<{
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}> = ({ submitHandler }) => {
  return (
    <form
      className="flex flex-col gap-2 text-sm w-full"
      onSubmit={submitHandler}
    >
      <div className="flex gap-2">
        <label className="flex flex-col items-center">
          <span>Min</span>
          <span className="font-bold">£</span>
          <input
            name="min"
            type="number"
            defaultValue={1}
            min={1}
            className="border p-1 rounded focus:outline-none w-[80px] text-center font-semibold"
          />
        </label>
        <label className="flex flex-col items-center">
          <span>Max</span>
          <span className="font-bold">£</span>
          <input
            name="max"
            type="number"
            className="border p-1 rounded focus:outline-none w-[80px] text-center font-semibold"
          />
        </label>
      </div>
      <button className="bg-gray-300 p-1 font-bold rounded-lg w-20 mx-auto">
        Done
      </button>
    </form>
  );
};

export default PriceFormFilter;
