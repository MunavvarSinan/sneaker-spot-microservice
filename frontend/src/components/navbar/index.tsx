// "use client"

// import { useState } from 'react'
// import { usePathname } from 'next/navigation'
// import Link from 'next/link'
// import Image from 'next/image'
// import { motion } from 'framer-motion'
// import { Bell, Menu, Search, User } from 'react-feather'

// import { MenuLinks } from './menu-links'
// import MobileMenu from './mobile-menu'


// type Props = {}

// function Navbar({ }: Props) {
// const [isOpen, setIsOpen] = useState(false)

// function toggle() {
//     setIsOpen(!isOpen)
//     document.documentElement.classList.toggle('contain')
// }

// function close() {
//     setIsOpen(false)
//     document.documentElement.classList.remove('contain')
// }

//     return (

//         <header
//             className={`${isOpen ? 'open' : 'closed'
//                 }  z-50 left-0 right-0 md:container mt-[-1rem] lg:max-w-[120rem] flex justify-between items-center mix-blend-difference  `}
//         >
// <Link
//     href="/"
//     onClick={close}
//     className={`${isOpen ? '' : ''
//         } z-50  relative   text-black mix-blend-difference `}
// >
//     <div className="relative z-10 flex px-2 lg:px-0">
//         <div className="flex flex-shrink-0 items-center">
//             <Image
//                 width={0}
//                 height={0}
//                 sizes='280px'
//                 style={{
//                     width: 'auto',
//                     height: 'auto',
//                     maxWidth: '50%',
//                 }}
//                 src="/assets/images/logo.png"
//                 alt="Your Company"
//             />
//         </div>
//     </div>
// </Link>

//             <MobileMenu opened={isOpen} setOpened={setIsOpen} />
//             <MenuLinks />
// <div className="relative z-5 ml-4 flex items-center space-x-3">
//     <div className="w-full sm:max-w-[15rem] hidden md:block">
//         <label htmlFor="search" className="sr-only">
//             Search
//         </label>
//         <div className="relative">
//             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <Search className="h-5 w-5 text-gray-400 bg-white" aria-hidden="true" />
//             </div>
//             <input
//                 id="search"
//                 name="search"
//                 className="block w-full  rounded-3xl border border-gray-300  py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//                 placeholder="Search"
//                 type="search"
//             />
//         </div>
//     </div>
//     <button
//         type="button"
//         className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//     >
//         <span className="sr-only">View notifications</span>
//         <Bell className="h-6 w-6" aria-hidden="true" />
//     </button>
//     <button
//         type="button"
//         className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//     >
//         <span className="sr-only">View notifications</span>
//         <User className="h-6 w-6" aria-hidden="true" />
//     </button>
//     <motion.button
//         onClick={toggle}
//         className="relative rz-50 h-7 w-14 text-xl text-black mix-blend-difference lg:!hidden"
//         aria-label="Toggle menu"
//     >
//         <span className="absolute left-0 right-0 top-0 bottom-0 overflow-hidden">
//             <motion.span
//                 initial={false}
//                 animate={
//                     isOpen
//                         ? { y: '100%', skewY: '5deg', scale: 0.9 }
//                         : { y: 0, skewY: 0, scale: 1 }
//                 }
//                 transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
//                 className="absolute left-0 right-0 "
//             >
//                 <Menu className='h-7 w-7' />
//             </motion.span>

//         </span>
//     </motion.button>
// </div>
//         </header>

//     )
// }

// export default Navbar
"use client";
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Bell, Menu, Search, User } from 'react-feather';
import { ShoppingCartIcon } from 'lucide-react';
import { MenuLinks } from './menu-links';

const Navbar = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    const { scrollY } = useScroll();
    const lastYRef = useRef(0);

    useMotionValueEvent(scrollY, "change", (y) => {
        const difference = y - lastYRef.current;
        if (Math.abs(difference) > 50) {
            setIsHidden(difference > 0);
            lastYRef.current = y;
        }
    });

    function toggle() {
        setIsOpen(!isOpen)
        document.documentElement.classList.toggle('contain')
    }

    function close() {
        setIsOpen(false)
        document.documentElement.classList.remove('contain')
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <motion.div
            animate={isHidden ? "hidden" : "visible"}
            whileHover="visible"
            onFocusCapture={() => setIsHidden(false)}
            variants={{
                hidden: {
                    y: "-90%",
                },
                visible: {
                    y: "0%",
                },
            }}
            transition={{ duration: 0.2 }}
            className={`fixed bg-primary  top-0 z-50 flex flex-col w-full justify-center transition-colors duration-300 `} // Adjust color based on scroll
        >
            <div className='flex pr-5 justify-end text-sm items-end pt-2 pb-3'>
                LOGIN | CONTACT
            </div>
            <nav className={clsx(
                "flex items-center justify-between gap-3 w-full p-2 px-5 bg-white ",
                isHidden && 'rounded-3xl'
            )}>
                <a href="#">
                    Sneaker Spot
                    <span className="sr-only">Home</span>
                </a>
                <MenuLinks />
                <div>
                    <div className="relative z-5 ml-4 flex items-center space-x-3">
                        <div className="w-full sm:max-w-[15rem] hidden md:block">
                            <label htmlFor="search" className="sr-only">
                                Search
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Search className="h-5 w-5 text-gray-400 bg-white" aria-hidden="true" />
                                </div>
                                <input
                                    id="search"
                                    name="search"
                                    className="block w-full  rounded-3xl border border-gray-300  py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Search"
                                    type="search"
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="sr-only">View notifications</span>
                            <Bell className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="sr-only">View notifications</span>
                            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <motion.button
                            onClick={toggle}
                            className="relative  text-xl text-secondary lg:!hidden"
                            aria-label="Toggle menu"
                        >
                            <Menu className='h-7 w-7 text-gray-400' />
                        </motion.button>
                    </div>
                </div>
            </nav>
        </motion.div>
    );
};

export default Navbar;

