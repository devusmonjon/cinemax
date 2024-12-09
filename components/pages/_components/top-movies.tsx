import { MOVIES } from "@/app/constants/movies";
import SmallMovieCard from "@/components/cards/small-movie-card";
import Text from "@/components/typography/text";
import { Button } from "@/components/ui/button";

const TopMovies = () => {
  return (
    <aside className="w-[370px] h-[calc(100vh_-_72px)] fixed bottom-0 right-0 pt-[50px] pl-[32px] pr-[52px] overflow-y-auto">
      <Text size="xl" weight="bold">
        Top Movies
      </Text>
      <div className="flex flex-col gap-6 mt-[24px]">
        {MOVIES.slice(0, 3).map((movie) => (
          <SmallMovieCard key={movie._id} {...movie} />
        ))}
      </div>
      <Button variant={"outline"} className="mt-8 w-full h-[44px]">
        <Text
          size="md"
          weight="semibold"
          className="!text-inherit py-[12px] px-[24px]"
        >
          See all
        </Text>
      </Button>
      <Text size="xl" weight="bold" className="mt-[40px]">
        Favorites Genres
      </Text>
      <div className="flex flex-wrap items-center mt-4 gap-[12px]">
        {[
          "Action",
          "Fantacy",
          "Comedy",
          "Horror",
          "Romance (Romantik)",
          "Thriller",
        ].map((genre) => (
          <Button
            key={genre}
            variant={"secondary"}
            className="mt-4 py-[8px] px-[16px] h-auto rounded-[24px]"
          >
            <Text size="sm" weight="semibold" className="!text-inherit">
              {genre}
            </Text>
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default TopMovies;
