'use client';
import Phone from './Phone';
import EqualiserGraphic from "./EqualiserGraphic";

export default function ListeningPhone() {

    return (
        <div>
            <Phone
                classNameForPhoneContainer="mx-auto"
                classNameForPhoneContents="flex justify-center items-center"
            >
                <EqualiserGraphic height="80" isPlaying={true} />
            </Phone>
            <div className="xl:hidden">
                <AboutPhone viewport="mobile" />
            </div>
            <div className="hidden xl:block">
                <AboutPhone viewport="desktop" />
            </div>
        </div >
    )
}

function AboutPhone({ viewport }) {
    return (
        <div className={`mt-8 text-center animate__animated ${viewport == "mobile" ? `animate__bounceIn` : `animate__bounceInRight`}`}>
            <p className="text-3xl font-semibold">LISTEN</p>
            <p className="text-2xl text-green-500">Low screen time 😍</p>
        </div>
    )
}