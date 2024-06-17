"use client";
import React from "react";
import { getUserSales } from "@/lib/actions";
import SalesTableRow from "@/components/order-page/SalesTableRow";
import { Listing } from "@/types/types";
import SalesTableHeader from "@/components/order-page/SalesTableHeader";
import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "@/hooks/useLocalStorage";
import { IoReceiptOutline as ReceiptLogo } from "react-icons/io5";

const PurchasesPage = () => {
  const [idToken] = useLocalStorage<string>("accessToken");
  const { data: sales, isFetching } = useQuery<Listing[]>({
    queryKey: ["sales"],
    queryFn: () => getUserSales(idToken!),
    staleTime: 60000,
  });

  return (
    <main className="h-screen w-full">
      <div className="flex items-center p-4 gap-2">
        <ReceiptLogo size={40} />
        <h1 className="font-bold text-3xl">Sales</h1>
      </div>

      <SalesTableHeader />
      <ul className="w-full p-4">
        {isFetching ? (
          <p className="text-center text-black loading">Loading....</p>
        ) : (
          sales?.map((sale) => (
            <SalesTableRow key={sale.listingId} sale={sale} />
          ))
        )}
      </ul>
    </main>
  );
};

export default PurchasesPage;
