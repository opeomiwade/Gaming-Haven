import { useContext, useState, useRef, useEffect } from "react";
import ListingContext from "@/context/ListingContext";
import toTitleCase from "@/utils/toTitleCase";
import queryClient from "@/lib/http";
import { Listing } from "@/types/types";

const CheckBoxInput: React.FC<{
  option: string;
  filterKey: string;
  changeHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    option: string
  ) => void;
  sortChecked?: boolean;
}> = ({ option, filterKey, changeHandler, sortChecked }) => {
  const { filters } = useContext(ListingContext);
  const listings = queryClient.getQueryData<Listing[]>(["listings", filters]);
  const checkboxRef = useRef<HTMLInputElement>();

  const [checked, setChecked] = useState<boolean>(() => {
    if (sortChecked) {
      return sortChecked;
    }
    return (
      filterKey in filters &&
      listings!.some((listing) =>
        filters.manufacturers!.includes(
          listing.listedProduct.manufacturer.toLowerCase()
        )
      )
    );
  });

  useEffect(() => {
    // Synchronize the checked state of this checkbox with the current selected sort option.
    // This ensures that only one sort option can be checked at any given time.
  }, [sortChecked]);

  return (
    <div key={option} className="flex items-center gap-4">
      <input
        type="checkbox"
        value={option}
        checked={checked}
        id={option}
        ref={checkboxRef as React.Ref<HTMLInputElement>}
        onClick={() => setChecked(!checked)}
        onChange={(event) => changeHandler(event, option)}
        className="hover:cursor-pointer"
      />
      <label htmlFor={option}>{toTitleCase(option)}</label>
    </div>
  );
};

export default CheckBoxInput;
