import { useState } from 'react';
import { Card,Deck } from '../../types/DataTypes';
import { SessionSettings, TestFormat } from '../../types/SettingTypes';
import { getRandomInt, createIndexArray,modulus } from '../BasicParts/BasicFunctions';
import Button from '../BasicParts/Buttons/BaseButton';
import CardDisplayContainer  from '../Cards/CardDisplayContainer';


interface SessionPageProps {
    deck: Deck;
    settings: SessionSettings;
    indexArray:number[];
    terminateSession: (correctArray: boolean[], memorizeErrors:boolean) => void;
}

const SessionPage = (props: SessionPageProps) => {
    let deck = props.deck;
    let testFormat = props.settings.testFormat;
    let queryType = props.settings.queryType;
    let testLen = props.settings.testLen;
    let lowerBound = props.settings.lowerBound;
    let upperBound = props.settings.upperBound;
    const initCorrectArray = Array<boolean>(testLen).fill(false);

    
    const [counter,setCounter] = useState<number>(0);
    const [correctArray, setCorrectArray] = useState<boolean[]>(initCorrectArray);
    const [proceedToScore, setProceedToScore] = useState<boolean>(false);
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(props.indexArray[0]);
    const [saveMistakes, setSaveMistakes] = useState<boolean>(true);

    const goNext = () => {
        let nextCounter = modulus(counter + 1, testLen);
        console.log("Next Counter: ", nextCounter, "Test Length: ", testLen);
        let nextIndex = props.indexArray[nextCounter];
        setCounter(nextCounter);
        setCurrentCardIndex(nextIndex);

    }
    const goPrev = () => {
        let prevCounter = modulus(counter - 1, testLen);
        let prevIndex = props.indexArray[prevCounter];
        setCounter(prevCounter);
        setCurrentCardIndex(prevIndex);
    }
    const changeCorrectCurrent = () => {
        let newCorrectArray = [...correctArray];
        newCorrectArray[counter] = !newCorrectArray[counter];
        setCorrectArray(newCorrectArray);
    }
    const countCorrect = () => {
        let count = 0;
        for (let i = 0; i < testLen; i++) {
            if (correctArray[i]) {
                count++;
            }
        }
        return count;
    }
    const terminateAndReturnCorrectArray = () => {
        props.terminateSession(correctArray,saveMistakes);
    }
    console.log("Current Card Correct: ", correctArray[counter]);
    let saveMistakesText = saveMistakes ? "Saving Mistakes" : "Save Mistakes?";
    let saveButtonStyle = saveMistakes ? "bg-blue-500 hover:bg-blue-700 hover:border-blue-700 text-white border-blue-500" :"bg-white border-black hover:bg-blue-500 hover:border-blue-500 hover:text-white";
    return (
        <>
            {!proceedToScore &&
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col '>
                <h1 className='font-bold text-2xl'>Currently Running: {deck.name}</h1>
                    <p>Current Item: {counter+1}/{testLen}</p>
                    <p>Points: {countCorrect()}/{testLen}</p>
                    <div className='items-center mt-1'>
                        <button className={`border-2 rounded-lg w-36 h-10 ${saveButtonStyle}`}
                            onClick={() => setSaveMistakes(!saveMistakes)}>{saveMistakesText}
                        </button>
                    </div>
                </div>
                <div className=''>
                    <CardDisplayContainer card={deck.cards[currentCardIndex]} queryType={queryType} isCorrect={correctArray[counter]} goNextCard={goNext} goPrevCard={goPrev} changeCorrect={changeCorrectCurrent} />
                </div>
                    <Button order={1} absolute={true} onClick={terminateAndReturnCorrectArray} >
                    End Session
                </Button>
            </div>}
            {proceedToScore &&
            <div>
                <h1 className='font-bold text-2xl'>Session Complete!</h1>
                <p>Points: {countCorrect()}/{testLen}</p>
                    <Button order={1} pos={2} onClick={terminateAndReturnCorrectArray} >
                    End Session
                </Button>
            </div>}
        </>
        
    );
}

export default SessionPage;