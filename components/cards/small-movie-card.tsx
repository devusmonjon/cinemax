import { IMovie } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Badge } from "../ui/badge";
import Text from "../typography/text";
import { FilmIcon, StarIcon } from "@/icons";

const SmallMovieCard: FC<IMovie> = ({
  title,
  poster,
  rating,
  genres,
  slug,
}) => {
  return (
    <Link href={`/movies/${slug}`} className="flex gap-4">
      <div className="min-w-[112px] min-h-[137px] bg-secondary overflow-hidden rounded-2xl relative">
        <Image
          src={poster}
          alt={title}
          fill
          className="object-cover hover:scale-105 duration-300 ease-in filter brightness-75 hover:brightness-100"
        />
      </div>
      <div className="flex flex-col w-full h-[137px] justify-between">
        <Badge
          variant={"outline"}
          className="w-min whitespace-nowrap border-line px-[8px] py-[4px] rounded-[8px]"
        >
          <Text size="md" weight="medium" className="!text-grayscale-60">
            PG-13
          </Text>
        </Badge>
        <Text
          size="md"
          weight="bold"
          className="whitespace-nowrap overflow-hidden w-[146px] text-ellipsis"
        >
          {title}
        </Text>
        <Text
          size="md"
          weight="semibold"
          className="flex items-center !text-grayscale-70 gap-1"
        >
          <FilmIcon className="!min-w-6 !min-h-6" />
          <span className=" whitespace-nowrap overflow-hidden w-[118px] text-ellipsis">
            {genres.join(" • ")}
          </span>
        </Text>
        <Text size="md" weight="semibold" className="flex items-center gap-1">
          <StarIcon className="!min-w-6 !min-h-6 text-alert-warning" />
          {rating}
        </Text>
      </div>
    </Link>
  );
};

export default SmallMovieCard;
