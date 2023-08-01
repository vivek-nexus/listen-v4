export default function InputField({ placeholder, onChange, type }) {
    return (
        <>
            {type == "input-field" &&
                <input
                    className="border py-2 pl-4 pr-20 w-full rounded-full border-primary-800/50 outline-none duration-200 bg-primary-800/20  focus:border-primary-800 placeholder:text-white/40"
                    onChange={(event) => {
                        onChange(event.target.value);
                    }}
                    placeholder={placeholder}
                />
            }
            {type == "text-area" &&
                <textarea
                    className="border p-4 pr-20 w-full rounded-lg border-primary-800/50 outline-none duration-200 bg-primary-800/20 focus:border-primary-800 placeholder:text-white/40"
                    onChange={(event) => {
                        onChange(event.target.value);
                    }}
                    placeholder={placeholder}
                    rows={8}
                />
            }
        </>


    )
}