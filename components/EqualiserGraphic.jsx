export default function EqualiserGraphic({ height, className }) {
    const heightInPixel = `${height}px`
    const widthOfEachBarInPixel = `${(0.075 * height)}px`;
    const gapInPixel = `${(0.15 * height)}px`

    return (
        <div
            className={`${className} flex`}
            style={{ width: heightInPixel, height: heightInPixel, gap: gapInPixel }}
        >
            <div
                className={`bg-primary-800`}
                style={{
                    width: widthOfEachBarInPixel,
                    height: heightInPixel
                }}
            ></div>
            <div
                className={`bg-primary-800`}
                style={{
                    width: widthOfEachBarInPixel,
                    height: heightInPixel
                }}
            ></div>
            <div
                className={`bg-primary-800`}
                style={{
                    width: widthOfEachBarInPixel,
                    height: heightInPixel
                }}
            ></div>
            <div
                className={`bg-primary-800`}
                style={{
                    width: widthOfEachBarInPixel,
                    height: heightInPixel
                }}
            ></div>
            <div
                className={`bg-primary-800`}
                style={{
                    width: widthOfEachBarInPixel,
                    height: heightInPixel
                }}
            ></div>
        </div>
    )
}