"use client";

import HomeBanner from "@/components/pages/_components/home-banner";
import TopMovies from "./_components/top-movies";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import disney from "@/assets/images/brands/disney.png";
import natGeoImage from "@/assets/images/brands/national-geographic.png";
import starWarsImage from "@/assets/images/brands/Star Wars.png";
import marvelImage from "@/assets/images/brands/Marvel.png";

import disneyLight from "@/assets/images/brands/disney-light.png";
import natGeoImageLight from "@/assets/images/brands/national-geographic-light.png";
import starWarsImageLight from "@/assets/images/brands/Star Wars-light.png";
import marvelImageLight from "@/assets/images/brands/Marvel-light.png";

import Image from "next/image";
import { useTheme } from "next-themes";
import NoSSR from "react-no-ssr";

const Home = () => {
  const { theme } = useTheme();
  return (
    <section id="home" className="w-full relative">
      <div className="w-full flex relative">
        <div className="w-[calc(100%-362px)]">
          <HomeBanner />
          <div className="w-full pl-8 mt-[8px] relative">
            <NoSSR>
              <Swiper
                spaceBetween={24}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                breakpoints={{
                  640: {
                    slidesPerView: 2, // 640px yoki undan kichik ekranlar uchun
                  },
                  768: {
                    slidesPerView: 3, // 768px yoki undan katta ekranlar uchun
                  },
                  1024: {
                    slidesPerView: 4, // 1024px yoki undan katta ekranlar uchun
                  },
                }}
              >
                <SwiperSlide>
                  <div className="min-w-[177px] max-w-[177px] min-h-[88px] max-h-[88px] relative">
                    <Image
                      src={theme !== "dark" ? disney : disneyLight}
                      alt="Disney Image"
                      fill
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="min-w-[177px] max-w-[177px] min-h-[88px] max-h-[88px] relative">
                    <Image
                      src={theme !== "dark" ? natGeoImage : natGeoImageLight}
                      alt="National Geographic Image"
                      fill
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="min-w-[177px] max-w-[177px] min-h-[88px] max-h-[88px] relative">
                    <Image
                      src={
                        theme !== "dark" ? starWarsImage : starWarsImageLight
                      }
                      alt="Star Wars Image"
                      fill
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="min-w-[177px] max-w-[177px] min-h-[88px] max-h-[88px] relative">
                    <Image
                      src={theme !== "dark" ? marvelImage : marvelImageLight}
                      alt="Marvel Image"
                      fill
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </NoSSR>
            <div className="w-[106px] h-[88px] absolute top-0 right-0 bg-[linear-gradient(270deg,_hsl(var(--background))_0%,_rgba(255,_255,_255,_0.00)_100%)] z-[99999999]"></div>
          </div>
        </div>
        <TopMovies />
      </div>
    </section>
  );
};

export default Home;
