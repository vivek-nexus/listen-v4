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
    fetchedArticle: {
        title: "",
        text: ""
    },
    setFetchedArticleTitle: (title) => set((state) => ({
        ...state.fetchedArticle,
        fetchedArticle: {
            ...state.fetchedArticle,
            title
        }
    })),
    setFetchedArticleText: (text) => set((state) => ({
        ...state,
        fetchedArticle: {
            ...state.fetchedArticle,
            text
        }
    })),
    pastedArticle: "",
    setPastedArticle: (pastedArticle) => set(() => ({ pastedArticle: pastedArticle })),
    sentencesArray: [],
    setSentencesArray: (sentencesArray) => set(() => ({ sentencesArray: sentencesArray })),

    // WebSpeech API
    currentSentence: null,
    setCurrentSentence: (currentSentence) => set(() => ({ currentSentence: currentSentence })),
    utterance: null,
    voices: [],
    setVoices: (voices) => set(() => ({ voices: voices })),
    startUtterance: (text) => {
        return new Promise((resolve, reject) => {
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.voice = speechSynthesis.getVoices()[0];
                utterance.rate = 1.0;
                utterance.pitch = 1.0;

                set({ utterance: utterance });

                utterance.onend = () => {
                    const utteranceEndTrigger = localStorage.getItem("utteranceEndTrigger")
                    console.log("[ONEND] Utterance will end due to " + utteranceEndTrigger)

                    localStorage.setItem("utteranceEndTrigger", "sentence_complete")
                    set({ utterance: null });
                    console.log("[ONEND] Utterance was resolved to sentence_complete")
                    resolve("sentence_complete");
                };

                utterance.onerror = (event) => {
                    console.log("Error is " + event.error)
                    const utteranceEndTrigger = localStorage.getItem("utteranceEndTrigger")
                    console.log("[ONERROR] Utterance will end due to " + utteranceEndTrigger)

                    if (utteranceEndTrigger == "pause") {
                        set({ utterance: null });
                        console.log("[ONERROR] Utterance was resolved to pause")
                        resolve("pause");
                    }
                    else if (utteranceEndTrigger == "stop") {
                        set({ utterance: null });
                        console.log("[ONERROR] Utterance was resolved to stop")
                        resolve("stop");
                    }
                };
                speechSynthesis.speak(utterance);
            } else {
                console.log('Web Speech API is not supported in this browser.');
                reject(new Error('Web Speech API is not supported.'));
            }
        });
    },
    pauseUtterance: () => {
        localStorage.setItem("utteranceEndTrigger", "pause")
        speechSynthesis.cancel();
        console.log("Paused utterance and set utteranceEndTrigger to pause")
    },
    stopUtterance: () => {
        localStorage.setItem("utteranceEndTrigger", "stop")
        speechSynthesis.cancel();
        console.log("Stopped utterance and set utteranceEndTrigger to stop")
    },
}))


export default function ListenApp() {
    const sentencesArray = useStore((state) => state.sentencesArray)
    const currentSentence = useStore((state) => state.currentSentence)
    const setCurrentSentence = useStore((state) => state.setCurrentSentence)
    const startUtterance = useStore((state) => state.startUtterance)


    useEffect(() => {

    }, [])

    useEffect(() => {
        console.log("Current sentence to read " + currentSentence)

        if (currentSentence == null)
            return
        else if ((currentSentence <= (sentencesArray.length - 1))) {
            startUtterance(sentencesArray[currentSentence]).then((utteranceEndTrigger) => {
                console.log("Utterance ended due to " + utteranceEndTrigger)

                if (utteranceEndTrigger == "pause") {
                    localStorage.setItem("currentSentence", currentSentence)
                    setCurrentSentence(null)
                    console.log("Set current sentence to null")
                    return
                }
                else if (utteranceEndTrigger == "stop") {
                    localStorage.setItem("currentSentence", 0)
                    setCurrentSentence(null)
                    console.log("Set current sentence to null")
                    return
                }
                else if (utteranceEndTrigger == "sentence_complete") {
                    localStorage.setItem("currentSentence", currentSentence + 1)
                    setCurrentSentence(currentSentence + 1)
                }
            })
        }
    }, [currentSentence])

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
