import Select from 'react-select'
import { colours } from "@/constants/colours"
import Button from "./Button";
import { useEffect, useState } from "react";
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useStore } from "@/app/app/page";


export default function VoiceSettings({ }) {
    const allVoices = useStore((state) => state.allVoices)
    const voices = useStore((state) => state.voices)
    const pauseUtterance = useStore((state) => state.pauseUtterance)
    const setSelectedVoice = useStore((state) => state.setSelectedVoice)
    const rate = useStore((state) => state.rate)
    const setRate = useStore((state) => state.setRate)
    const pitch = useStore((state) => state.pitch)
    const setPitch = useStore((state) => state.setPitch)

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const ref = useDetectClickOutside({ onTriggered: () => { setIsSettingsOpen(false) } });
    const options = voices;

    useEffect(() => {
        pauseUtterance()
    }, [isSettingsOpen])



    return (
        <>
            <style jsx global>{`
                @keyframes openDropdown {
                    0% {height: 0px;}
                    100% {height: 300px;}
                }

                @keyframes closeDropdown {
                    0% {height: 300px;}
                    100% {height: 0px;}
                }

                .tailwind-pain__control {
                    border-color: ${colours["primary-800/50"]}; 
                }
                .tailwind-pain__menu{
                    animation: openDropdown 0.5s; 
                }
                .menu--close{
                    animation: closeDropdown 0.5s;
                }

                input[type=range][orient=vertical]
                {
                    writing-mode: bt-lr; /* IE */
                    -webkit-appearance: slider-vertical; /* Chromium */
                    width: 8px;
                    height: 175px;
                    padding: 0 5px;
                }
            `}</style>
            <div className="flex gap-4 items-center mb-3 lg:mb-0">
                <div
                    className="flex-grow"
                >
                    <Select
                        id="stupid-select"
                        options={options}
                        isSearchable={false}
                        classNamePrefix="tailwind-pain"
                        placeholder="Default voice"
                        noOptionsMessage="Looks like text to speech is not supported on this browser!"
                        onChange={(event) => {
                            allVoices.map((voice) => {
                                if (voice.voiceURI == event.value.voiceURI)
                                    setSelectedVoice(voice)
                            })
                        }}
                        onMenuOpen={() => {
                            pauseUtterance()
                        }}
                        onMenuClose={() => {
                            const menuEl = document.querySelector(`.tailwind-pain__menu`);
                            const menuElScrollTop = menuEl?.firstChild.scrollTop;
                            const containerEl = menuEl?.parentElement;
                            const clonedMenuEl = menuEl?.cloneNode(true);

                            if (!clonedMenuEl) return; // safeguard

                            clonedMenuEl.classList.add("menu--close");
                            clonedMenuEl.addEventListener("animationend", () => {
                                containerEl?.removeChild(clonedMenuEl);
                            });

                            containerEl?.appendChild(clonedMenuEl);
                            clonedMenuEl.firstChild.scrollTop = menuElScrollTop;
                        }}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: colours["primary-800/20"],
                                borderColor: colours["primary-800/50"],
                                borderColor: state.isFocused && colours["primary-800"],
                                boxShadow: "none",
                                borderRadius: "32px",
                                padding: "2px 4px",
                                ":hover": {
                                    borderColor: colours["primary-800"],
                                },
                                ":active": {
                                    borderColor: colours["primary-800"],
                                },
                                cursor: "pointer"
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: colours["white/70"],
                            }),
                            dropdownIndicator: (base) => ({
                                ...base,
                                color: colours["primary-800"]
                            }),
                            indicatorSeparator: (base) => ({
                                ...base,
                                backgroundColor: colours["primary-800"]
                            }),
                            container: (base) => ({
                                ...base,
                                backgroundColor: "transparent",
                            }),
                            menuList: (base) => ({
                                ...base,
                                padding: "0px"
                            }),
                            menu: (base) => ({
                                ...base,
                                color: colours["primary-800"],
                                overflow: "clip",
                                backgroundColor: "rgba(0,0,0,0.4)",
                                borderRadius: "8px",
                                backdropFilter: "blur(8px)",
                                boxShadow: "0px 8px 32px 0px rgba(0, 128, 128, 0.75)",
                                padding: "0px",
                            }),
                            group: (base) => ({
                                ...base,
                                color: colours["primary-800"],
                                padding: "0px",
                            }),
                            groupHeading: (base, state) => ({
                                ...base,
                                color: colours["white/70"],
                                fontSize: "16px",
                                padding: "8px 16px",
                                backgroundColor: colours["primary-800/20"],
                                cursor: "not-allowed",
                                border: `solid ${colours["primary-800"]}`,
                                borderWidth: "2px 0px",
                            }),
                            option: (base, state) => ({
                                ...base,
                                transition: "color 0.2s",
                                color: state.isSelected ? colours["white/70"] : colours["primary-800"],
                                backgroundColor: state.isSelected && colours["primary-800/80"],
                                ":hover": {
                                    color: colours["white/70"],
                                },
                                ":active": {
                                    backgroundColor: colours["primary-800/60"],
                                },
                                ":focus": {
                                    backgroundColor: colours["primary-800/40"],
                                },
                                cursor: "pointer"
                            }),

                        }}
                    />
                </div>
                <div className="relative" ref={ref}>
                    <Button
                        type="tertiary"
                        className="rounded-full w-min flex"
                        onClick={() => { setIsSettingsOpen(!isSettingsOpen) }}
                    >
                        <span
                            className="material-icons-round text-4xl"
                        >
                            tune
                        </span>
                    </Button>
                    <div
                        className={`${isSettingsOpen ? `h-64 px-6 py-0` : `h-0 p-0`} overflow-clip absolute top-12 right-0 bg-black/40 rounded-md flex gap-4 items-center justify-center z-20`}
                        style={{
                            backdropFilter: "blur(8px)",
                            boxShadow: "0px 8px 32px 0px rgba(0, 128, 128, 0.75)",
                            transition: "all 0.5s"
                        }}
                    >
                        <div className={`flex flex-col items-center ${isSettingsOpen ? `opacity-80` : `opacity-0`}`}>
                            <input
                                type="range"
                                orient="vertical"
                                min={0.1}
                                max={2}
                                step={0.1}
                                value={rate}
                                className=" accent-primary-800"
                                style={{}}
                                onChange={(e) => {
                                    setRate(e.target.value)
                                }}
                            />
                            <p>{rate}</p>
                            <p className="text-primary-800 font-bold">Rate</p>
                        </div>
                        <div className={`flex flex-col items-center ${isSettingsOpen ? `opacity-80` : `opacity-0`}`}>
                            <input
                                type="range"
                                orient="vertical"
                                min={0}
                                max={2}
                                step={0.1}
                                value={pitch}
                                className=" accent-primary-800"
                                style={{}}
                                onChange={(e) => {
                                    setPitch(e.target.value)
                                }}
                            />
                            <p>{pitch}</p>
                            <p className="text-primary-800 font-bold">Pitch</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="lg:hidden text-primary-800 text-center text-sm">On mobile devices, change voice in your device text to speech settings</p>
            <p className="mt-2 hidden lg:block text-primary-800 text-center text-sm">On desktop devices, use Google Chrome for more natural voices</p>
        </>
    )
}