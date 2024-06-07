"use client";
import Tabs from "../ui/NavTabs";
import { useState } from "react";

const StoreHeader = () => {
  const [selected, setSelected] = useState<string>("Active");

  return (
    <header className="w-full">
      <Tabs
        tabs={["Active", "Sold"]}
        layoutId="store-active-tab"
        selected={selected}
        setSelected={setSelected}
      />
    </header>
  );
};

export default StoreHeader;
