export default function Phone({ classNameForPhoneContainer, classNameForPhoneContents, viewport, children }) {
    return (
        <div
            className={`${classNameForPhoneContainer} relative h-[320px] xl:h-[390px] w-[172px] xl:w-[214px] p-2 rounded-2xl bg-black`}
            style={{ boxShadow: "0px 10px 33px 4px rgba(0, 128, 128, 0.75)" }}
        >
            <div
                className={`${classNameForPhoneContents} pack-container hide-scrollbars w-full h-full rounded-xl p-2 overflow-scroll scroll-smooth`}
                id={`pack-container-${viewport}`}
                style={{
                    background: "linear-gradient(180deg, #171717 0%, #393939 100%)",
                }}
            >
                {children}
            </div>
            <div className="bg-white/70 h-1 rounded-full w-1/3 absolute mx-auto left-0 right-0 bottom-2"></div>
        </div>
    )
}