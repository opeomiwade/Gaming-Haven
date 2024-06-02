"use client";
import DashBoardGrid from "@/components/dashboard/DashBoardGrid";
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
    <main
      className={`space-y-8 flex flex-col flex-grow ${
        mediumScreen ? "pl-6" : "ml-[230px]"
      }`}
    >
      <h1 className="font-bold text-2xl mt-4">Gaming Haven DashBoard</h1>
      {isFetching ? (
        <div className="h-screen items-center w-full">
          <CircularProgress />
        </div>
      ) : (
        <DashBoardGrid dashDetails={dashDetails} />
      )}
    </main>
  );
}

export default DashboardPage;
