'use client';
import { useState, useEffect } from 'react'
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { isMobile } from "react-device-detect";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { create } from 'zustand'
import ArticleForm from "@/components/ArticleForm";
import Player from "@/components/Player";
import { colours } from "@/constants/colours";

export const useStore = create((set) => ({
    isPlayerOpen: false,
    setIsPlayerOpen: (isPlayerOpen) => set(() => ({ isPlayerOpen: isPlayerOpen })),
    currentTab: 1,
    setCurrentTab: (currentTab) => set(() => ({ currentTab: currentTab })),
    linkToArticle: "",
    setLinkToArticle: (linkToArticle) => set(() => ({ linkToArticle: linkToArticle })),
    article: {
        title: null,
        text: null
    },
    setArticleTitle: (title) => set((state) => ({
        ...state.article,
        article: {
            ...state.article,
            title
        }
    })),
    setArticleText: (text) => set((state) => ({
        ...state,
        article: {
            ...state.article,
            text
        }
    }))
}))


export default function ListenApp() {

    return (
        <>
            <div
                className="min-h-screen bg-black bg-[length:172px_172px] lg:flex lg:flex-col lg:items-center lg:justify-center"
                style={{ backgroundImage: "url(/bg-pattern.svg)" }}
            >
                <div
                    className={`h-screen flex flex-col bg-black lg:rounded-2xl lg:w-[70vw] xl:w-[50vw] lg:h-[75vh] lg:flex-row lg:overflow-clip`}
                    style={{ boxShadow: `0px 8px 64px 4px ${colours["primary-800/40"]}` }}
                >
                    <ArticleForm />
                    <Player />
                </div>
            </div >
        </>
    )
}
