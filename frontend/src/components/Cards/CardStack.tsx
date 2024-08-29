import { Deck, Card } from "../../types/DataTypes";
import { acknowledgeClick } from "../BasicParts/Mocks/FillerFunctions";
const offsetPerElement: number = 6;

interface CardStackProps {
    thisDeck: Deck;
}

export function CardStack(props: CardStackProps) {
    let data: Deck = props.thisDeck;
    let nhidden = data.cards.length - 1;
    // nhidden = 50;
    if (nhidden > 80){
        nhidden = 80;
    }
    let hiddenElementIndices = [...Array(nhidden).keys()];
    let topIndex = 0;
    

    return (
        <>
            <div
                className='absolute top-20 left-10 w-36 h-36 cursor-pointer rounded-xl border-2 border-gray-700 bg-white px-6 py-3 text-center flex items-center justify-center' 
                style={{ top: `${nhidden * offsetPerElement + 100}px` }}>
                <p >{data.cards[0].word}</p>
                {hiddenElementIndices.map((index: number) => {
                    let offset = (index + 1) * offsetPerElement;
                    return (
                        <div
                            key={index}
                            className="absolute -bottom-0.5 -left-0.5 -right-0.5 -top-0.5 rounded-xl border-2 border-gray-700 bg-white cursor-pointer"
                            style={{
                                transform: `translate(${0}px, ${-offset}px)`,
                                zIndex: -index - 1,
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = `translate(${0}px, ${-offset - 4*offsetPerElement}px)`;
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = `translate(${0}px, ${-offset}px)`;
                            }}>
                            <p>{data.cards[index + 1].word}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
export default CardStack;