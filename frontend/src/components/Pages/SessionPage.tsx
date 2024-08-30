import { useState } from 'react';
import { Card,Deck } from '../../types/DataTypes';
import { SessionSettings, TestFormat } from '../../types/SettingTypes';
import { getRandomInt, createIndexArray,modulus } from '../BasicParts/BasicFunctions';
import Button from '../BasicParts/Buttons/BaseButton';
import CardDisplayContainer  from '../Cards/CardDisplayContainer';


interface SessionPageProps {
    deck: Deck;
    settings: SessionSettings;
    terminateSession: () => void;
}

const SessionPage = (props: SessionPageProps) => {
    let deck = props.deck;
    let testFormat = props.settings.testFormat;
    let queryType = props.settings.queryType;
    let testLen = props.settings.testLen;
    let lowerBound = props.settings.lowerBound;
    let upperBound = props.settings.upperBound;

    
    let indexArray = createIndexArray(testLen, lowerBound, upperBound, testFormat);
    const [counter,setCounter] = useState<number>(0);
    const [points,setPoints] = useState<number>(0);
    const [proceedToScore, setProceedToScore] = useState<boolean>(false);
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(indexArray[0]);

    const goNext = () => {
        let nextCounter = modulus(counter + 1, testLen);
        console.log("Next Counter: ", nextCounter, "Test Length: ", testLen);
        let nextIndex = indexArray[nextCounter];
        setCounter(nextCounter);
        setCurrentCardIndex(nextIndex);

    }
    const goPrev = () => {
        let prevCounter = modulus(counter - 1, testLen);
        let prevIndex = indexArray[prevCounter];
        setCounter(prevCounter);
        setCurrentCardIndex(prevIndex);
    }
    
    return (
        <>
            {!proceedToScore &&
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-col '>
                <h1 className='font-bold text-2xl'>Currently Running: {deck.name}</h1>
                    <p>Current Item: {counter+1}/{testLen}</p>
                    <p>Points: {points}/{testLen}</p>
                </div>
                <div className='mt-16'>
                    <CardDisplayContainer card={deck.cards[currentCardIndex]} queryType={queryType} goNextCard={goNext} goPrevCard={goPrev} />
                </div>
                <Button order={1} absolute={true} onClick={props.terminateSession} >
                    End Session
                </Button>
            </div>}
            {proceedToScore &&
            <div>
                <h1 className='font-bold text-2xl'>Session Complete!</h1>
                <p>Points: {points}/{testLen}</p>
                <Button order={1} pos={2} onClick={props.terminateSession} >
                    End Session
                </Button>
            </div>}
        </>
        
    );
}

export default SessionPage;