import Image from "next/image";
import React from "react";
import BannerImage from "@/assets/images/home-feed.png";
import { Badge } from "@/components/ui/badge";
import Text from "@/components/typography/text";
import Heading from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import { PlayIcon, WishlistIcon } from "@/icons";

const HomeBanner = () => {
  return (
    <div className="px-[32px] mt-[48px] w-full">
      <div className="w-full h-[366px] rounded-3xl overflow-hidden relative">
        <div className="flex flex-col justify-end items-start absolute z-10 top-0 left-0 w-full h-full bg-[linear-gradient(270deg,_#0D0C0F00,_#0D0C0F)] p-[0_0_49px_40px]">
          <Badge
            variant={"secondary"}
            className="px-[16px] py-[8px] rounded-2xl w-min h-min bg-secondary-foreground dark:bg-secondary text-grayscale-10"
          >
            <Text size="md" weight="semibold" className="!text-inherit">
              Series
            </Text>
          </Badge>
          <Heading
            variant="h5"
            weight="bold"
            className="mt-[12px] text-grayscale-10"
          >
            MS. Marvel
          </Heading>
          <Text
            size="sm"
            weight="medium"
            className="!text-grayscale-60 mt-[8px] mb-[32px]"
          >
            1 Season • 6 Episodes • Superhero • Marvel
          </Text>
          <div className="flex items-center gap-[16px]">
            <Button className="h-[56px]">
              <PlayIcon className="!w-[24px] !h-[24px] mr-[8px]" />
              <Text size="md" weight="semibold" className="!text-inherit">
                Watch Thriller
              </Text>
            </Button>
            <Button
              className="h-[52px] hover:bg-grayscale-90 !text-grayscale-10"
              variant={"ghost"}
            >
              <WishlistIcon className="!w-[24px] !h-[24px] mr-[8px]" />
              <Text size="sm" weight="semibold" className="!text-inherit">
                Add wishlist
              </Text>
            </Button>
          </div>
        </div>
        <Image
          src={BannerImage}
          fill
          alt="banner image"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
