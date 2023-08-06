// import React from 'react'
import { pauseUtterance, useStore } from "@/app/app/page"
import { AnimatePresence, motion } from "framer-motion"
import { isMobile } from "react-device-detect"
import Button from "./Button"
import EqualiserGraphic from "./EqualiserGraphic"
import VoiceSettings from "./VoiceSettings"
import { useEffect, useRef, useState } from "react"



export default function Player() {
    const isPlayerOpen = useStore((state) => state.isPlayerOpen)
    const setIsPlayerOpen = useStore((state) => state.setIsPlayerOpen)
    const currentTab = useStore((state) => state.currentTab)
    const fetchedArticle = useStore((state) => state.fetchedArticle)
    const utterance = useStore((state) => state.utterance)
    const pauseUtterance = useStore((state) => state.pauseUtterance)
    const stopUtterance = useStore((state) => state.stopUtterance)
    const currentSentence = useStore((state) => state.currentSentence)
    const setCurrentSentence = useStore((state) => state.setCurrentSentence)

    const [isDimmed, setIsDimmed] = useState(false)
    const timer = useRef(null)

    useEffect(() => {
        const handleEvent = () => {
            clearTimeout(timer.current)
            setIsDimmed(false)
            timer.current = setTimeout(() => {
                setIsDimmed(true)
            }, 7000);
        }
        document.addEventListener("mousemove", handleEvent, false)
        document.addEventListener("scroll", handleEvent, false)
        document.addEventListener("click", handleEvent, false)
        return () => {
            document.removeEventListener("mousemove", handleEvent)
            document.removeEventListener("scroll", handleEvent)
            document.removeEventListener("click", handleEvent)
        }
    }, [])

    return (
        <>
            <div
                className={`${isDimmed ? `bg-black` : `bg-[#000D0D]`} lg:bg-primary-800/20
                            ${isPlayerOpen
                        ? `absolute bottom-0 h-full w-full z-10 lg:relative lg:w-1/2 lg:h-auto`
                        : `absolute bottom-0 h-0 w-full lg:relative lg:w-0 lg:h-auto`}
                               `}
                style={{ transition: "all 0.5s" }}
            >
                {isPlayerOpen &&
                    <div>
                        <div className={`bg-primary-800/30 px-6 py-3 mb-8 lg:mb-12 ${isDimmed ? `opacity-0 pointer-events-none touch-none` : `opacity-100`}`}>
                            <Button
                                type="tertiary"
                                className="flex gap-2 items-center w-full"
                                onClick={() => {
                                    setIsPlayerOpen(false)
                                    stopUtterance()
                                }}
                            >
                                <span
                                    className="material-icons-round text-xl"
                                >
                                    close
                                </span>
                                <p
                                    className="text-white/70 font-bold text-left whitespace-nowrap overflow-clip text-ellipsis"
                                >
                                    {currentTab == 1 ? fetchedArticle.title : `Pasted article`}
                                </p>
                            </Button>
                        </div>
                        <div className={`px-6 mb-24 ${isDimmed ? `opacity-0 pointer-events-none touch-none` : `opacity-100`}`}>
                            <VoiceSettings />
                        </div>
                        <div className="px-6 flex justify-center mb-24">
                            <EqualiserGraphic height="96" isPlaying />
                        </div>
                        <div className="mx-6 flex justify-center mb-32 max-h-16 overflow-y-auto custom-scrollbar">
                            <p className="text-center">{currentSentence}</p>
                        </div>
                        <div className={` bg-primary-800/20 absolute bottom-0 w-full ${isMobile && `animate__animated animate__fadeInUp`} ${isDimmed && `invisible pointer-events-none touch-none`}`}>
                            <div className="opacity-80 mb-3">
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    className="w-full absolute -top-1 accent-primary-800"
                                />
                            </div>
                            <div className="flex gap-4 justify-center items-center px-6 py-6">
                                <Button
                                    type="tertiary"
                                    className="flex gap-2 items-center"
                                    onClick={() => {
                                        pauseUtterance()
                                        setTimeout(() => {
                                            setCurrentSentence(currentSentence - 1)
                                        }, 100);
                                    }}
                                >
                                    <span
                                        className="material-icons-round text-4xl"
                                    >
                                        fast_rewind
                                    </span>
                                </Button>
                                <Button
                                    type="primary"
                                    className="rounded-full w-min flex p-3"
                                    onClick={() => {
                                        console.log("BUTTON CLICKED")
                                        console.log("Utterance at click " + speechSynthesis.speaking)

                                        if (speechSynthesis.speaking) {
                                            console.log("Requested pause utterance")
                                            pauseUtterance()
                                        }
                                        else {
                                            const savedCurrentSentence = parseInt(localStorage.getItem("currentSentence"))
                                                ? parseInt(localStorage.getItem("currentSentence"))
                                                : 0
                                            console.log("Previously saved sentence " + savedCurrentSentence)

                                            if (localStorage.getItem("utteranceEndTrigger") == "pause") {
                                                console.log("Requested resume utterance")
                                                setCurrentSentence(savedCurrentSentence)
                                            }
                                            else {
                                                console.log("Requested restart utterance")
                                                setCurrentSentence(0)
                                            }
                                        }
                                    }}
                                >
                                    <span
                                        className="material-icons-round text-6xl"
                                    >
                                        {utterance == null ? `play_arrow` : `pause`}
                                    </span>
                                </Button>
                                <Button
                                    type="tertiary"
                                    className="flex gap-2 items-center"
                                    onClick={() => {
                                        pauseUtterance()
                                        setTimeout(() => {
                                            setCurrentSentence(currentSentence + 1)
                                        }, 100);
                                    }}
                                >
                                    <span
                                        className="material-icons-round text-4xl"
                                    >
                                        fast_forward
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                }
            </div >
        </>

    )
}