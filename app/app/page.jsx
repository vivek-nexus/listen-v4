'use client';
import { useState, useEffect } from 'react'
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { isMobile } from "react-device-detect";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { create } from 'zustand'
import ArticleForm from "@/components/ArticleForm";
import Player from "@/components/Player";

export const useStore = create((set) => ({
    isPlayerOpen: false,
    setIsPlayerOpen: (isPlayerOpen) => set(() => ({ isPlayerOpen: isPlayerOpen })),
    currentTab: 1,
    setCurrentTab: (currentTab) => set(() => ({ currentTab: currentTab })),
}))


export default function ListenApp() {
    const isPlayerOpen = useStore((state) => state.isPlayerOpen)
    const setIsPlayerOpen = useStore((state) => state.setIsPlayerOpen)

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
                        >
                            <ArticleForm />
                        </motion.div>
                        <Player />
                    </LayoutGroup>
                </div>
            </div>
        </>
    )
}
