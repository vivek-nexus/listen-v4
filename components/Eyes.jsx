import { useEffect, useState } from "react"

export default function Eyes({ whichEye }) {

    useEffect(() => {
        document.addEventListener("mousemove", (event) => {
            const eyeBall = document.querySelector(`#${whichEye}`)
            if (eyeBall) {
                const x = event.pageX - eyeBall.getBoundingClientRect().left
                const y = event.pageY - eyeBall.getBoundingClientRect().top
                const tx = (x * 24) / (window.innerWidth)
                const ty = (y * 64) / (window.innerHeight)
                eyeBall.style.transform = `translate(${tx}px, ${ty}px)`
            }

        })
    }, [])

    return (
        <>
            <div className="flex gap-2">
                <div className={`relative bg-white/60 h-24 w-12 rounded-[50%] `}
                >
                    <div
                        className="absolute w-4 h-4 top-0 bottom-0 my-auto left-0 right-0 mx-auto bg-black/50 rounded-full"
                        id={whichEye}
                    >

                    </div>
                </div>
            </div>
        </>
    )
}