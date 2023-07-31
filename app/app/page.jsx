'use client';
import { useState, useEffect } from 'react'
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { isMobile } from "react-device-detect";



export default function ListenApp() {
    const [viewAreaHeight, setViewAreaHeight] = useState(0)
    const [isPlayerOpen, setIsPlayerOpen] = useState(false)

    useEffect(() => {
        setViewAreaHeight(window.innerHeight);
    }, [])

    return (
        <>
            <style jsx global>{`
            @media only screen and (max-width: 1440px) {
                    .responsive-viewport-height{
                            height: ${viewAreaHeight > 0 ? viewAreaHeight : `100vh`}
                         }
                    }
                `}
            </style>
            <div
                className="min-h-screen bg-black bg-[length:172px_172px] lg:flex lg:flex-col lg:items-center lg:justify-center"
                style={{ backgroundImage: "url(/bg-pattern.svg)" }}
            >
                <div
                    className={`lg:w-[50vw] h-screen responsive-viewport-height lg:h-[75vh] lg:grid grid-cols-1 lg:grid-cols-2 bg-black rounded-2xl lg:overflow-clip`}
                    style={{ boxShadow: "0px 10px 33px 4px rgba(0, 128, 128, 0.75)" }}
                >
                    <LayoutGroup>
                        <motion.div
                            layout={isMobile ? false : true}
                            className={`bg-primary-200 p-6 h-full
                        ${isPlayerOpen ? `hidden lg:block lg:col-span-1` : `block lg:block lg:col-span-2`}
                        `}
                            onClick={() => setIsPlayerOpen(true)}
                        >
                            <motion.p layout={isMobile ? false : "position"}>Left</motion.p>
                        </motion.div>
                        <AnimatePresence>
                            {isPlayerOpen &&
                                <motion.div
                                    key={isPlayerOpen}
                                    // layout
                                    layout={isMobile ? false : true}
                                    className={`bg-primary-700 h-full
                                        ${isPlayerOpen ? `block lg:col-span-1` : `hidden lg:col-span-0`}
                                    `}
                                    onClick={() => setIsPlayerOpen(false)}
                                    animate={isMobile && { y: [1000, 0] }}
                                    exit={isMobile && { y: [-1000, 0] }}
                                    transition={isMobile && {
                                        duration: 0.5,
                                        type: "tween"
                                    }}
                                >
                                    <motion.p layout={isMobile ? false : "position"}>Right</motion.p>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </LayoutGroup>
                </div>
            </div>
        </>
    )
}
