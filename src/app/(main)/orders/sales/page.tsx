"use client";
import React from "react";
import { getSales } from "@/lib/actions";
import SalesTableRow from "@/components/order-page/SalesTableRow";
import { Order } from "@/types/types";
import SalesTableHeader from "@/components/order-page/SalesTableHeader";
import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "@/hooks/useLocalStorage";

const PurchasesPage = () => {
  const [idToken] = useLocalStorage<string>("accessToken");
  const { data: purchases, isFetching } = useQuery<Order[]>({
    queryKey: ["purchases"],
    queryFn: () => getSales(idToken!),
    staleTime: 60000
  });

  return (
    <main className="h-screen w-full">
      <h1 className="font-bold text-3xl px-6">Sales</h1>
      <SalesTableHeader />
      <ul className="w-full p-4">
        {isFetching ? (
          <p className="text-center text-black loading">Loading....</p>
        ) : (
          purchases?.map((purchase) => (
            <SalesTableRow key={purchase.orderId} order={purchase} />
          ))
        )}
      </ul>
    </main>
  );
};

export default PurchasesPage;
