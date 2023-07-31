'use client';
import { motion } from "framer-motion"

export default function Button({ type, children, onClick }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            className={`px-8 py-3 rounded-full ${type == "primary" ? `bg-primary-800 text-white/80` : `bg-primary-800/20 text-primary-800`}`}
            onClick={(event) => {
                onClick(event.target.value);
            }}
        >
            <p className="font-bold text-lg">{children}</p>
        </motion.button>
    )
}