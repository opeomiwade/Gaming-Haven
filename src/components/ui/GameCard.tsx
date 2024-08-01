import { Platform } from "@/types/types";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { FaWindows, FaPlaystation, FaXbox } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { getGameStores } from "@/lib/actions";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { Store } from "@/types/types";
import { getGameTrailerVideo } from "@/lib/actions";
import NoSSRWrapper from "../client-wrappers/NoSSRWrapper";

const GameCard: React.FC<{
  game: { [key: string]: any };
  platform: string;
}> = ({ game, platform }) => {
  const platformIcons = {
    pc: <FaWindows title="PC" />,
    playstation: <FaPlaystation title="PlayStation" />,
    xbox: <FaXbox title="Xbox" />,
    nintendo: <SiNintendo title="Nintendo" size={20} />,
  } as { [key: string]: any };

  const [store, setStore] = useState<Store>();
  const [gameTrailerId, setTrailerId] = useState<string>("");
  const [imageHover, setHover] = useState<boolean>(false);

  useEffect(() => {
    getGameStores(game.id.toString())
      .then((stores) => {
        if (Object.keys(stores).length > 0) {
          setStore(() => {
            let [store] = stores.filter((store: { [key: string]: any }) => {
              if (platform.split(" ")[0].toLowerCase() == "xbox") {
                return (
                  store.url.includes(platform.split(" ")[0].toLowerCase()) ||
                  store.url.includes("microsoft")
                );
              } else {
                return store.url.includes(platform.split(" ")[0].toLowerCase());
              }
            });
            return store ? store : stores[0];
          });
        }
      })
      .catch((error) => console.log(error));
    getGameTrailerVideo(game.name.toString())
      .then((video) => setTrailerId(video.id.videoId))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className="rounded-md h-[420px] bg-white dark:bg-zinc-800 shadow-md mt-2 flex flex-col">
      {imageHover ? (
        <NoSSRWrapper>
          <div
            className="relative h-[250px] w-full rounded-t-md"
            onMouseLeave={() => setHover(false)}
          >
            <iframe
              width="100%"
              height="250"
              src={`https://www.youtube.com/embed/${gameTrailerId}?autoplay=1`}
              title="YouTube video player"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </NoSSRWrapper>
      ) : (
        <div
          className="relative h-[250px] w-full rounded-t-md"
          onMouseEnter={() => setHover(true)}
        >
          <Image
            src={game["background_image"]}
            fill
            alt={game.name}
            className="rounded-t-md"
          />
        </div>
      )}
      <section className="flex flex-col gap-2 p-2">
        <div className="platform-icons flex space-x-2 mt-2 items-center">
          <p className="font-bold text-sm">Also On: </p>
          {game["parent_platforms"]
            .filter(
              (parentPlatform: Platform) =>
                !platform.includes(parentPlatform.platform.name)
            )
            .map((platform: Platform) => {
              const icon = platformIcons[platform.platform.slug];
              if (icon) {
                return (
                  <div
                    key={platform.platform.id}
                    className="text-gray-700 dark:text-white"
                  >
                    {icon}
                  </div>
                );
              }
            })}
        </div>
        {store ? (
          <Link href={store.url}>
            <p className="dark:text-white text-black font-semibold hover:text-blue-500 dark:hover:text-blue-500">
              {game.name}
            </p>
          </Link>
        ) : (
          <p className="dark:text-white text-black font-semibold hover:text-blue-500 dark:hover:text-blue-500">
            {game.name}
          </p>
        )}
        <p className="text-gray-500 text-xs">
          <span className="font-bold">Release date:</span> {game.released}
        </p>
        <p className="font-light text-sm">
          <span className="font-semibold text-sm">Genres: </span>
          {game.genres.map((genre: any) => genre.name).join(", ")}
        </p>
        <div className="flex items-center w-fit p-1 text-xs bg-gray-200 dark:bg-black rounded-lg">
          <span>{game["ratings_count"]}</span>
          <CiStar size={20} className="mx-1 text-yellow-500" />{" "}
          <p>
            at{" "}
            <span className="font-semibold text-yellow-500">{game.rating}</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default GameCard;
