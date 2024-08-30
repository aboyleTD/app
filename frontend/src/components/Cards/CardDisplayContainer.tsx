import { useState } from 'react';
import {Card, TitledText} from '../../types/DataTypes';
import {QueryType} from '../../types/SettingTypes';
import { modulus } from '../BasicParts/BasicFunctions';
import CardDisplay from './CardDisplay';
import CardButton from '../BasicParts/Buttons/CardButton';

interface CardDisplayContainerProps {
    card: Card;
    queryType: QueryType;
    goNextCard: () => void;
    goPrevCard: () => void;
    
}
const CardDisplayContainer = (props: CardDisplayContainerProps) => {
    const card = props.card;
    const [side, setSide] = useState<number>(0);
    
    let titledTextList: (TitledText)[] = [];
    switch (props.queryType) {
        case QueryType.Forward:
            titledTextList = [["Original Term",card.reading + "\n" + card.word], ["翻訳",card.translations.join("\n")], ["例文",card.examples.join("\n")]];
            break;
        case QueryType.Backward:
            titledTextList = [["翻訳",card.translations.join("\n")], ["Original Term", card.reading + "\n" + card.word], ["例文", card.examples.join("\n")]];
            break;
        case QueryType.Kanji:
            titledTextList = [["漢字", card.word], ["音読み と 訓読み" ,card.extendedReadings[0].join("\n") + "\n" + card.extendedReadings[1].join("\n")], ["翻訳",card.translations.join("\n")], ["例文",card.examples.join("\n")]];
            break;
        default:
            console.log("Invalid Query Type");
    }
    const goNextSide = () => {
        setSide(modulus((side + 1), titledTextList.length));
    }
    const goPrevSide = () => {
        setSide(modulus((side - 1), titledTextList.length));
    }   

    return (
        <div className='flex flex-col gap-y-10'>
            <CardDisplay titledText={titledTextList[side]} goNextSide={goNextSide} goPrevSide={goPrevSide}/>
            <div className='flex flex-row justify-between '>
                <CardButton text="Previous" onClick={props.goPrevCard}/>
                <CardButton text="Next" onClick={props.goNextCard}/>
            </div>
        </div>
    )



}

export default CardDisplayContainer;