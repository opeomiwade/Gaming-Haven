import { PiArrowsDownUp } from "react-icons/pi";
import { useState } from "react";

const SortButton = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setClicked(!clicked)}
        className="rounded-md border-gray-300 border-[1px] dark:border-white p-2 flex gap-2 hover:cursor-pointer items-center text-sm"
      >
        <p>Sort</p>
        <div>
          <PiArrowsDownUp size={20} />
        </div>
      </button>{" "}
      {clicked && (
        <div className="absolute top-[100%] bg-white w-[200px] p-2 rounded-lg border-[1px] flex flex-col gap-2 z-20 shadow-lg right-10">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              name={"highlow"}
              value={"highlow"}
              id={"highlow"}
              className="hover:cursor-pointer"
            />
            <label htmlFor="new">Price: high to low</label>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              name="lowhigh"
              value="lowhigh"
              id="lowhigh"
              className="hover:cursor-pointer"
            />
            <label htmlFor="new">Price: low to high</label>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              name="Newest"
              value="Newest"
              id="Newest"
              className="hover:cursor-pointer"
            />
            <label htmlFor="new">Newest</label>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              name="Oldest"
              value="Oldest"
              id="Oldest"
              className="hover:cursor-pointer"
            />
            <label htmlFor="new">Oldest</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortButton;
