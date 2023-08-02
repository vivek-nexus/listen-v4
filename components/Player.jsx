// import React from 'react'
import Select from 'react-select'
import { useStore } from "@/app/app/page"
import { AnimatePresence, motion } from "framer-motion"
import { isMobile } from "react-device-detect"
import Button from "./Button"
import EqualiserGraphic from "./EqualiserGraphic"
import { colours } from "@/constants/colours"



export default function Player() {
    const isPlayerOpen = useStore((state) => state.isPlayerOpen)
    const setIsPlayerOpen = useStore((state) => state.setIsPlayerOpen)

    const ColourOptions = [
        { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
        { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
        { value: 'purple', label: 'Purple', color: '#5243AA' },
        { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' },
    ];

    const flavourOptions = [
        { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
        { value: 'chocolate', label: 'Chocolate', rating: 'good' },
        { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
        { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
    ];


    const options = [
        { label: "Colours", options: ColourOptions },
        { label: "Flavour", options: flavourOptions },
    ]

    const groupStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    };

    // const formatGroupLabel = (data: GroupedOption) => (
    //     <div style={groupStyles}>
    //         <span>{data.label}</span>
    //         <span style={groupBadgeStyles}>{data.options.length}</span>
    //     </div>
    // );

    return (
        <div
            className={`bg-black lg:bg-primary-800/20
                            ${isPlayerOpen
                    ? `absolute bottom-0 h-full w-full z-10 lg:relative lg:w-1/2 lg:h-auto`
                    : `absolute bottom-0 h-0 w-full lg:relative lg:w-0 lg:h-auto`}
                               `}
            style={{ transition: "all 0.5s" }}
        >
            {isPlayerOpen &&
                <div>
                    <div className="bg-primary-800/30 px-6 py-3 mb-6">
                        <Button
                            type="tertiary"
                            className="flex gap-2 items-center"
                            onClick={() => { setIsPlayerOpen(false) }}
                        >
                            <span
                                className="material-icons-round text-xl"
                            >
                                close
                            </span>
                            <p className="text-white/70 font-bold">

                                Why Hybrid Work Can Become Toxic
                            </p>
                        </Button>
                    </div>
                    <div className="px-6 mb-24 flex gap-4 items-center">
                        <div
                            className="flex-grow"
                        >
                            <Select
                                options={options}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary: colours["primary-800"],
                                    },
                                })}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        backgroundColor: colours["primary-800/20"],
                                        borderColor: colours["primary-800/50"],
                                        borderColor: state.isFocused && colours["primary-800/50"],
                                        borderRadius: "32px",
                                        padding: "0px 4px",
                                        ":hover": {
                                            borderColor: colours["primary-800"],
                                        },
                                        ":active": {
                                            borderColor: colours["primary-800"],
                                        }
                                    }),
                                    singleValue: (base) => ({
                                        ...base,
                                        color: colours["white/70"],
                                    }),
                                    container: (base) => ({
                                        ...base,
                                        backgroundColor: "transparent",
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        color: colours["primary-800"],
                                        overflow: "clip",
                                        backgroundColor: colours["primary-800/10"],
                                        borderRadius: "8px",
                                        backdropFilter: "blur(16px)",
                                        boxShadow: "0px 4px 8px 0px rgba(0, 128, 128, 0.75)",
                                    }),
                                    group: (base) => ({
                                        ...base,
                                        color: colours["primary-800"],
                                        // backgroundColor: colours["primary-800/20"],
                                        padding: "0px",
                                        marginBo: "24px"
                                    }),
                                    groupHeading: (base, state) => ({
                                        ...base,
                                        color: colours["white/70"],
                                        fontSize: "16px",
                                        padding: "8px 16px",
                                        backgroundColor: colours["primary-800/20"],
                                        cursor: "not-allowed",
                                        // textAlign: "center",
                                        border: `solid ${colours["primary-800"]}`,
                                        borderWidth: "2px 0px",
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        transition: "all 0.5s",
                                        // paddingLeft: "32px",
                                        color: state.isSelected ? colours["white/70"] : colours["primary-800"],
                                        backgroundColor: state.isSelected && colours["primary-800/80"],
                                        // backgroundColor: state.isSelected && "transparent",
                                        // border: state.isSelected && `solid ${colours["primary-800"]}`,
                                        // borderWidth: state.isSelected && "0px 2px",
                                        ":hover": {
                                            color: colours["white/70"],
                                        },
                                        ":active": {
                                            backgroundColor: "transparent",
                                        }
                                    }),
                                }}
                                defaultValue={ColourOptions[0]}
                            />
                        </div>
                        <Button
                            type="tertiary"
                            className="rounded-full w-min flex"
                            onClick={() => { setIsPlayerOpen(true) }}
                        >
                            <span
                                className="material-icons-round text-4xl"
                            >
                                tune
                            </span>
                        </Button>
                    </div>
                    <div className="px-6 flex justify-center mb-24">
                        <EqualiserGraphic height="96" playState="playing" />
                    </div>
                    <div className="mx-6 flex justify-center mb-32 max-h-16 overflow-y-auto custom-scrollbar">
                        <p className="text-center">Toxicity can be an unfortunate reality of some work environments.</p>
                    </div>
                    <div className="px-6 py-6 bg-primary-800/20 absolute bottom-0 flex gap-4 justify-center items-center w-full">
                        <Button
                            type="tertiary"
                            className="flex gap-2 items-center"
                            onClick={() => { }}
                        >
                            <span
                                className="material-icons-round text-4xl"
                            >
                                fast_rewind
                            </span>
                        </Button>
                        <Button
                            type="primary"
                            className="rounded-full w-min flex p-3"
                            onClick={() => { setIsPlayerOpen(true) }}
                        >
                            <span
                                className="material-icons-round text-6xl"
                            >
                                pause
                            </span>
                        </Button>
                        <Button
                            type="tertiary"
                            className="flex gap-2 items-center"
                            onClick={() => { }}
                        >
                            <span
                                className="material-icons-round text-4xl"
                            >
                                fast_forward
                            </span>
                        </Button>
                    </div>
                </div>
            }
        </div>

    )
}