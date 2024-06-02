import Tabs from "@/components/ui/NavTabs";
import axiosInstance from "@/lib/axiosInstance";
import { Product } from "@/types/types";
import { useEffect, useState } from "react";
import MarketPlaceCategoryItem from "../market-place-categories/MarketPlaceCategoryItem";

const MarketPlaceTopCategories = () => {
  const [selected, setSelected] = useState<string>("Consoles");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`/products/category/${selected.toLowerCase()}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, [selected]);

  return (
    <>
      <Tabs
        layoutId="active-tab-market-place-cat"
        tabs={["Consoles", "Controllers", "Headphones"]}
        selected={selected}
        setSelected={setSelected}
      />
      <ul className="mt-4 space-y-6 h-[60%] overflow-y-auto">
        {products.map((product) => (
          <MarketPlaceCategoryItem product={product} />
        ))}
      </ul>
    </>
  );
};

export default MarketPlaceTopCategories;
