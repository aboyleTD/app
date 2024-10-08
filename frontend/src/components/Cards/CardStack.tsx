import { Deck, Card } from "../../types/DataTypes";
const offsetPerElement: number = 6;
const cutOff: number = 60;

interface CardStackProps {
    thisDeck: Deck;
}

export function CardStack(props: CardStackProps) {
    let deck: Deck = props.thisDeck;
    let len = deck.cards.length;
    let cards = deck.cards.slice(0,cutOff);
    let topOffset = len > cutOff ? cutOff : len;


    return (
        <>
            <div
                className='grid'
                style={
                    {
                        marginTop: `${offsetPerElement * topOffset + 25}px`,
                    }
                }>
                {cards.map((card: Card, index: number) => {
                    let offset = (index + 1) * offsetPerElement;
                    // console.log("visualize a card at offset: ", offset)
                    return (
                        <div
                            key={index}
                            className="col-start-1 row-start-1 w-44 h-32 rounded-xl border-2 border-gray-700 bg-white cursor-pointer"
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
                            <p className=" font-medium text-lg">{card.term}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
export default CardStack;