import { IoClose } from "react-icons/io5";
import toTitleCase from "@/utils/toTitleCase";
import ListingContext from "@/context/ListingContext";
import { useContext } from "react";

const FilterTag: React.FC<{
  filterValue: string | number | string[] | boolean;
  filterKey: string;
}> = ({ filterKey, filterValue }) => {
  const getFilterText = (
    condition: string,
    value: string | number | string[] | boolean
  ) => {
    switch (condition) {
      case "minPrice":
        return `Min Price: £${value}`;
      case "maxPrice":
        return `Max Price: £${value}`;
      default:
        return toTitleCase(value.toString());
    }
  };
  const { removeFilter } = useContext(ListingContext);

  function clickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    removeFilter(filterKey, filterValue as string);
  }

  return (
    <div className="flex gap-1 items-center p-2 dark:bg-zinc-600 bg-gray-200 rounded-sm w-fit">
      <button
        id={filterKey}
        value={filterValue as string}
        onClick={clickHandler}
        className="hover:cursor-pointer font-bold"
      >
        <IoClose size={25} fill="white" />
      </button>
      <p className="font-semibold text-sm">
        {getFilterText(filterKey, filterValue)}
      </p>
    </div>
  );
};

export default FilterTag;
