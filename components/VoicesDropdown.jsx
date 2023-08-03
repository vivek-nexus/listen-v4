import Select from 'react-select'
import { colours } from "@/constants/colours"


export default function VoicesDropdown({ }) {
    const ColourOptions = [
        { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
        { value: 'blue', label: 'Blue', color: '#0052CC' },
        { value: 'purple', label: 'Purple', color: '#5243AA' },
        { value: 'red', label: 'Red', color: '#FF5630' },
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




    return (
        <>
            <style jsx global>{`
                .tailwind-pain__control {
                    border-color: ${colours["primary-800/50"]}
                }
            `}</style>
            <Select
                options={options}
                isSearchable={false}
                classNamePrefix="tailwind-pain"
                placeholder="Default voice"
                noOptionsMessage="Looks like text to speech is not supported on this browser!"
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
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: colours["white/70"],
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
                        padding: "0px"
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
                        }
                    }),
                    dropdownIndicator: (base) => ({
                        ...base,
                        color: colours["primary-800"]
                    }),
                    indicatorSeparator: (base) => ({
                        ...base,
                        backgroundColor: colours["primary-800"]
                    }),
                }}
            /></>
    )
}