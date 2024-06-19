import { PiArrowsDownUp } from "react-icons/pi";
import { useState } from "react";
import ListingContext from "@/context/ListingContext";
import { useContext } from "react";
import CheckBoxInput from "./CheckBoxInput";

const SortButton = () => {
  const [clicked, setClicked] = useState(false);
  const { setFilters } = useContext(ListingContext);
  const [selectedOption, setSelectedOption] = useState("");

  function changeHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    option: string
  ) {
    let sortBy = "";
    let increasing = false;

    //determine sorting order, i.e ASC or DESC
    switch (option) {
      case "Price: high to low":
        sortBy = "price";
        increasing = false;
        break;
      case "Price: low to high":
        sortBy = "price";
        increasing = true;
        break;
      case "Newest":
        sortBy = "createdAt";
        increasing = false;
        break;
      case "Oldest":
        sortBy = "createdAt";
        increasing = true;
        break;
    }
    if (event.currentTarget.checked) {
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          sortBy,
          increasing,
        };
      });
      setSelectedOption(option); // Update the selected option
    } else {
      setFilters((prevFilters) => {
        return { ...prevFilters, sortBy: undefined, increasing: undefined };
      });
      setSelectedOption(""); // Reset the selected option
    }
  }

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
        <div className="absolute top-[100%] bg-white dark:bg-zinc-800 w-[200px] p-2 rounded-lg border-[1px] flex flex-col gap-2 z-20 shadow-lg right-10">
          <div className="flex items-center gap-4">
            <CheckBoxInput
              option={"Price: high to low"}
              filterKey="sortBy"
              changeHandler={changeHandler}
              sortChecked={selectedOption === "Price: high to low"}
            />
          </div>
          <div className="flex items-center gap-4">
            <CheckBoxInput
              option={"Price: low to high"}
              filterKey="sortBy"
              changeHandler={changeHandler}
              sortChecked={selectedOption === "Price: low to high"}
            />
          </div>
          <div className="flex items-center gap-4">
            <CheckBoxInput
              option={"Newest"}
              filterKey="sortBy"
              changeHandler={changeHandler}
              sortChecked={selectedOption === "Newest"}
            />
          </div>
          <div className="flex items-center gap-4">
            <CheckBoxInput
              option={"Oldest"}
              filterKey="sortBy"
              changeHandler={changeHandler}
              sortChecked={selectedOption === "Oldest"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SortButton;
