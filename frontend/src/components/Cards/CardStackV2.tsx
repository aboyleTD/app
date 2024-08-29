import { Deck, Card } from "../../types/DataTypes";
import { acknowledgeClick } from "../BasicParts/Mocks/FillerFunctions";
const offsetPerElement: number = 6;

interface CardStackProps {
    thisDeck: Deck;
}

export function CardStackV2(props: CardStackProps) {
    let deck: Deck = props.thisDeck;
    let len = deck.cards.length;


    return (
        <>
            <div
                className='grid'
                style={
                    {
                        marginTop: `${offsetPerElement *len+ 20}px`,
                    }
                }>
                {deck.cards.map((card: Card, index: number) => {
                    let offset = (index + 1) * offsetPerElement;
                    return (
                        <div
                            key={index}
                            className="col-start-1 row-start-1 w-44 h-36 rounded-xl border-2 border-gray-700 bg-white cursor-pointer"
                            style={{
                                transform: `translate(${0}px, ${-offset}px)`,
                                alignContent: `${index === 0 ? 'center' : 'flex-start'}`,
                                zIndex: -index - 1,
                            }}
                            onMouseEnter={(e) => {
                                if (index !== 0) {
                                    (e.currentTarget as HTMLElement).style.transform = `translate(${0}px, ${-offset - 4 * offsetPerElement}px)`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = `translate(${0}px, ${-offset}px)`;
                            }}>
                            <p>{card.word}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
export default CardStackV2;