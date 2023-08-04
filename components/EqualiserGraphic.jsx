export default function EqualiserGraphic({ height, isPlaying }) {
    const heightInPixel = `${height}px`
    const widthOfEachBarInPixel = `${(0.075 * height)}px`;
    const gapInPixel = `${(0.15 * height)}px`

    return (
        <div>
            <style jsx global>{`
                .equaliser-animation-properties{
                    animation-duration: 2s;
                    animation-iteration-count: infinite;
                    animation-timing-function: linear;
                    animation-play-state: ${isPlaying ? `running` : `paused`}
                }
                @keyframes bar-1-animation{
                    0% {height: ${height * 0.2}px}
                    25% {height: ${height * 0.6}px}
                    50% {height: ${height}px}
                    75% {height: ${height * 0.6}px}
                    100% {height: ${height * 0.2}px}
                }

                .bar-1{
                    animation-name: bar-1-animation;  
                }

                @keyframes bar-2-animation{
                    0% {height: ${height * 0.6}px}
                    25% {height: ${height}px}
                    50% {height: ${height * 0.6}px}
                    75% {height: ${height * 0.2}px}
                    100% {height: ${height * 0.6}px}
                }

                .bar-2{
                    animation-name: bar-2-animation;
                }

                @keyframes bar-3-animation{
                    0% {height: ${height}px}
                    25% {height: ${height * 0.6}px}
                    50% {height: ${height * 0.2}px}
                    75% {height: ${height * 0.6}px}
                    100% {height: ${height}px}
                }

                .bar-3{
                    animation-name: bar-3-animation;
                }

                @keyframes bar-4-animation{
                    0% {height: ${height * 0.6}px}
                    25% {height: ${height * 0.2}px}
                    50% {height: ${height * 0.6}px}
                    75% {height: ${height}px}
                    100% {height: ${height * 0.6}px}
                }

                .bar-4{
                    animation-name: bar-4-animation;
                }

                @keyframes bar-5-animation{
                    0% {height: ${height * 0.2}px}
                    25% {height: ${height * 0.6}px}
                    50% {height: ${height}px}
                    75% {height: ${height * 0.6}px}
                    100% {height: ${height * 0.2}px}
                }

                .bar-5{
                    animation-name: bar-5-animation;
                }
            `}</style>
            <div
                className={`flex items-center`}
                style={{ width: heightInPixel, height: heightInPixel, gap: gapInPixel }}
            >
                <div
                    className={`bg-primary-800 rounded-full bar-1 equaliser-animation-properties`}
                    style={{
                        width: widthOfEachBarInPixel,
                        height: heightInPixel,
                    }}
                ></div>
                <div
                    className={`bg-primary-800 rounded-full bar-2 equaliser-animation-properties`}
                    style={{
                        width: widthOfEachBarInPixel,
                        height: heightInPixel
                    }}
                ></div>
                <div
                    className={`bg-primary-800 rounded-full bar-3 equaliser-animation-properties`}
                    style={{
                        width: widthOfEachBarInPixel,
                        height: heightInPixel
                    }}
                ></div>
                <div
                    className={`bg-primary-800 rounded-full bar-4 equaliser-animation-properties`}
                    style={{
                        width: widthOfEachBarInPixel,
                        height: heightInPixel
                    }}
                ></div>
                <div
                    className={`bg-primary-800 rounded-full bar-5 equaliser-animation-properties`}
                    style={{
                        width: widthOfEachBarInPixel,
                        height: heightInPixel
                    }}
                ></div>
            </div>
        </div>
    )
}