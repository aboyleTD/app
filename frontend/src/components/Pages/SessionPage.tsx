import { useState } from 'react';
import { Card,Deck } from '../../types/DataTypes';
import { SessionSettings, TestFormat } from '../../types/SettingTypes';
import { getRandomInt } from '../BasicParts/BasicFunctions';
import { createIndexArray } from '../BasicParts/BasicFunctions';
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
    let firstIndex = 0;
    let initPrevIndex = 0;

    // Initialize IndexChain of Length testLen
    if (testFormat === TestFormat.Random) {
        // Randomize the deck
        firstIndex = getRandomInt(lowerBound, upperBound);
        initPrevIndex = lowerBound;
    } else if (testFormat === TestFormat.Sequential) {
        firstIndex = lowerBound;
        initPrevIndex = upperBound;
    } else {
        console.log("Invalid Test Format");
    }
    let indexArray = createIndexArray(testLen, lowerBound, upperBound, testFormat);
    const [counter,setCounter] = useState<number>(0);
    const [points,setPoints] = useState<number>(0);
    const [proceedToScore, setProceedToScore] = useState<boolean>(false);
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(indexArray[0]);

    const goNext = () => {
        let nextCounter = counter + 1 % testLen;
        let nextIndex = indexArray[nextCounter];
        setCounter(nextCounter);
        setCurrentCardIndex(nextIndex);

    }
    const goPrev = () => {
        let prevCounter = counter - 1 % testLen;
        let prevIndex = indexArray[prevCounter];
        setCounter(prevCounter);
        setCurrentCardIndex(prevIndex);
    }
    
    return (
        <>
            {!proceedToScore &&
            <div>
                <h1 className='font-bold text-2xl'>Currently Running: {deck.name}</h1>
                <p>Current Item: {counter}/{testLen}</p>
                <CardDisplayContainer card={deck.cards[currentCardIndex]} queryType={queryType} goNextCard={goNext} goPrevCard={goPrev} />
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