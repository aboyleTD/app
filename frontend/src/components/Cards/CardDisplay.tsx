import { MouseEvent, useRef } from "react"; 
import { TitledText } from "../../types/DataTypes";
interface CardDisplayProps {
    titledText: TitledText;
    goNextSide: () => void;
    goPrevSide: () => void;
}



const CardDisplay = (props: CardDisplayProps) => {
    const element = useRef<HTMLDivElement>(null);

    const handleClicked = (event: MouseEvent<HTMLDivElement>) => {
        if (element.current === null) {
            console.log("Element is null");
            return;
        }
        let elementX = element.current.getBoundingClientRect().x;
        let elementWidth = element.current.getBoundingClientRect().width;
        let elementMid = elementX + elementWidth / 2;
        let eventX = event.clientX;
        if (eventX > elementMid) {
            props.goNextSide();
        } else {
            props.goPrevSide();
        }


    }

    return (
        <div 
            ref={element}
            className='flex flex-col relative w-72 h-52 rounded-xl border-2 border-gray-700 cursor-pointer font-medium text-xl p-2 pl-4 pr-4 whitespace-pre-wrap' 
            onClick={handleClicked}>
            <p className="font-bold">{props.titledText[0]}</p>

            <p className="mt-10 self-center text-left">{props.titledText[1]}</p>
        </div>
    )

}

export default CardDisplay;