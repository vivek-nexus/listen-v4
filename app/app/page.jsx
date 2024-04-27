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
import { env } from "@/next.config";
import { useStoreAtRoot } from "../page";
import UAParser from 'ua-parser-js';

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
    allVoices: [],
    voices: [],
    setVoices: () => {
        const speechSynthesisObject = window.speechSynthesis;
        const allVoices = speechSynthesisObject.getVoices();
        let googleVoices = [];
        let nonGoogleVoices = [];

        if (allVoices.length > 0) {
            allVoices.map((voice) => {
                if (voice.name.includes("Google")) {
                    googleVoices.push({
                        label: `${voice.name}, ${voice.lang}`,
                        value: voice
                    })
                }
                else {
                    nonGoogleVoices.push({
                        label: `${voice.name}, ${voice.lang}`,
                        value: voice
                    })
                }
            })
        }
        set({
            allVoices: allVoices,
            voices: [
                { label: "Natural google voices", options: googleVoices },
                { label: "Device voices", options: nonGoogleVoices },
            ]
        })
    },
    selectedVoice: null,
    setSelectedVoice: (selectedVoice) => {
        localStorage.setItem("selectedVoice", selectedVoice.voiceURI)
        set(() => ({ selectedVoice: selectedVoice }))
    },
    rate: 1,
    setRate: (rate) => {
        localStorage.setItem("rate", rate)
        set(() => ({ rate: rate }))
    },
    pitch: 1,
    setPitch: (pitch) => {
        localStorage.setItem("pitch", pitch)
        set(() => ({ pitch: pitch }))
    },
    startUtterance: (text) => {
        return new Promise((resolve, reject) => {
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.voice = useStore.getState().selectedVoice;
                utterance.rate = useStore.getState().rate;
                utterance.pitch = useStore.getState().rate;

                sessionStorage.removeItem("utteranceEndTrigger")
                set({ utterance: utterance });

                utterance.onend = () => {
                    const utteranceEndTrigger = sessionStorage.getItem("utteranceEndTrigger")
                    console.log("[ONEND] Utterance will end due to " + utteranceEndTrigger)

                    if (utteranceEndTrigger == "pause") {
                        set({ utterance: null });
                        console.log("[ONEND] Utterance was resolved to pause")
                        resolve("pause");
                    }
                    else if (utteranceEndTrigger == "stop") {
                        set({ utterance: null });
                        console.log("[ONEND] Utterance was resolved to stop")
                        resolve("stop");
                    }
                    else {
                        sessionStorage.setItem("utteranceEndTrigger", "sentence_complete")
                        set({ utterance: null });
                        console.log("[ONEND] Utterance was resolved to sentence_complete")
                        resolve("sentence_complete");
                    }
                };

                utterance.onerror = (event) => {
                    console.log("Error is " + event.error)
                    const utteranceEndTrigger = sessionStorage.getItem("utteranceEndTrigger")
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
                    else {
                        sessionStorage.setItem("utteranceEndTrigger", "sentence_complete")
                        set({ utterance: null });
                        console.log("[ONERROR] Utterance was resolved to sentence_complete")
                        resolve("sentence_complete");
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
        sessionStorage.setItem("utteranceEndTrigger", "pause")
        speechSynthesis.cancel();
        console.log("Paused utterance and set utteranceEndTrigger to pause")
    },
    stopUtterance: () => {
        sessionStorage.setItem("utteranceEndTrigger", "stop")
        speechSynthesis.cancel();
        console.log("Stopped utterance and set utteranceEndTrigger to stop")
    },
}))


export default function ListenApp() {
    const appInstallPrompt = useStoreAtRoot((state) => state.appInstallPrompt)
    const setAppInstallPrompt = useStoreAtRoot((state) => state.setAppInstallPrompt)

    const sentencesArray = useStore((state) => state.sentencesArray)
    const currentSentence = useStore((state) => state.currentSentence)
    const setCurrentSentence = useStore((state) => state.setCurrentSentence)
    const startUtterance = useStore((state) => state.startUtterance)
    const pauseUtterance = useStore((state) => state.pauseUtterance)
    const setVoices = useStore((state) => state.setVoices)
    const setSelectedVoice = useStore((state) => state.setSelectedVoice)
    const allVoices = useStore((state) => state.allVoices)
    const setRate = useStore((state) => state.setRate)
    const setPitch = useStore((state) => state.setPitch)

    // useEffect(() => {
    //     setTimeout(() => {
    //         Logger()
    //     }, 5000);
    // }, [])

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            console.log("Registered beoreinstallprompt " + appInstallPrompt)
            setAppInstallPrompt(e)
        })
    }, [])


    useEffect(() => {
        setVoices()
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = setVoices;
        }

        if (isMobile) {
            window.addEventListener("blur", pauseUtterance)
        }
    }, [])

    useEffect(() => {
        const savedVoice = localStorage.getItem("selectedVoice")
        const savedRate = localStorage.getItem("rate")
        const savedPitch = localStorage.getItem("pitch")
        if (savedVoice) {
            allVoices.map((voice) => {
                if (voice.voiceURI == savedVoice) {
                    console.log("Saved voice is " + voice.voiceURI)
                    setSelectedVoice(voice)
                }
            })
        }
        if (savedRate)
            setRate(savedRate)
        if (savedPitch)
            setPitch(savedPitch)
    }, [allVoices])

    useEffect(() => {
        console.log("Current sentence to read " + currentSentence)

        if (currentSentence == null)
            return
        else if ((currentSentence <= (sentencesArray.length - 1))) {
            startUtterance(sentencesArray[currentSentence]).then((utteranceEndTrigger) => {
                console.log("Utterance ended due to " + utteranceEndTrigger)

                if (utteranceEndTrigger == "pause") {
                    sessionStorage.setItem("currentSentence", currentSentence)
                    setCurrentSentence(null)
                    console.log("Set current sentence to null")
                    return
                }
                else if (utteranceEndTrigger == "stop") {
                    sessionStorage.setItem("currentSentence", 0)
                    setCurrentSentence(null)
                    console.log("Set current sentence to null")
                    return
                }
                else if (utteranceEndTrigger == "sentence_complete") {
                    sessionStorage.setItem("currentSentence", currentSentence + 1)
                    setCurrentSentence(currentSentence + 1)
                }
            })
        }
    }, [currentSentence])

    return (
        <>
            <div
                className="bg-black bg-[length:172px_172px] lg:flex lg:flex-col lg:items-center lg:justify-center"
                style={{ backgroundImage: `url(${env.LINK_PREFIX}/bg-pattern.svg)`, minHeight: "100dvh" }}
            >
                <div
                    className={`flex flex-col bg-black lg:rounded-2xl lg:w-[70vw] xl:w-[50vw] lg:h-[80vh] lg:flex-row lg:overflow-clip`}
                    style={{ boxShadow: `0px 8px 64px 4px ${colours["primary-800/40"]}`, height: "100dvh" }}
                >
                    <ArticleForm />
                    <Player />
                </div>
            </div >
        </>
    )
}


function Logger() {
    const speechSynthesisObject = window.speechSynthesis
    const voices = speechSynthesisObject.getVoices()
    console.log(voices)
    let parser = new UAParser()
    let parserResults = parser.getResult()
    const log = {}
    const voiceKey = []
    log["speechSynthesisSupported"] = window.speechSynthesis ? `true` : `false`
    log["browser"] = `${parserResults.browser.name} | ${parserResults.browser.version}`
    log["os"] = `${parserResults.os.name} | ${parserResults.os.version}`
    for (const voice of voices)
        voiceKey.push(`${voice.name} | ${voice.lang} | default-${voice.default} | localService-${voice.localService}`)
    log["voices"] = JSON.stringify(voiceKey)
    console.log(log)
    fetch("https://logs-01.loggly.com/inputs/7c563a11-8fcd-438a-8abe-44cf54fb300e/tag/http/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(log)
    })
}
