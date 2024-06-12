"use client"
import ClassicSpotlight from "@/components/home/classic-spotlight";
import FeaturedProducts from "@/components/home/featured-product";
import Hero from "@/components/home/hero";
import Perks from "@/components/home/perks";
import ShopBySport from "@/components/home/shop-by-sport";
import { VelocityScroll } from "@/components/home/velocity-scroll";
import { Heading } from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-[120rem] lg:px-4">
        <Hero />

        <div className="max-w-[100rem]  ml-auto mr-auto py-16 px-5 lg:px-0">
          <Image
            src="/assets/images/home/home-image-1.jpg"
            alt="Featured Footwear"
            layout="responsive"
            width={1920}
            height={1080}
            sizes="20vw (min-width: 640px) 30vw"
            objectFit="contain"
            className=""
          />
          <div className="mx-auto max-w-5xl text-center pt-10">

            <p className="mt-6 text-xl font-haveltica-bold leading-8 text-gray-900">
              Nike Pegasus 41
            </p>
            <Heading as="h1" size="h1" variant="main" className="tracking-wider uppercase" >
              {`Dont't Waste Your Energy`}
            </Heading>
            <p className="mt-3 text-lg  leading-8 text-gray-900">
              Run in Pegasus. Feel the responsive energy return of Air Zoom and all-new ReactX foam.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                className="rounded-3xl bg-black px-6 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-secondary "
              >
                Buy It
              </Button>
            </div>
          </div>
        </div>
        <VelocityScroll
          text="SEE OUR COLLECTIONS"
          default_velocity={2}
          className="font-display text-center text-5xl font-extrabold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
        />
        <FeaturedProducts />
        <ClassicSpotlight />
        <div className="max-w-[115rem]  ml-auto mr-auto py-16 px-5 lg:px-0">
          <Image
            src="/assets/images/home/home-image-2.jpg"
            alt="Featured Footwear"
            layout="responsive"
            width={1920}
            height={1080}
            sizes="20vw (min-width: 640px) 30vw"
            objectFit="contain"
            className=""
          />
          <div className="mx-auto max-w-5xl text-center pt-10">

            <p className="mt-6 text-xl font-haveltica-bold leading-8 text-gray-900">
              Best of Jordan
            </p>
            <Heading as="h1" size="h1" variant="main" className="tracking-wider uppercase" >
              {`Stay Fly`}
            </Heading>
            <p className="mt-3 text-lg  leading-8 text-gray-900">
              {`Dont't miss the latest footwear and apparel from Jordan.`}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                className="rounded-3xl bg-black px-6 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-secondary "
              >
                Shop
              </Button>
            </div>
          </div>
        </div>
        <ShopBySport />
        <Perks />
      </div>
    </>
  );
}
