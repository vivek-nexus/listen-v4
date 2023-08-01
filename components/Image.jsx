export default function Image({ src, className }) {
    return (
        <img src={`${process.env.LINK_PREFIX}/${src}`} className={className} />
    )
}