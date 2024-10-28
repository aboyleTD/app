import { useState } from 'react';
import {Card, TitledText} from '../../types/DataTypes';
import {QueryType} from '../../types/SettingTypes';
import { modulus } from '../BasicParts/BasicFunctions';
import CardDisplay from './CardDisplay';
import CardButton from '../BasicParts/Buttons/CardButton';
import CheckmarkButton from '../BasicParts/Buttons/CheckmarkButton';

interface CardDisplayContainerProps {
    card: Card;
    queryType: QueryType;
    isCorrect: boolean;
    goNextCard: () => void;
    goPrevCard: () => void;
    changeCorrect: () => void;
    
}

const CardDisplayContainer = (props: CardDisplayContainerProps) => {
    const card = props.card;
    const [side, setSide] = useState<number>(0);

    //items 0 = term as kanji, 1 = reading+term, 
    const itemToTitle: { [key: number]: string } = {
        0: "漢字",
        1: "Orignal Term",
        2: "音読み と 訓読み",
        3: "翻訳",
        4: "例文"
    }
    const handlePotEmptyList = (value:string[]|null) => {
        if (!value){
            return ""
        } else {
            return value.join(", ")
        }

    }
    const itemToContent = (item:number) => {
        switch (item){
            case 0: return card.term;
            case 1: return card.reading + "\n" + card.term;
            case 2: return handlePotEmptyList(card.extendedReadings[0]) + "\n" + handlePotEmptyList(card.extendedReadings[1]);
            case 3: return handlePotEmptyList(card.translations)
            case 4: return handlePotEmptyList(card.examples)
            default: return ""
        }
    }
    const buildTextList = (items:number[]):TitledText[] => {
        let titledTextList:TitledText[] = [];
        let content:string|null;
        let item:number;
        for (let i = 0; i < items.length; i++){
            item = items[i]
            content = itemToContent(item)
            if (content.length !== 0){
                titledTextList.push([itemToTitle[item],content])
            }
                
        }
        return titledTextList


    };
    let items:number[] = [];
    switch (props.queryType) {
        case QueryType.Forward:
            items = [1,3,4]
            break;
        case QueryType.Backward:
            items = [3,1,4]
            break;
        case QueryType.Kanji:
            items = [0,2,3,4]
            break;
        default:
            console.log("Invalid Query Type");
    }
    let titledTextList = buildTextList(items);
    const goNextSide = () => {
        setSide(modulus((side + 1), titledTextList.length));
    }
    const goPrevSide = () => {
        setSide(modulus((side - 1), titledTextList.length));
    }
    const goNextCardWithSideReset = () => {
        setSide(0);
        props.goNextCard();
    }   
    const goPrevCardWithSideReset = () => {
        setSide(0);
        props.goPrevCard();
    }
    console.log("CardDisplayContainer is selected: ", props.isCorrect);
    return (
        <div className='flex flex-col gap-y-10 w-72'>
            <div className='relative '>
                <CardDisplay titledText={titledTextList[side]} goNextSide={goNextSide} goPrevSide={goPrevSide}/>
                <CheckmarkButton correct={props.isCorrect} onClick={props.changeCorrect}/>
            </div>
            <div className='flex flex-row justify-between '>
                <CardButton text="Previous" onClick={goPrevCardWithSideReset}/>
                <CardButton text="Next" onClick={goNextCardWithSideReset}/>
            </div>
        </div>
    )



}

export default CardDisplayContainer;