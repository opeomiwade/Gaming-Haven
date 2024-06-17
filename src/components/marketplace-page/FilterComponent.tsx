import FilterButton from "../ui/FilterButton";
import { getManufacturers } from "@/lib/actions";
import { useEffect, useState } from "react";
import SortButton from "../ui/SortOptions";

const FilterComponent = () => {
  const [manufacturers, setManufacturers] = useState<string[]>([]);

  useEffect(() => {
    getManufacturers().then((response) => setManufacturers(response));
  }, []);

  return (
    <>
      <p className="font-bold text-2xl">Filter</p>
      <div className="flex gap-2 p-4 justify-between">
        <section className="flex gap-2">
          <FilterButton options={manufacturers}>Manufacturer</FilterButton>
          <FilterButton options={["New", "Used"]}>Condition</FilterButton>
          <FilterButton>Price</FilterButton>
        </section>
        <SortButton/>
      </div>
    </>
  );
};

export default FilterComponent;
