export default function InputField({ placeholder, defaultValue, value, onChange, type, isDisabled, disabledTitle, className }) {
    return (
        <>
            {type == "input-field" &&
                <input
                    className={`border py-2 pl-4 pr-20 w-full rounded-full border-primary-800/50 outline-none duration-200 bg-primary-800/20  focus:border-primary-800 placeholder:text-white/40 disabled:bg-gray-500/30 disabled:cursor-not-allowed ${className}`}
                    onChange={(event) => {
                        onChange(event.target.value);
                    }}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    value={value}
                    disabled={isDisabled}
                    title={isDisabled ? disabledTitle : ``}
                />
            }
            {type == "text-area" &&
                <textarea
                    rows={10}
                    className={`border p-4 w-full rounded-lg border-primary-800/50 outline-none duration-200 bg-primary-800/20 focus:border-primary-800 placeholder:text-white/40 custom-scrollbar disabled:bg-gray-500/30 disabled:cursor-not-allowed ${className}`}
                    onChange={(event) => {
                        onChange(event.target.value);
                    }}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    value={value}
                    disabled={isDisabled}
                    title={isDisabled ? disabledTitle : ``}
                />
            }
        </>


    )
}