import { oswald } from "@/shared/utils";
import { MovieType } from "@/types/movieTypes";
import { Star } from "lucide-react";
import Image from "next/image";

const IMG_ROOT_PATH = "https://image.tmdb.org/t/p/original";

export const MovieCard = (data: MovieType) => {
  const { title, backdrop_path, vote_average, vote_count, overview } = data;
  return (
    <div className="rounded-lg border border-gray-200 shadow-md pb-[56.25%] relative overflow-hidden group z-0">
      <Image
        src={`${IMG_ROOT_PATH}/${backdrop_path}`}
        quality={61}
        priority={true}
        alt={title}
        fill={true}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        style={{ objectFit: "cover", objectPosition: "50% 50%" }}
        className="transition-transform duration-500 transform group-hover:scale-105  ease-[cubic-bezier(0.25, 1, 0.5, 1)]"
      />
      <div className="bg-gradient-to-b from-neutral-900/10 to-neutral-900/95 to-90% inset-0 absolute" />
      <div className="flex flex-col justify-end gap-1 absolute z-10 inset-0 p-4">
        <h3 className={`${oswald.className} text-lg font-bold`}>{title}</h3>
        <p className="text-sm line-clamp-3 max-h-0 group-hover:max-h-full transition-all duration-1000 ease-[cubic-bezier(0.25, 1, 0.5, 1)]">
          {overview}
        </p>
        <p className="flex gap-1 items-center text-xs mt-2">
          <Star fill="white" size={10} className="shrink-0" />
          <span>
            {vote_average}/{vote_count}
          </span>
        </p>
      </div>
    </div>
  );
};
