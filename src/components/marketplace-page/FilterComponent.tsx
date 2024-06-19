import FilterButton from "../ui/FilterButton";
import { getManufacturers } from "@/lib/actions";
import { useContext, useEffect, useState } from "react";
import SortButton from "../ui/SortButton";
import FilterTag from "../ui/FilterTag";
import ListingContext from "@/context/ListingContext";

const FilterComponent = () => {
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const { filters } = useContext(ListingContext);

  useEffect(() => {
    getManufacturers().then((response) => setManufacturers(response));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-between">
        <section className="flex gap-2">
          <FilterButton filterOptions={manufacturers}>
            Manufacturers
          </FilterButton>
          <FilterButton filterOptions={["New", "Used"]}>Condition</FilterButton>
          <FilterButton>Price</FilterButton>
        </section>
        <SortButton />
      </div>
      <div className="flex gap-4 my-4">
        {Object.entries(filters).map(([key, value]) => {
          if (key == "manufacturers" || key == "condition") {
            const values = value as string[];
            return values.map((value) => (
              <FilterTag key={value} filterValue={value} filterKey={key} />
            ));
          } else if (
            value !== undefined &&
            value.toString().trim().length > 0 &&
            value != 1 &&
            key !== "sortBy" &&
            key !== "increasing" &&
            key != "categoryName"
          ) {
            return (
              <FilterTag
                key={value as string}
                filterValue={value}
                filterKey={key}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FilterComponent;
