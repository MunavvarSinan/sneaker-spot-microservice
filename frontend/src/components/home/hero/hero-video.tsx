"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { VideoPlayerControls } from './video-player-controls';
import { useMediaQuery } from 'react-responsive';

type Props = {}

const HeroVideo = (props: Props) => {
    const [videoProgress, setVideoProgress] = useState<number>(0);
    const [videoDuration, setVideoDuration] = useState<number>(0);
    const [isPaused, setIsPaused] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const targetRef = useRef(null);

    const isMediumOrLarger = useMediaQuery({ query: '(min-width: 768px)' });

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const handleLoadedMetadata = () => {
                setVideoDuration(video.duration);
            };
            video.addEventListener("loadedmetadata", handleLoadedMetadata);

            return () => {
                video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            };
        }
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const video = videoRef.current;
        if (video) {
            const updateProgress = () => {
                const currentTime = video.currentTime;
                setVideoProgress(currentTime / videoDuration);
            };

            const interval = setInterval(updateProgress, 100);
            return () => clearInterval(interval);
        }
    }, [videoDuration, isPaused]);

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (video) {
            if (video.paused) {
                video.play();
                setIsPaused(false);
            } else {
                video.pause();
                setIsPaused(true);
            }
        }
    };

    return (
        <>
            <motion.div
                style={{
                    scale: isMediumOrLarger ? scale : '',
                }}
                ref={targetRef}
                className="sticky z-0 overflow-hidden rounded-xl mx-[15px] md:mx-0"
            >
                <div className="absolute top-4 right-4 z-10">
                    <VideoPlayerControls
                        progress={videoProgress}
                        isPaused={isPaused}
                        onPlayPause={togglePlayPause}
                    />
                </div>
                <video className="w-full" ref={videoRef} loop muted autoPlay>
                    <source src="/assets/video/hero.mp4" />
                </video>
            </motion.div>
        </>
    )
}

export default HeroVideo;
