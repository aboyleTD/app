import { useState } from 'react';
import { Deck } from '../../types/DataTypes';
import { acknowledgeClick } from '../BasicParts/Mocks/FillerFunctions';
import { FaPlus } from "react-icons/fa6";

interface DeckSetPageProps {
    thisDeck: Deck;
}

const DeckPage = (props: DeckSetPageProps) => {

    const [deck, setDeck] = useState<Deck>(props.thisDeck);


    return (
        <div className="flex flex-row ">
            <p className='font-bold text-2xl ml-5 mt-5'>Deck: {deck.name} </p>
        </div>
    );
}

export default DeckPage;