import { useStore } from "@/app/app/page"
import { AnimatePresence, motion } from "framer-motion"
import { isMobile } from "react-device-detect"

export default function Player() {
    const isPlayerOpen = useStore((state) => state.isPlayerOpen)
    const setIsPlayerOpen = useStore((state) => state.setIsPlayerOpen)

    return (
        <AnimatePresence>
            {isPlayerOpen &&
                <motion.div
                    key={isPlayerOpen}
                    // layout={isMobile ? false : true}
                    className={`bg-primary-700 h-full
                                   ${isPlayerOpen ? `absolute top-0 w-full lg:static lg:col-span-1 lg:w-auto` : `hidden lg:col-span-0`}
                               `}
                    onClick={() => setIsPlayerOpen(false)}
                    animate={isMobile && { y: [1000, 0] }}
                    exit={isMobile && { y: [0, 1000] }}
                    transition={isMobile && {
                        duration: 0.5,
                        type: "tween"
                    }}
                >
                    <motion.p layout={isMobile ? false : "position"}>Right</motion.p>
                </motion.div>
            }
        </AnimatePresence>

    )
}