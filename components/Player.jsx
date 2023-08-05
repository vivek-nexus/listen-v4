// import React from 'react'
import { useStore } from "@/app/app/page"
import { AnimatePresence, motion } from "framer-motion"
import { isMobile } from "react-device-detect"
import Button from "./Button"
import EqualiserGraphic from "./EqualiserGraphic"
import VoiceSettings from "./VoiceSettings"
import { useEffect, useRef, useState } from "react"



export default function Player() {
    const isPlayerOpen = useStore((state) => state.isPlayerOpen)
    const setIsPlayerOpen = useStore((state) => state.setIsPlayerOpen)
    const article = useStore((state) => state.article)

    const [isDimmed, setIsDimmed] = useState(false)
    const timer = useRef(null)

    useEffect(() => {
        const handleMouseMove = () => {
            clearTimeout(timer.current)
            setIsDimmed(false)
            timer.current = setTimeout(() => {
                setIsDimmed(true)
            }, 7000);
        }
        document.addEventListener("mousemove", handleMouseMove, false)
        document.addEventListener("scroll", handleMouseMove, false)
        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("scroll", handleMouseMove)
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
                        <div className={`bg-primary-800/30 px-6 py-3 mb-8 lg:mb-12 ${isDimmed ? `opacity-0` : `opacity-100`}`}>
                            <Button
                                type="tertiary"
                                className="flex gap-2 items-center w-full"
                                onClick={() => { setIsPlayerOpen(false) }}
                            >
                                <span
                                    className="material-icons-round text-xl"
                                >
                                    close
                                </span>
                                <p
                                    className="text-white/70 font-bold text-left whitespace-nowrap overflow-clip text-ellipsis"
                                >
                                    {article.title}
                                </p>
                            </Button>
                        </div>
                        <div className={`px-6 mb-24 ${isDimmed ? `opacity-0` : `opacity-100`}`}>
                            <VoiceSettings />
                        </div>
                        <div className="px-6 flex justify-center mb-24">
                            <EqualiserGraphic height="96" isPlaying />
                        </div>
                        <div className="mx-6 flex justify-center mb-32 max-h-16 overflow-y-auto custom-scrollbar">
                            <p className="text-center">Toxicity can be an unfortunate reality of some work environments.</p>
                        </div>
                        <div className={` bg-primary-800/20 absolute bottom-0 w-full ${isMobile && `animate__animated animate__fadeInUp`} ${isDimmed && `invisible`}`}>
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
                                    onClick={() => { }}
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
                                    onClick={() => { setIsPlayerOpen(true) }}
                                >
                                    <span
                                        className="material-icons-round text-6xl"
                                    >
                                        pause
                                    </span>
                                </Button>
                                <Button
                                    type="tertiary"
                                    className="flex gap-2 items-center"
                                    onClick={() => { }}
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
            </div>
        </>

    )
}