"use client"
import { NAV_LINKS } from "@/constants/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";



export const MenuLinks = () => {
    let [activeTab, setActiveTab] = useState(NAV_LINKS[0].id);

    return (
        <div className="hidden lg:!flex space-x-1 ml-[5rem] items-center">
            {NAV_LINKS.map((tab) => (
                <Link
                    href={tab.href}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${activeTab === tab.id ? "text-white" : "text-black"
                        } relative rounded-full px-3 py-1.5 text-sm font-medium`}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                >
                    {activeTab === tab.id && (
                        <motion.span
                            layoutId="bubble"
                            className="absolute inset-0 bg-black"
                            style={{ borderRadius: 9999 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-20">{tab.name}</span> {/* Adjusted z-index for text */}
                </Link>

            ))}
        </div>
    );
}
