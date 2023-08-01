import { useStore } from "@/app/app/page"
import { AnimatePresence, motion } from "framer-motion"
import { isMobile } from "react-device-detect"

export default function Player() {
    const isPlayerOpen = useStore((state) => state.isPlayerOpen)
    const setIsPlayerOpen = useStore((state) => state.setIsPlayerOpen)

    return (
        <AnimatePresence>
            <div
                className={`bg-primary-700
                            ${isPlayerOpen
                        ? `absolute bottom-0 h-screen w-full z-10 lg:static lg:w-1/2 lg:h-auto`
                        : `absolute bottom-0 h-0 w-full lg:static lg:w-0 lg:h-auto`}
                               `}
                style={{ transition: "all 0.5s" }}
                onClick={() => setIsPlayerOpen(false)}
            >
                <motion.p layout={isMobile ? false : "position"}>Right</motion.p>
            </div>
        </AnimatePresence>

    )
}