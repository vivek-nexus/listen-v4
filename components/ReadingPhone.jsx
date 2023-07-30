'use client';
import { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect';
import Phone from './Phone';

export default function ReadingPhone({ viewport }) {
    useEffect(() => {
        ScrollHelper(viewport)
        const interval = setInterval(() => {
            ScrollHelper(viewport)
        }, 6000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div>
            <Phone classNameForPhoneContainer="mx-auto" viewport={viewport}>
                <div className="mb-8 pack-one" id={`pack-one-${viewport}`}>
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                </div>

                <div className="mb-8 pack-two" id={`pack-two-${viewport}`}>
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                </div>

                <div className="pack-three" id={`pack-three-${viewport}`}>
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                    <ContentRow />
                </div>
            </Phone>
            <div className={`mt-8 text-center animate__animated ${isMobile ? `animate__bounceIn` : `animate__bounceInLeft`}`}>
                <p className="text-3xl font-bold">READ</p>
                <p className="text-2xl text-red-500">High screen time 😵‍💫</p>
            </div>
        </div>
    )
}

function ContentRow({ className }) {
    return (
        <div className={`h-3 bg-gray-600 rounded-lg my-3 ${className}`}></div>
    )
}

function ScrollHelper(viewport) {
    const packOne = document.querySelector(`#pack-two-${viewport}`)
    const packTwo = document.querySelector(`#pack-three-${viewport}`)
    const packContainer = document.querySelector(`#pack-container-${viewport}`)
    setTimeout(() => {
        packContainer.scrollTop = 256;
    }, 2000);
    setTimeout(() => {
        packContainer.scrollTop = 678;
    }, 4000);
    setTimeout(() => {
        if (packContainer)
            packContainer.scrollTop = 0;
    }, 6000);
}