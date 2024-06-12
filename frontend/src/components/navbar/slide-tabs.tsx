// "use client"

// import React, { useRef, useState, useEffect, Dispatch, SetStateAction } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// interface Position {
//     left: number;
//     width: number;
//     opacity: number;
// }

// interface TabProps {
//     name: string;
//     href: string;
//     setPosition: Dispatch<SetStateAction<Position>>;
//     isActive: boolean;
//     setHoveredTab: Dispatch<SetStateAction<string | null>>;
//     hoveredTab: string | null;
// }

// interface CursorProps {
//     position: Position;
// }

// export const SlideTabs: React.FC = () => {
//     const [position, setPosition] = useState<Position>({
//         left: 0,
//         width: 0,
//         opacity: 0,
//     });
//     const pathname = usePathname();
//     const [hoveredTab, setHoveredTab] = useState<string | null>(null);

// const tabs = [
//     { name: "Home", href: "/" },
//     { name: "Men", href: "/men" },
//     { name: "Features", href: "/features" },
//     { name: "Docs", href: "/docs" },
//     { name: "Blog", href: "/blog" }
// ];

//     useEffect(() => {
//         setHoveredTab(pathname);
//         const activeTab = document.querySelector(`li[data-href="${pathname}"]`);
//         if (activeTab) {
//             const { offsetLeft, offsetWidth } = (activeTab as HTMLElement);
//             setPosition({
//                 left: offsetLeft,
//                 width: offsetWidth,
//                 opacity: 1,
//             });
//         }
//     }, [pathname]);

//     console.log({ pathname, hoveredTab })

//     return (
//         <ul
//             onMouseLeave={() => {
//                 const activeTab = document.querySelector(`li[data-href="${pathname}"]`);
//                 if (activeTab) {
//                     const { offsetLeft, offsetWidth } = (activeTab as HTMLElement);
//                     setPosition({
//                         left: offsetLeft,
//                         width: offsetWidth,
//                         opacity: 1,
//                     });
//                 }
//                 setHoveredTab(pathname);
//             }}
//             className="relative mx-auto flex w-fit bg-white p-1"
//         >
//             {tabs.map((tab, index) => (
//                 <Tab
//                     key={index}
//                     name={tab.name}
//                     href={tab.href}
//                     setPosition={setPosition}
//                     isActive={pathname === tab.href}
//                     setHoveredTab={setHoveredTab}
//                     hoveredTab={hoveredTab}
//                 />
//             ))}
//             <Cursor position={position} />
//         </ul>
//     );
// };
// const Tab: React.FC<TabProps> = ({ name, href, setPosition, isActive, setHoveredTab, hoveredTab }) => {
//     const ref = useRef<HTMLLIElement>(null);

//     return (
//         <li
//             ref={ref}
//             data-href={href}
//             onMouseEnter={() => {
//                 if (!ref?.current) return;

//                 const { width } = ref.current.getBoundingClientRect();

//                 setPosition({
//                     left: ref.current.offsetLeft,
//                     width,
//                     opacity: 1,
//                 });
//                 setHoveredTab(href);
//             }}
//             onMouseLeave={() => {
//                 setHoveredTab(null);
//             }}
//             className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase md:px-5 md:py-3 md:text-base"
//         >
//             <Link href={href} className={`inline-block transition-opacity duration-300 ease-in-out ${hoveredTab === href ? "text-white font-semibold" : "text-black"}`}>
//                 {name}
//             </Link>
//         </li>
//     );
// };


// const Cursor: React.FC<CursorProps> = ({ position }) => {
//     return (
//         <motion.li
//             animate={{
//                 ...position,
//             }}
//             className="absolute z-0 h-7 rounded-full bg-black md:h-12"
//         />
//     );
// };


import { motion } from "framer-motion";
import { useState } from "react";

let tabs = [
    { id: '1', name: "Home", href: "/" },
    { id: '2', name: "Men", href: "/men" },
    { id: '3', name: "Features", href: "/features" },
    { id: '4', name: "Docs", href: "/docs" },
    { id: '5', name: "Blog", href: "/blog" }
];

export const SlideTabs = () => {
    let [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className="flex space-x-1">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${activeTab === tab.id ? "text-white" : "text-black"
                        } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-sky-400 transition focus-visible:outline-2`}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                >
                    {activeTab === tab.id && (
                        <motion.span
                            layoutId="bubble"
                            className="absolute inset-0 z-10 bg-black  mix-blend-difference"
                            style={{ borderRadius: 9999 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    {tab.name}
                </button>
            ))}
        </div>
    );
}
