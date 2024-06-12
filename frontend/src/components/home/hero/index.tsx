"use client";
import { BANNER_TEXTS } from '@/constants/hero';
import { Banner } from './banner-text';
import HeroVideo from './hero-video';
import { Heading } from '@/components/typography/headings';
import { Button } from '@/components/ui/button';

type Props = {}

const Hero = (props: Props) => {
    return (
        <section className="mt-[5rem]"> {/* Adjust this margin to match the height of the navbar */}
            <div className='relative pb-10 flex flex-col justify-center items-center space-y-4 text-center'>
                <Banner bannerText={BANNER_TEXTS} />
                <div className="max-w-[50rem] ml-auto mr-auto mt-20 text-center lg:max-w-[150rem]">
                    <div className="relative z-6 w-full mt-8">
                        <HeroVideo />
                    </div>
                </div>
                <div className="mx-auto max-w-4xl text-start px-5 md:px-0 md:text-center pt-5">
                    {/* <h1 className="text-4xl font-extrabold font-haveltica-black tracking-wider text-secondary sm:text-7xl">
                        FASHION STARTS FROM THE
                        {' '} GROUND UP .
                    </h1> */}
                    <Heading as="h1" size="h1" variant="main">
                        FASHION STARTS FROM THE
                        {' '} GROUND UP
                    </Heading>
                    {/* </span> */}
                    {/* <span className="text-accent text-accent-hero"> */}

                    <p className="mt-6 text-md leading-8 text-gray-600">
                        Discover stylish, comfortable shoes for every occasion. Elevate your look with our perfect pairs!
                    </p>
                    <div className="mt-10 flex items-start justify-start md:items-center md:justify-center gap-x-6">
                        <Button
                            className="rounded-3xl bg-[#41A1DC] px-6 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-secondary "
                        >
                            Buy It
                        </Button>
                        <Button
                            className="rounded-3xl bg-black text-white border border-black px-6 py-1.5 text-base font-semibold leading-7 shadow-sm hover:bg-[#41A1DC] hover:text-white "
                        >
                            Style It
                        </Button>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Hero;
