import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { isMobile } from "react-device-detect"
import Button from "./Button"
import InputField from "./InputField"
import { useStore } from "@/app/app/page"
import Image from "./Image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Eye from "./Eye"
import { Readability } from "@mozilla/readability"


export const title = `A smart way to handle anxiety — courtesy of soccer great Lionel Messi`
export const text = `What separates the very best in the world from the remaining 7 billion of us?

Exceptional talent often looks like an act of revolution — a person doing something in a way no one has ever done it before — but many revolutionary talents are actually built on a foundation of evolutionary tweaks. These tweaks develop over time, often compensating for weaknesses and anxieties that might derail a lesser talent.

    For all his brilliance, though, Messi is famously anxious. For several years, he habitually vomited on the field before big matches.

Take the world’s best soccer player, an Argentinean named Lionel Messi. Messi has won more Ballon d’Or trophies, awarded to the best soccer player of the year, than any other player. He has scored more goals in a calendar year than any other living player, is the top all-time scorer in Spain’s La Liga, and has the highest goal ratio in the sport today, scoring almost once every match.

For all his brilliance, though, he’s famously anxious. For several years, Messi habitually vomited on the field before big matches. After a string of disappointing national-team losses, another former Argentinean giant of the game, the late Diego Maradona, uncharitably criticized Messi by suggesting that it was “useless trying to make a leader out of a man who goes to the toilet twenty times before a game.”

Being incredibly talented doesn’t immunize you against anxiety, and many of the world’s best grapple with anxiety precisely because they expect so much from themselves. But Messi hasn’t allowed his anxiety to diminish his brilliance because he’s mastered a coping mechanism that also doubles as the secret behind his tactical brilliance.

    Messi does two things during these first few minutes. First, he calms himself. Second, he scopes out the opposition.

A soccer match runs for 90 minutes (plus a few minutes for “injury time”), and most players are active in the game from the first minute. As soon as the whistle blows, they implore their teammates to pass the ball and pursue the tactics their coaches laid out before the game.

But Messi is famous for not playing the game during its opening minutes. This is his evolutionary tweak, which developed as he played the game at progressively higher levels. For the opening minutes, Messi ambles back and forth near the middle of the field and almost never engages with his teammates. Whereas other players run and sometimes sprint, Messi spends much of his time walking, rarely breaking into more than a slow jog.

Messi does two things during these first few minutes. First, he calms himself. Easing into the game is Messi’s way of ensuring he’s fully engaged for the remainder of the game. His on-field vomiting has resolved itself, in part perhaps because he’s found a more effective way to calm his nerves. Second, he spends this time scoping out the opposition. His legs move slowly, but his eyes dart from player to player, assessing his opponents’ strengths, weaknesses, and tactics, and monitoring his own team’s movement with and around the ball. Messi is less valuable to his team early in the game, but this tactical pause elevates his value for the remaining 95 percent of the game.

If you split soccer game play into “preparatory” and “engaged” components, Messi leans heavily on preparation. During one classic game between Messi’s Barcelona and archrivals Real Madrid, in 2017, Messi ran for just four minutes and walked for more than eighty of the game’s ninety minutes. When he was engaged, though, he was dynamic, creating nine chances, scoring one goal, and feeding the ball to a teammate who scored another goal.

    As you might imagine, pausing is harder than it sounds. In the face of silence and anxiety, our instinct is to act.

That pattern isn’t unusual for Messi, and it’s often in the biggest games that he accentuates his in-game preparation. That preparation also explains his ability to find himself in the right place at the right time, over and over. Though his positional play appears otherworldly, it isn’t a miracle; it’s that he’s learned, minute by minute, that a particular defender leaves a particular square of pitch uncovered or that two midfielders leave a small corner of the pitch open when they gravitate to the middle of the field.

The lesson for the rest of us is clear: When you’re anxious, whether in athletics or in life more broadly, pause. Slow down. Prepare.

As you might imagine, pausing is harder than it sounds. In the face of silence and anxiety, our instinct is to act. Judson Brewer, a psychiatrist and neuroscientist, has spent much of his career thinking about how to do nothing.

About fifteen years ago, Brewer developed a mindfulness-based treatment for addiction.

His approach instructs addicts to resist the waves of anxiety during moments of craving by following the four steps of an approach that goes by the acronym RAIN:
Recognize what is arising.
Allow it to be there.
Investigate your emotions and thoughts (e.g., “What is happening in my body now?”)
Note what is happening from moment to moment.

Brewer has said that his approach was inspired by clinical psychologist Tara Brach’s. To test the approach, Brewer worked with smokers who were struggling to quit. Nicotine addiction is notoriously stubborn — more so than many harder drugs that produce stronger immediate responses in users.

Before unleashing the program on smokers, Brewer wanted to test the system on himself. The problem was “I was a nonsmoker,” Brewer wrote, “who needed to be able to relate to patients who felt as though their heads were going to explode unless they smoked.”

Nicotine has a half-life of around two hours, so to begin, smokers need to resist the urge to light up for two hours at a time. Brewer reasoned that smokers who could last two hours without a cigarette would cultivate new nonsmoking habits, extending those stretches till they no longer felt the urge to smoke at all.

He simulated these periods of resistance by learning to meditate for two-hour stretches without moving. During moments of restlessness, he followed the RAIN steps — recognize, allow, investigate, note — and if he moved his body, the clock would reset, and he’d have to start again.

This might sound easy, but two hours is a long time to sit still without entertainment. “Surprisingly it wasn’t the physical pain of not shifting for a long time that got me,” Brewer wrote. “It was the restlessness … Those cravings shouted, ‘Get up!’ ”

    Months later, when most of the patients on other treatment plans had relapsed, his mindfulness group stayed clean.

For many months, Brewer would get close, then restlessness would defeat him. “Then one day,” he wrote, “I did it. I sat for the full two hours … Each subsequent sit got easier and easier because I had the confidence that it could be done. And I knew that my patients could quit smoking. They simply needed the proper tools.”

Brewer was right. His patients had been stuck, incapable of quitting one of the most addictive substances on earth. But when he ran study after study, pitting his RAIN mindfulness method against the most effective addiction treatment approaches of the day, his approach was more than twice as effective.

Months later, when most of the patients on other treatment plans had relapsed, his mindfulness group stayed clean. They were more than five times as likely to have shaken their addictions using an approach that essentially taught them to pause at the moment their bodies were most urgently driving them to act.

Of the four steps in Brewer’s RAIN approach, the second — allowing — is perhaps the most critical. Allowing an experience to wash over you sounds disarmingly easy because it doesn’t require you to do anything. But that’s exactly the point. It’s difficult because you’re forced to do nothing despite the urge to act.

For all the benefits of pausing and preparing, though, sometimes the main event doesn’t go to plan. Messi has lost countless matches, and not all of Brewer’s nicotine addicts stayed quit weeks or months after his experiments ended. Mastering the anxiety and discomfort that follow these failures is essential, and it’s one of the major differences between people who achieve breakthroughs and those who stay mired indefinitely.

Excerpted from the new book Anatomy of a Breakthrough: How to Get Unstuck When It Matters Most by Adam Alter. Copyright © 2023 by Adam Alter. Reprinted by permission of Simon & Schuster Inc.

Watch his TED Talk now:`

export default function ArticleForm({ }) {
    const currentTab = useStore((state) => state.currentTab)
    const setCurrentTab = useStore((state) => state.setCurrentTab)
    const isPlayerOpen = useStore((state) => state.isPlayerOpen)
    const setIsPlayerOpen = useStore((state) => state.setIsPlayerOpen)
    const linkToArticle = useStore((state) => state.linkToArticle)
    const setLinkToArticle = useStore((state) => state.setLinkToArticle)
    const fetchedArticle = useStore((state) => state.fetchedArticle)
    const setFetchedArticleTitle = useStore((state) => state.setFetchedArticleTitle)
    const setFetchedArticleText = useStore((state) => state.setFetchedArticleText)
    const pastedArticle = useStore((state) => state.pastedArticle)
    const setPastedArticle = useStore((state) => state.setPastedArticle)
    const sentencesArray = useStore((state) => state.sentencesArray)
    const setSentencesArray = useStore((state) => state.setSentencesArray)
    const currentSentence = useStore((state) => state.currentSentence)
    const setCurrentSentence = useStore((state) => state.setCurrentSentence)
    const pauseUtterance = useStore((state) => state.pauseUtterance)



    const [isLoading, setIsLoading] = useState(false)
    const [isPlayButtonEnabled, setIsPlayButtonEnabled] = useState(false)
    const shouldLoadArticleFromURLParam = useRef(null)

    // useEffect(() => {
    //     if (currentTab == 1) {
    //         if (fetchedArticle.text)
    //             SplitArticleToSentencesHelper((fetchedArticle.text), setSentencesArray)
    //     }
    //     if (currentTab == 2) {
    //         if (pastedArticle)
    //             SplitArticleToSentencesHelper((pastedArticle), setSentencesArray)
    //     }
    // }, [currentTab])

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const paramValue = searchParams.get("url")

        if (paramValue !== null) {
            shouldLoadArticleFromURLParam.current = true
            setLinkToArticle(paramValue)
        }
    }, [])

    useEffect(() => {
        if (shouldLoadArticleFromURLParam.current && linkToArticle) {
            shouldLoadArticleFromURLParam.current = false
            FetchArticle()
        }
    }, [linkToArticle])

    useEffect(() => {
        if (isPlayerOpen) {
            setIsPlayButtonEnabled(false)
            return
        }
        if ((currentTab == 1)) {
            if (fetchedArticle.title != "")
                setIsPlayButtonEnabled(true)
            else
                setIsPlayButtonEnabled(false)
        }
        else if ((currentTab == 2)) {
            if (pastedArticle != "")
                setIsPlayButtonEnabled(true)
            else
                setIsPlayButtonEnabled(false)
        }
    }, [currentTab, fetchedArticle, pastedArticle, isPlayerOpen])

    function HandlePlayPauseButtonClick() {
        if (currentTab == 1) {
            if (fetchedArticle.text)
                SplitArticleToSentencesHelper((fetchedArticle.text), setSentencesArray)
        }
        if (currentTab == 2) {
            if (pastedArticle)
                SplitArticleToSentencesHelper((pastedArticle), setSentencesArray)
        }
        console.log("BUTTON CLICKED")
        console.log("Utterance at click " + speechSynthesis.speaking)

        if (speechSynthesis.speaking) {
            console.log("Requested pause utterance")
            pauseUtterance()
        }
        else {
            if (sentencesArray.length > 0) {
                const savedCurrentSentence = parseInt(sessionStorage.getItem("currentSentence"))
                    ? parseInt(sessionStorage.getItem("currentSentence"))
                    : 0
                console.log("Previously saved sentence " + savedCurrentSentence)

                if (sessionStorage.getItem("utteranceEndTrigger") == "pause") {
                    console.log("Requested resume utterance")
                    setCurrentSentence(savedCurrentSentence)
                }
                else {
                    console.log("Requested restart utterance")
                    setCurrentSentence(0)
                }
            }
        }
    }

    function FetchArticle() {
        {
            setIsLoading(true)
            setFetchedArticleTitle("")
            setFetchedArticleText("")
            fetch(`https://render-express-server-q222.onrender.com/fetch-html?url=${linkToArticle}`).then((response) => {
                if (response.status >= 400 && response.status <= 599)
                    alert(`Hmm lovely link, but seems to return nothing :P\nCheck the link or try opening the link yourself and paste the article
                `)
                response.text().then((result) => {
                    const parser = new DOMParser()
                    const html = parser.parseFromString(result, "text/html")
                    const parsedArticleFromHTML = new Readability(html).parse()
                    console.log(parsedArticleFromHTML)
                    setIsLoading(false)
                    if (parsedArticleFromHTML) {
                        setFetchedArticleTitle(parsedArticleFromHTML.title)
                        setFetchedArticleText(parsedArticleFromHTML.textContent)
                        SplitArticleToSentencesHelper((parsedArticleFromHTML.textContent), setSentencesArray)
                    }
                    else {
                        alert(`Hmm lovely link, but seems to return nothing :P\nCheck the link or try opening the link yourself and paste the article
                        `)
                    }
                })
            }).catch((error) => {
                alert(error)
                setIsLoading(false)
            })
        }
    }


    return (
        <>
            <div
                className={`relative bg-black p-6 flex flex-col flex-grow min-h-0
                ${isPlayerOpen ? `w-full lg:w-1/2 pointer-events-none touch-none cursor-not-allowed opacity-50` : `w-full`}
                `}
                style={{ transition: "all 0.5s" }}
            >
                <Link
                    href="/"
                    className="flex gap-2 items-center justify-center mt-2 mb-8"
                >
                    <span
                        className="material-icons-round text-4xl text-primary-800"
                    >
                        graphic_eq
                    </span>
                    <h3 className="text-primary-800 font-bold text-2xl">LISTEN</h3>
                </Link>
                <div className="flex w-max mx-auto mb-8 bg-primary-800/30 rounded-full">
                    <Button
                        type={currentTab == 1 ? `primary` : `tertiary`}
                        showHoverAnimation={false}
                        className="px-6 py-2"
                        onClick={() => setCurrentTab(1)}
                    >
                        Fetch article
                    </Button>
                    <Button
                        type={currentTab == 2 ? `primary` : `tertiary`}
                        showHoverAnimation={false}
                        className="px-6 py-2"
                        onClick={() => setCurrentTab(2)}
                        isDisabled={isLoading}
                        disabledTitle="I am frozen when fetching an article!"
                    >
                        Paste article
                    </Button>
                </div>
                {currentTab == 1 &&
                    <div className="flex-grow min-h-0 flex flex-col animate__animated animate__fadeIn">
                        <div className={`relative mb-12 ${linkToArticle != "" && `animate__animated animate__bounceIn`}`}>
                            <InputField
                                placeholder="Link to article"
                                type="input-field"
                                value={linkToArticle}
                                onChange={(event) => {
                                    setLinkToArticle(event)
                                }}
                            />
                            <Button
                                type="primary"
                                showHoverAnimation={false}
                                className="absolute right-0 rounded-l-none py-2 px-4 h-full"
                                onClick={FetchArticle}
                                isDisabled={linkToArticle == ""}
                            >
                                Fetch
                            </Button>
                        </div>
                        {fetchedArticle.title == "" &&
                            <div
                                key={isLoading}
                                className="flex-grow cursor-pointer animate__animated animate__bounceIn flex flex-col justify-center items-center"
                                onClick={() => setLinkToArticle("https://ideas.ted.com/how-to-handle-anxiety-lionel-messi/")}
                            >
                                <div
                                    className={`flex gap-4 justify-center w-min mb-6`}
                                >
                                    <Eye whichEye="left" isLoading={isLoading} />
                                    <Eye whichEye="right" isLoading={isLoading} />
                                </div>
                                <p

                                    className=" text-primary-800 ">
                                    {isLoading ? `Fetching, hold on...` : `Need a nice link?`}
                                </p>
                                <p

                                    className=" text-primary-800 ">
                                    {isLoading ? `Sometimes takes upto 30 seconds :(` : ``}
                                </p>
                            </div>}
                        {fetchedArticle.title != "" &&
                            <div className="flex-grow flex flex-col min-h-0 overflow-clip rounded-lg animate__animated animate__fadeIn">
                                <div className="px-6 py-4 bg-primary-800/40 font-bold">
                                    <a href={linkToArticle} target="_blank">
                                        <p
                                            className="underline-none hover:underline hover:underline-offset-4 transition ease-in-out delay-800"
                                        >
                                            {fetchedArticle.title}
                                        </p>
                                    </a>
                                </div>
                                <div className="p-6 bg-primary-800/30 overflow-y-auto pointer-events-auto cursor-auto custom-scrollbar text-white/60">
                                    <p>{fetchedArticle.text}</p>
                                </div>
                            </div>}
                    </div>
                }
                {currentTab == 2 &&
                    <div className="relative flex-grow animate__animated animate__fadeIn">
                        <InputField
                            placeholder="Paste an article, short or long"
                            type="text-area"
                            value={pastedArticle}
                            className="pointer-events-auto cursor-auto"
                            onChange={(event) => {
                                console.log("Pasted article " + event)
                                setPastedArticle(event)
                                SplitArticleToSentencesHelper((event), setSentencesArray)
                            }}
                        />
                        <div className="text-right">
                            <Button
                                type="tertiary"
                                showHoverAnimation={true}
                                className="py-0 pl-4 font-bold"
                                onClick={() => {
                                    setPastedArticle(text)
                                    setPastedArticle("")
                                    // SplitArticleToSentencesHelper(("Text from tab 2" + text), setSentencesArray)
                                }}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                }
                {isPlayButtonEnabled &&
                    <div
                        className="fixed bottom-8 w-min mx-auto right-0 left-0 flex justify-center lg:absolute lg:bottom-8 animate__animated animate__fadeInUp"
                        style={{
                            animationDelay: `0.25s`
                        }}
                    >
                        <Button
                            type="primary"
                            className="rounded-full w-min flex p-3"
                            onClick={() => {
                                setIsPlayerOpen(true)
                                HandlePlayPauseButtonClick()
                            }}
                        >
                            <span
                                className="material-icons-round text-6xl"
                            >
                                play_arrow
                            </span>
                        </Button>
                    </div>
                }
            </div >
        </>
    )
}


function SplitArticleToSentencesHelper(articleText, setSentencesArray) {
    const localSentencesArray = articleText.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g)
    // console.log(localSentencesArray)

    if (localSentencesArray?.length > 0) {
        setSentencesArray(localSentencesArray)
    }
}