'use client';
import { useState, useEffect } from 'react'
import Button from "@/components/Button";
import ListeningPhone from "@/components/ListeningPhone";
import ReadingPhone from "@/components/ReadingPhone";
import { isMobile } from 'react-device-detect';

export default function Home() {
  const [isReadingPhoneInView, setIsReadingPhoneInView] = useState(true)

  useEffect(() => {
    if (isMobile) {
      if (isReadingPhoneInView == true)
        setTimeout(() => {
          setIsReadingPhoneInView(!isReadingPhoneInView)
        }, 6000);
      else
        setTimeout(() => {
          setIsReadingPhoneInView(!isReadingPhoneInView)
        }, 4000)
    }
  }, [isReadingPhoneInView])

  return (
    <div
      className="min-h-screen bg-black bg-[length:172px_172px] flex"
      style={{ backgroundImage: "url(/bg-pattern.svg) " }}>
      <div className="hidden xl:visible max-w-[1280px] mx-auto xl:flex gap-32 items-center justify-center p-6 text-center">
        <div>
          <ReadingPhone viewport="desktop" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-primary-800 text-4xl mb-4">Skip long form reading</h2>
          <h2 className="font-bold text-primary-800 text-6xl mb-12">START LISTENING!</h2>
          <Button type="primary">Let's go!</Button>
        </div>
        <div>
          <ListeningPhone />
        </div>
      </div>
      <div className="xl:hidden mx-auto p-6 text-center flex flex-col items-center">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-primary-800 text-2xl md:text-3xl mb-4">Skip long form reading</h2>
          <h2 className="font-bold text-primary-800 text-3xl md:text-5xl mb-12">START LISTENING!</h2>
          <Button type="primary">Let's go!</Button>
        </div>
        <div>
          {isReadingPhoneInView ?
            <div className="animate__animated animate__fadeIn" key={isReadingPhoneInView}>
              <ReadingPhone viewport="mobile" />
            </div> :
            <div className="animate__animated animate__fadeIn" key={isReadingPhoneInView}>
              <ListeningPhone />
            </div>
          }
        </div>
      </div>
    </div>
  )
}
