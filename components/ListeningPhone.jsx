'use client';
import { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect';

import Phone from './Phone';
import EqualiserGraphic from "./EqualiserGraphic";

export default function ListeningPhone() {
    // useEffect(() => {
    //     ScrollHelper()
    //     const interval = setInterval(() => {
    //         ScrollHelper()
    //     }, 6000);

    //     return () => clearInterval(interval);
    // }, [])

    return (
        <div>
            <Phone
                classNameForPhoneContainer="mx-auto"
                classNameForPhoneContents="flex justify-center items-center"
            >
                <EqualiserGraphic height="80" className="" />
            </Phone>
            <div className={`mt-8 text-center animate__animated ${isMobile ? `animate__bounceIn` : `animate__bounceInRight`}`}>
                <p className="text-3xl font-bold">LISTEN</p>
                <p className="text-2xl text-green-500">Low screen time 😍</p>
            </div>
        </div>
    )
}


function ScrollHelper() {
    setTimeout(() => {
        document.querySelector(".pack-two").scrollIntoView({ behavior: "smooth" })
    }, 2000);
    setTimeout(() => {
        document.querySelector(".pack-three").scrollIntoView({ behavior: "smooth" })
    }, 4000);
    setTimeout(() => {
        document.querySelector(".pack-container").scrollTop = 0;
    }, 6000);
}