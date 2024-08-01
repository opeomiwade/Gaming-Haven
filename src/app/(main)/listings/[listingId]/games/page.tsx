"use client";
import { getListing, getPlatformGames } from "@/lib/actions";
import { Listing, RawgResponse } from "@/types/types";
import GameCard from "@/components/ui/GameCard";
import ReturnButton from "@/components/ui/ReturnButton";
import { CircularProgress } from "@mui/material";
import Pages from "@/components/ui/Pages";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { BiSolidError } from "react-icons/bi";

function GamesPage() {
  const pathname = usePathname();
  const listingId = pathname.split("/")[2];
  const [page, setPage] = useState<number>(1);

  const { data: listing } = useQuery<Listing>({
    queryKey: ["listing", listingId],
    queryFn: () => getListing(parseInt(listingId)),
    staleTime: 60000, // Adjust stale time as needed
  });

  const {
    data,
    isFetching,
    error: rawgError,
  } = useQuery<RawgResponse>({
    queryKey: [
      "games",
      { page },
      { product: listing?.listedProduct.productName },
    ],
    queryFn: () => getPlatformGames(listing!.listedProduct.productName, page),
    enabled: Boolean(listing?.listedProduct.productName),
    staleTime: 3600000,
  });

  function pageClickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    const page = event.currentTarget.id;
    setPage(parseInt(page));
  }

  function nextPageHandler() {
    if (page < 5) setPage(page + 1);
  }

  function prevPageHandler() {
    if (page > 1) setPage(page - 1);
  }

  if (rawgError) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-screen w-full">
        <BiSolidError size={100} />
        <h2 className="text-3xl font-bold">{rawgError.name}</h2>
        <p>{rawgError.message}</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col mt-4 p-6">
      {isFetching ? (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <h2 className="font-bold text-3xl">
            {listing?.listedProduct.productName} Games
          </h2>
          <ReturnButton />
          <section className="grid grid-cols-3 gap-4">
            {data?.results.map((game: { [key: string]: any }) => {
              return (
                <GameCard
                  key={game.id}
                  game={game}
                  platform={listing!.listedProduct.productName}
                />
              );
            })}
          </section>{" "}
          {page == 5 && (
            <Link
              href="https://rawg.io"
              className="text-xl flex gap-2 mx-auto mt-4 dark:text-white"
            >
              View more at{" "}
              <p className="hover:text-blue-500 underline font-semibold">
                Rawg.io
              </p>
            </Link>
          )}
          <Pages
            pageClickHandler={pageClickHandler}
            currentPage={page}
            next={nextPageHandler}
            prev={prevPageHandler}
          />
        </>
      )}
    </main>
  );
}

export default GamesPage;
