'use client';
import { motion } from "framer-motion"

export default function Button({ type, children, className, onClick }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            className={`rounded-full ${className} ${type == "primary" ? `bg-primary-800 text-white/80` : `bg-primary-800/20 text-primary-800`}`}
            onClick={(event) => {
                onClick(event.target.value);
            }}
        >
            <span>{children}</span>
        </motion.button>
    )
}