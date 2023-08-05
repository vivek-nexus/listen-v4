import { useEffect, useState } from "react"

export default function Eye({ whichEye, isLoading }) {
    const [isClosed, setIsClosed] = useState(false)
    const [angle, setAngle] = useState(0)

    //follow mouse when not loading
    useEffect(() => {
        const handleMouseMove = (event) => { FollowEyeBall(event, whichEye) }
        if (!isLoading) {
            document.addEventListener("mousemove", handleMouseMove, false)
        }
        return () => document.removeEventListener("mousemove", handleMouseMove)
    }, [isLoading])

    // spin when loading
    useEffect(() => {
        const eyeBall = document.querySelector(`#${whichEye}`)
        if (eyeBall && isLoading) {
            setTimeout(() => {
                console.log(angle)
                const translateX = (Math.cos(angle * (Math.PI / 180)) * 0.5 * 24)
                const translateY = (Math.sin(angle * (Math.PI / 180)) * 0.5 * 64)
                eyeBall.style.transform = `translate(${translateX}px, ${translateY}px)`
                setAngle(angle + 10)
            }, 20);
        }
    }, [angle, isLoading])

    // blink eye
    useEffect(() => {
        if (isClosed) {
            setTimeout(() => {
                setIsClosed(false)
            }, 400);
        }
        else {
            setTimeout(() => {
                setIsClosed(true)
            }, 2500);
        }
    }, [isClosed])

    return (
        <>
            <div className="">
                <div
                    className={`relative bg-white/60 w-12 h-24 rounded-[50%] overflow-clip`}
                    style={{ boxShadow: "inset 0px 0px 16px 0px rgba(0,0,0,0.7)" }}
                >
                    <div
                        className={`absolute top-0 w-full bg-[#808080] z-10 ${isClosed ? `h-2/3` : `h-0`}`}
                        style={{ transition: "all 0.3s" }}
                    >
                    </div>
                    <div
                        className={`absolute bottom-0 w-full bg-[#808080] z-10 ${isClosed ? `h-2/3` : `h-0`}`}
                        style={{ transition: "all 0.3s" }}
                    >
                    </div>
                    <div
                        className={`absolute w-8 h-8 top-0 bottom-0 my-auto left-0 right-0 mx-auto bg-black/90 rounded-full`}
                        id={whichEye}
                    >
                        <div className="w-2 h-2 bg-white/60 rounded-full ml-2 mt-2"></div>
                    </div>
                </div>
            </div>
        </>
    )
}


function FollowEyeBall(event, whichEye) {
    const eyeBall = document.querySelector(`#${whichEye}`)
    if (eyeBall) {
        const x = event.pageX - eyeBall.getBoundingClientRect().left
        const y = event.pageY - eyeBall.getBoundingClientRect().top
        const translateX = (x * 24) / (window.innerWidth)
        const translateY = (y * 64) / (window.innerHeight)
        eyeBall.style.transform = `translate(${translateX}px, ${translateY}px)`
    }
}