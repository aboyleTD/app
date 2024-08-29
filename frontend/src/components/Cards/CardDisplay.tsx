
interface CardDisplayProps {
    text: string;
    goNextSide: () => void;
    goPrevSide: () => void;
}

const CardDisplay = (props: CardDisplayProps) => {

    return (
        <div className='relative w-52 h-44 rounded-lg border-3 border-black content-center'>
            <p className=" font-medium text-xl">{props.text}</p>
        </div>
    )



}

export default CardDisplay;