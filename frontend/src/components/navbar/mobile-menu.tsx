"use client"
import { Dispatch, SetStateAction } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { X } from 'react-feather';

export const defaultEase = [0.6, 0.01, -0.05, 0.9];

export const maskAnimation = {
    from: {
        x: '-100%',
        transition: { ease: [0.2, 1, 0.8, 0], duration: 0.5 },
    },
    to: {
        x: '100%',
        transition: { ease: [0.2, 1, 0.8, 0], duration: 0.5 },
    },
};

export const menuAnimation = {
    from: {
        opacity: 0,
        transition: { duration: 0, delay: 0.25 },
    },
    to: {
        opacity: 1,
        transition: { duration: 0, delay: 0.25 },
    },
};

export const menuItemAnimation = {
    from: {
        x: -50,
    },
    to: {
        x: 0,
    },
};
const anchorStyle = 'font-semibold text-2xl';

const Anchor = ({
    title,
    index,
    handleClose,
}: {
    title: string;
    index: number;
    handleClose: () => void;
}) => {
    return (
        <Link href="shoes" passHref>
            <motion.a
                className={anchorStyle}
                onClick={handleClose}
                transition={{ delay: 0.3 + index * 0.05, ease: defaultEase }}
                variants={menuItemAnimation}
                initial="from"
                animate="to"
            >
                {title}
            </motion.a>
        </Link>
    );
};

interface Props {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
}

const MobileMenu = ({ opened, setOpened }: Props) => {
    const handleClose = () => {
        setOpened(false);
    };


    return (
        <AnimatePresence>
            {opened && (
                <>
                    <motion.div
                        className="fixed left-0 top-0 z-20 h-full w-full bg-zinc-900 flex lg:hidden"
                        variants={maskAnimation}
                        initial="from"
                        animate="to"
                        exit="from"
                    />
                    <motion.div
                        className="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-5 bg-white"
                        variants={menuAnimation}
                        initial="from"
                        animate="to"
                        exit="from"
                    >
                        <button
                            className="btn-icon absolute right-10 top-5"
                            onClick={() => setOpened(false)}
                        >
                            <X />
                        </button>

                        <Anchor
                            handleClose={() => {
                                
                            }}
                            index={0}
                            title="Men"
                        />

                        <Anchor
                            handleClose={() => {
                                handleClose();
                               
                            }}
                            index={1}
                            title="Women"
                        />

                        <Anchor
                            handleClose={() => {
                                handleClose();
                                
                            }}
                            index={2}
                            title="Kids"
                        />

                        <Anchor
                            handleClose={() => {
                                handleClose();
                                
                            }}
                            index={3}
                            title="Unisex"
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;