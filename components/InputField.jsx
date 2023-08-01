export default function InputField({ placeholder, onChange }) {
    return (
        <input
            className="border py-1.5 pl-4 pr-20 w-full rounded-full border-primary-700 outline-none duration-300 bg-primary-800/20 focus:bg-primary-800/30 placeholder:text-white/40"
            onChange={(event) => {
                onChange(event.target.value);
            }}
            placeholder={placeholder}
        />
    )
}