'use client';
import { useState, useEffect } from 'react'
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { isMobile } from "react-device-detect";
import Button from "@/components/Button";
import InputField from "@/components/InputField";



export default function ListenApp() {
    const [viewAreaHeight, setViewAreaHeight] = useState(0)
    const [isPlayerOpen, setIsPlayerOpen] = useState(false)

    useEffect(() => {
        setViewAreaHeight(window.innerHeight);
    }, [])

    return (
        <>
            <div
                className="min-h-screen bg-black bg-[length:172px_172px] lg:flex lg:flex-col lg:items-center lg:justify-center"
                style={{ backgroundImage: "url(/bg-pattern.svg)" }}
            >
                <div
                    className={`h-screen bg-black lg:rounded-2xl lg:w-[50vw] lg:h-[75vh] lg:grid lg:grid-cols-2 lg:overflow-clip`}
                    style={{ boxShadow: "0px 10px 33px 4px rgba(0, 128, 128, 0.75)" }}
                >
                    <LayoutGroup>
                        <motion.div
                            layout={isMobile ? false : true}
                            className={`bg-black p-6 h-full
                        ${isPlayerOpen ? `lg:col-span-1` : `lg:col-span-2`}
                        `}
                            onClick={() => setIsPlayerOpen(true)}
                        >
                            <motion.div
                                layout={isMobile ? false : "position"}>
                                <div className="w-full flex mb-8">
                                    <Button type="primary" className="px-6 py-2 w-full">
                                        Fetch article
                                    </Button>
                                    <Button className="px-6 py-2 w-full bg-transparent">
                                        Paste article
                                    </Button>
                                </div>
                                <div className="relative">
                                    <InputField placeholder="Link to article" onChange={() => { }} />
                                    <Button type="primary" className="absolute right-0 rounded-l-none py-2 px-4">Fetch</Button>
                                </div>
                            </motion.div>
                        </motion.div>
                        <AnimatePresence>
                            {isPlayerOpen &&
                                <motion.div
                                    key={isPlayerOpen}
                                    // layout
                                    layout={isMobile ? false : true}
                                    className={`bg-primary-700 h-full
                                        ${isPlayerOpen ? `absolute top-0 w-full lg:static lg:col-span-1 lg:w-auto` : `hidden lg:col-span-0`}
                                    `}
                                    onClick={() => setIsPlayerOpen(false)}
                                    animate={isMobile && { y: [1000, 0] }}
                                    exit={isMobile && { y: [0, 1000] }}
                                    transition={isMobile && {
                                        duration: 0.75,
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
