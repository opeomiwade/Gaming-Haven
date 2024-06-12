"use client";
import DashBoardGrid from "@/components/dashboard-page/DashBoardGrid";
import { getDashDetails } from "@/lib/http";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

function DashboardPage() {
  const { data: dashDetails, isFetching } = useQuery({
    queryKey: ["dashboard-details"],
    queryFn: getDashDetails,
    staleTime: 3000,
  });
  const [mediumScreen, setMediumScreen] = useState<boolean>();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width < 768) {
          setMediumScreen(true);
        } else {
          setMediumScreen(false);
        }
      }
    });
    resizeObserver.observe(document.documentElement);
  }, []);

  return (
    <main className={`flex flex-col `}>
      <h1 className="font-bold text-2xl mt-4 px-6">
        My Gaming Haven DashBoard
      </h1>
      {isFetching ? (
        <div className="flex justify-center h-screen items-center p-6 w-full">
          <CircularProgress />
        </div>
      ) : (
        <DashBoardGrid dashDetails={dashDetails} />
      )}
    </main>
  );
}

export default DashboardPage;
