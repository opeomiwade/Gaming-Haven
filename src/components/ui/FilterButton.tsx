import { GoChevronDown } from "react-icons/go";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import CheckBoxInput from "./CheckBoxInput";
import ListingContext from "@/context/ListingContext";
import PriceFormFilter from "./PriceFormFilter";

const FilterButton: React.FC<{
  children: React.ReactNode;
  filterOptions?: string[];
}> = ({ children, filterOptions }) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const { filters, setFilters, removeFilter } = useContext(ListingContext);
  const filterKey = children!.toString().toLowerCase();

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const { min, max } = Object.fromEntries(fd.entries()) as {
      [key: string]: any;
    };
    setFilters({ ...filters, minPrice: min, maxPrice: max });
    setExpanded(false);
  }

  function onChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    option: string
  ) {
    if (event.currentTarget.checked) {
      setFilters((prevFilters) => {
        if (filterKey == "manufacturers") {
          return {
            ...prevFilters,
            manufacturers: prevFilters.manufacturers
              ? [...prevFilters.manufacturers, option]
              : [option],
          };
        } else {
          return { ...prevFilters, [filterKey]: option };
        }
      });
    } else {
      removeFilter(filterKey, option);
    }
  }

  return (
    <div className="relative">
      <button
        className="rounded-md border-gray-300 border-[1px] dark:border-white p-2 flex gap-2 hover:cursor-pointer items-center text-sm"
        onClick={() => setExpanded(!isExpanded)}
      >
        <p>{children}</p>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <GoChevronDown size={25} />
        </motion.div>
      </button>
      {isExpanded && (
        <div className="flex flex-col gap-2 dark:bg-zinc-800 bg-white rounded-md z-30 absolute top-[100%] shadow-lg border-[1px] mt-2 p-2 max-h-[250px] overflow-y-auto overflow-x-hidden max-w-[220px]">
          {filterOptions ? (
            filterOptions?.map((option) => (
              <CheckBoxInput
                key={option}
                option={option}
                filterKey={children!.toString().toLowerCase()}
                changeHandler={onChangeHandler}
              />
            ))
          ) : (
            <PriceFormFilter submitHandler={submitHandler} />
          )}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
