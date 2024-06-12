"use client";
import React from "react";
import { getPurchases } from "@/lib/actions";
import PurchaseTableRow from "@/components/order-page/PurchaseTableRow";
import { Order } from "@/types/types";
import PurchaseTableHeader from "@/components/order-page/PurchaseTableHeader";
import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "@/hooks/useLocalStorage";
import { RiMoneyPoundCircleLine as PoundCoin } from "react-icons/ri";

const PurchasesPage = () => {
  const [idToken] = useLocalStorage<string>("accessToken");
  const { data: purchases, isFetching } = useQuery<Order[]>({
    queryKey: ["purchases"],
    queryFn: () => getPurchases(idToken!),
    staleTime: 60000,
  });

  return (
    <main className="h-screen w-full">
      <div className="flex gap-2 items-center p-4">
        <PoundCoin size={40} />{" "}
        <h1 className="font-bold text-3xl">Purchases</h1>
      </div>
      <PurchaseTableHeader />
      <ul className="w-full p-4">
        {isFetching ? (
          <p className="text-center text-black loading">Loading....</p>
        ) : (
          purchases?.map((purchase) => (
            <PurchaseTableRow key={purchase.orderId} purchase={purchase} />
          ))
        )}
      </ul>
    </main>
  );
};

export default PurchasesPage;
