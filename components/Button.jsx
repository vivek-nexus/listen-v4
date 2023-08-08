'use client';
import { motion } from "framer-motion"

export default function Button({ type, children, className, onClick, showHoverAnimation, isDisabled, disabledTitle }) {
    return (
        <motion.button
            whileHover={showHoverAnimation && { scale: 1.05 }}
            className={`rounded-full duration-500 ${className} ${ButtonTypeHelper(type)} ${isDisabled && `opacity-50 cursor-not-allowed`}`}
            title={isDisabled ? disabledTitle : ``}
            onClick={(event) => {
                { !isDisabled && onClick(event.target.value); }
            }}
        >
            {children}
        </motion.button>
    )
}

function ButtonTypeHelper(type) {
    switch (type) {
        case "primary":
            return `bg-primary-800 text-white/70`
        case "secondary":
            return `bg-primary-800/30 text-primary-800`
        default:
            return `bg-transparent text-primary-800`
    }
}