import { useState } from 'react';
import {Card} from '../../types/DataTypes';
import {QueryType} from '../../types/SettingTypes';
import CardDisplay from './CardDisplay';

interface CardDisplayContainerProps {
    card: Card;
    queryType: QueryType;
    goNextCard: () => void;
    goPrevCard: () => void;
    
}
const CardDisplayContainer = (props: CardDisplayContainerProps) => {
    const card = props.card;
    const [side, setSide] = useState<number>(0);
    
    let textList: string[] = [];
    switch (props.queryType) {
        case QueryType.NihongoToEnglish:
            textList = [card.reading+"\n"+card.word, "Translations:\n"+card.translations.join("\n"), "Examples:\n"+card.examples.join("\n")];
            break;
        case QueryType.EnglishToNihongo:
            textList = [card.translations.join("\n"), "Original Word:\n" + card.reading + "\n" + card.word, "Examples:\n"+ card.examples.join("\n")];
            break;
        case QueryType.Kanji:
            textList = [card.word, "音読み\n" +card.extendedReadings[0].join("\n")+"訓読み\n"+ card.extendedReadings[1].join("\n"), "Translations:\n"+card.translations.join("\n"), "Examples:\n"+card.examples.join("\n")];
            break;
        default:
            console.log("Invalid Query Type");
    }
    const goNextSide = () => {
        setSide((side + 1) % textList.length);
    }
    const goPrevSide = () => {
        setSide((side - 1) % textList.length);
    }   

    return (
        <div className=''>
            <CardDisplay text={textList[side]} goNextSide={goNextSide} goPrevSide={goPrevSide}/>
        </div>
    )



}

export default CardDisplayContainer;