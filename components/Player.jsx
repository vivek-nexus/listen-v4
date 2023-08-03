// import React from 'react'
import { useStore } from "@/app/app/page"
import { AnimatePresence, motion } from "framer-motion"
import { isMobile } from "react-device-detect"
import Button from "./Button"
import EqualiserGraphic from "./EqualiserGraphic"
import VoicesDropdown from "./VoicesDropdown"



export default function Player() {
    const isPlayerOpen = useStore((state) => state.isPlayerOpen)
    const setIsPlayerOpen = useStore((state) => state.setIsPlayerOpen)



    return (
        <div
            className={`bg-black lg:bg-primary-800/20
                            ${isPlayerOpen
                    ? `absolute bottom-0 h-full w-full z-10 lg:relative lg:w-1/2 lg:h-auto`
                    : `absolute bottom-0 h-0 w-full lg:relative lg:w-0 lg:h-auto`}
                               `}
            style={{ transition: "all 0.5s" }}
        >
            {isPlayerOpen &&
                <div>
                    <div className="bg-primary-800/30 px-6 py-3 mb-8 lg:mb-12">
                        <Button
                            type="tertiary"
                            className="flex gap-2 items-center"
                            onClick={() => { setIsPlayerOpen(false) }}
                        >
                            <span
                                className="material-icons-round text-xl"
                            >
                                close
                            </span>
                            <p className="text-white/70 font-bold">

                                Why Hybrid Work Can Become Toxic
                            </p>
                        </Button>
                    </div>
                    <div className="px-6 mb-24 ">
                        <div className="flex gap-4 items-center mb-3 lg:mb-0">
                            <div
                                className="flex-grow"
                            >
                                <VoicesDropdown />
                            </div>
                            <Button
                                type="tertiary"
                                className="rounded-full w-min flex"
                                onClick={() => { setIsPlayerOpen(true) }}
                            >
                                <span
                                    className="material-icons-round text-4xl"
                                >
                                    tune
                                </span>
                            </Button>
                        </div>
                        <p className="lg:hidden text-primary-800 text-center text-sm">On mobile devices, change voice in your device text to speech settings</p>
                    </div>
                    <div className="px-6 flex justify-center mb-24">
                        <EqualiserGraphic height="96" playState="playing" />
                    </div>
                    <div className="mx-6 flex justify-center mb-32 max-h-16 overflow-y-auto custom-scrollbar">
                        <p className="text-center">Toxicity can be an unfortunate reality of some work environments.</p>
                    </div>
                    <div className={`px-6 py-6 bg-primary-800/20 absolute bottom-0 flex gap-4 justify-center items-center w-full ${isMobile && `animate__animated animate__fadeInUp`}`}>
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
            }
        </div>

    )
}