// import React from 'react'
import { useStore } from "@/app/app/page"
import { isMobile } from "react-device-detect"
import Button from "./Button"
import EqualiserGraphic from "./EqualiserGraphic"
import VoiceSettings from "./VoiceSettings"
import { useEffect, useRef, useState } from "react"
import { env } from "@/next.config"

let appInstallPrompt;

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
    const sentencesArray = useStore((state) => state.sentencesArray)


    const [isDimmed, setIsDimmed] = useState(false)
    const timer = useRef(null)
    const inputRangeValue = useRef(null)
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        setPercentage(Math.round((currentSentence / sentencesArray.length) * 100))
    }, [currentSentence])

    useEffect(() => {
        const handleEvent = () => {
            clearTimeout(timer.current)
            setIsDimmed(false)
            timer.current = setTimeout(() => {
                setIsDimmed(true)
            }, 7000);
        }
        document.addEventListener("mousemove", handleEvent, false)
        document.addEventListener("wheel", handleEvent, false)
        document.addEventListener("click", handleEvent, false)
        document.addEventListener("touchmove", handleEvent, false)
        return () => {
            document.removeEventListener("mousemove", handleEvent)
            document.removeEventListener("wheel", handleEvent)
            document.removeEventListener("click", handleEvent)
            document.addEventListener("touchmove", handleEvent, false)
        }
    }, [])

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            console.log("Registered beoreinstallprompt " + appInstallPrompt)
            appInstallPrompt = e;
        })
    }, [])

    function ShowAppInstallPrompt() {
        if (appInstallPrompt)
            appInstallPrompt.prompt()
        else
            alert(`To install this app, find and click the "Add to home screen" or "Install app" option in your browser`)
    }

    // function HandleKeyPresses(e) {
    //     if (e.keyCode == 32) {
    //         HandlePlayPauseButtonClick()
    //     }
    //     else if (e.key == "ArrowRight") {
    //         pauseUtterance()
    //         setTimeout(() => {
    //             setCurrentSentence(currentSentence + 1)
    //         }, 100);
    //     }
    //     else if (e.key == "ArrowLeft") {
    //         pauseUtterance()
    //         setTimeout(() => {
    //             setCurrentSentence(currentSentence - 1)
    //         }, 100);
    //     }
    // }

    // useEffect(() => {
    //     document.addEventListener("keydown", function (e) {
    //         HandleKeyPresses(e)
    //     })
    //     return () => {
    //         document.removeEventListener("keydown", HandleKeyPresses)
    //     }
    // }, [])

    function HandlePlayPauseButtonClick() {
        console.log("BUTTON CLICKED")
        console.log("Utterance at click " + speechSynthesis.speaking)

        if (speechSynthesis.speaking) {
            console.log("Requested pause utterance")
            pauseUtterance()
        }
        else {
            if (sentencesArray.length > 0) {
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
        }
    }

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
                    <div className="h-full flex flex-col">
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
                        <div className={`px-6 ${isDimmed ? `opacity-0 pointer-events-none touch-none` : `opacity-100`}`}>
                            <VoiceSettings />
                        </div>
                        <div className="flex-grow min-h-0 flex flex-col gap-8 justify-center pb-16">
                            <div className="px-6 flex flex-col items-center justify-center">
                                <InvisibleVideo />
                                <EqualiserGraphic height="96" isPlaying={utterance ? true : false} />
                                <p
                                    className={`mt-8 block text-primary-800 ${percentage > 0 ? `visible` : `invisible`}`}
                                >
                                    {percentage}%
                                </p>
                            </div>
                            <div className="mx-6 mb-16 h-[10vh] overflow-y-auto custom-scrollbar">
                                <p
                                    key={currentSentence}
                                    className="text-center animate__animated animate__fadeIn"
                                >
                                    {sentencesArray[currentSentence]}
                                </p>
                            </div>
                        </div>
                        <div className={` bg-primary-800/20 absolute bottom-0 w-full ${isMobile && `animate__animated animate__fadeInUp`} ${isDimmed && `invisible pointer-events-none touch-none`}`}>
                            <div className="opacity-80 mb-3">
                                <input
                                    ref={inputRangeValue}
                                    type="range"
                                    min={0}
                                    max={sentencesArray.length}
                                    step={1}
                                    value={currentSentence}
                                    className="w-full absolute -top-1 accent-primary-800"
                                    onClick={() => {
                                        console.log("Click event with input range value " + inputRangeValue.current.value)
                                    }}
                                    onChange={(e) => {
                                        const skipToSentence = parseInt(e.target.value);
                                        console.log("Received event to skip to " + skipToSentence)
                                        pauseUtterance()
                                        setTimeout(() => {
                                            setCurrentSentence(skipToSentence)
                                        }, 100);
                                    }}
                                    disabled={currentSentence == null}
                                />
                            </div>
                            <div className="flex gap-4 justify-center items-center px-6 py-6 relative">
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
                                        HandlePlayPauseButtonClick()
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
                                <Button
                                    className="absolute right-1 top-1/3 lg:hidden animate__animated animate__slideInRight animate__delay-2s"
                                    onClick={ShowAppInstallPrompt}
                                >
                                    <span
                                        className="material-icons-round text-4xl"
                                    >
                                        install_mobile
                                    </span>
                                </Button>
                                <Button
                                    className="absolute right-1 top-1/3 hidden lg:block animate__animated animate__slideInRight animate__delay-2s"
                                    onClick={ShowAppInstallPrompt}
                                >
                                    <span
                                        className="material-icons-round text-4xl"
                                    >
                                        install_desktop
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


function InvisibleVideo() {
    const utterance = useStore((state) => state.utterance)
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.volume = isMobile ? 0.01 : 0.1;
        if (utterance == null)
            videoRef.current.pause()
        else
            videoRef.current.play()
    }, [utterance])

    return (
        <video ref={videoRef} loop className="-z-50 h-2 w-2 opacity-0">
            <source src={`${env.LINK_PREFIX}/the-beat-of-nature-122841.mp4`} type="video/mp4" />
            Your browser does not support video playback.
        </video>
    )
}