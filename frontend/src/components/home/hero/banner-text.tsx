"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type BannerProps = {
    bannerText: string[]
}
export function Banner({ bannerText }: BannerProps) {
    const [currentText, setCurrentText] = useState(0);

    useEffect(() => {
        let interval: any;
        const startAnimation = () => {
            interval = setInterval(() => {
                setCurrentText((prev) => (prev + 1) % bannerText.length);
            }, 3500);
        };
        startAnimation();
        return () => clearInterval(interval);
    }, [bannerText.length]);

    return (

        <AnimatePresence mode="wait">
            <motion.p
                initial={{
                    y: 5,
                    opacity: 0,
                }}
                key={`current-placeholder-${currentText}`}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                exit={{
                    y: -15,
                    opacity: 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: "linear",
                }}
                className="mt-6 text-md leading-8 text-gray-600 "
            >
                {bannerText[currentText]}
            </motion.p>
        </AnimatePresence>
    );
}
