import { useState } from 'react';
import { Compendium, CompendiumType, Deck } from '../../types/DataTypes';
import { CompendiumCreationRequest, DeckCreationRequest } from '../../types/RequestTypes';
import { getDefaultSettings } from '../../constants/DefaultValues';
import { TestFormat,QueryType, SessionSettings } from '../../types/SettingTypes';
import { createIndexArray } from '../BasicParts/BasicFunctions';

import CardStack from '../Cards/CardStack';
import BackButton from '../BasicParts/Buttons/BackButton';
import SessionSettingsDisplay from '../Cards/SessionSettingsDisplay';
import SessionPage from './SessionPage';
import { prepareCompendium, prepareDeck } from '../../services/compendiumHandler';
import { requestCompendiumCreation, requestDeckCreation } from '../../router/resources/Writer';
interface DeckSetPageProps {
    thisDeck: Deck;
    returnToParent: () => void;
    moveToCompendium: (curCompendium:Compendium,nextCompendium:Compendium | undefined,isDown:boolean ) => void;
}

const DeckPage = (props: DeckSetPageProps) => {
    const [sessionSettings, setSessionSettings] = useState<SessionSettings>(getDefaultSettings(props.thisDeck));
    const [sessionRunning, setSessionRunning] = useState<boolean>(false);
    const [indexArray, setIndexArray] = useState<number[]>([]);
    let deck = props.thisDeck;
    
    const returnToCollectionBrowser = () => {
        console.log("Returning to Collection Browser");
        setSessionRunning(false);
        props.returnToParent();
    }
    const handleChangeTestFormat = (newCategory: string) => {
        console.log("Changing Test Format to: ", newCategory);
        setSessionSettings({...sessionSettings, testFormat: TestFormat[newCategory as keyof typeof TestFormat]});
        console.log("New Session Settings: ", { ...sessionSettings, testFormat: TestFormat[newCategory as keyof typeof TestFormat] });
    }
    const handleChangeQueryType = (newCategory: string) => {
        console.log("Changing Query Type to: ", newCategory);
        setSessionSettings({ ...sessionSettings, queryType: QueryType[newCategory as keyof typeof QueryType] });
        console.log("New Session Settings: ", { ...sessionSettings, queryType: QueryType[newCategory as keyof typeof QueryType] });

    }
    const handleChangeTestLen = (newLen: number) => {
        setSessionSettings({ ...sessionSettings, testLen: newLen });
    }
    const handleChangeLowerBound = (newBound: number) => {
        setSessionSettings({ ...sessionSettings, lowerBound: newBound });
    }
    const handleChangeUpperBound = (newBound: number) => {
        setSessionSettings({ ...sessionSettings, upperBound: newBound });
    }
    const startSession = () => {
        console.log("Starting Session with Settings: ", sessionSettings);
        setSessionRunning(true);
        setIndexArray(createIndexArray(sessionSettings.testLen, sessionSettings.lowerBound, sessionSettings.upperBound, sessionSettings.testFormat))
    }
    const terminateSession= (correctArray:boolean[], memorizeErrors:boolean) => {
        setSessionRunning(false);
        
        if (memorizeErrors && correctArray.includes(false) && deck.parent !== undefined && deck.parent.type === CompendiumType.CardSet){
            let numErrorDecks = deck.compendium.length; 
            let corrigendi: Deck = { name: deck.name + `のC${numErrorDecks+1}`, type:CompendiumType.Deck,compendium:[], cards:[]}; 
            for (let i = 0; i < correctArray.length; i++){
                if (!correctArray[i]){
                    corrigendi.cards.push(deck.cards[indexArray[i]]);
                }
            }
            deck.compendium.push(corrigendi);
            let request: DeckCreationRequest = prepareDeck(deck);
            console.log("Request to Create Compendium: ", request);
            requestDeckCreation(request).then((response) => {
                console.log("Response from Compendium Creation: ", response)
            });
        }
        


    }
    const moveToDeck = (curDeck: Deck, nextDeck: Deck | undefined, isDown: boolean) => {
        //This wrapper is useless at the moment, but it might be useful later
        if (nextDeck !== undefined) {
            setSessionSettings(getDefaultSettings(nextDeck));
        }
        props.moveToCompendium(curDeck, nextDeck, isDown);
    }
    

    return (
        <>
            <BackButton onClick={() => returnToCollectionBrowser()} />
            {!sessionRunning && 
            <div className='flex flex-row gap-20 justify-center m-10'>
                    <div className='flex flex-col z-10 '>
                        <p className='font-bold text-2xl '>{props.thisDeck.name}</p>
                        <CardStack thisDeck={props.thisDeck} />
                    </div>
                    <div className='flex items-center flex-col gap-5'>
                        <p className='font-bold text-2xl '>Start a Study Session</p>
                        <div className=' border-2 rounded-lg pl-20 pr-20 pb-3 pt-1'>
                            <p className='font-bold text-xl '>Settings</p>
                            <SessionSettingsDisplay currentSettings={sessionSettings} deck={props.thisDeck}
                                handleChangeTestFormat={handleChangeTestFormat}
                                handleChangeQueryType={handleChangeQueryType}
                                handleChangeTestLen={handleChangeTestLen}
                                handleChangeLowerBound={handleChangeLowerBound}
                                handleChangeUpperBound={handleChangeUpperBound}
                                startSession={startSession} />
                        </div>
                    </div>
                    {deck.compendium.length > 0 && 
                    <div className='flex flex-col gap-5'>
                        <p className='font-bold text-2xl '>Corrigendi</p>
                        <div className='flex flex-col gap-2 items-center'>
                        {props.thisDeck.compendium.map((subDeck: Compendium, index: number,) => {
                            if (subDeck.type !== CompendiumType.Deck){
                                return <></>;
                            }
                            return (
                                <button key={index.toString() + subDeck.name} className={"w-20 h-20 border-2 border-black rounded-lg hover:bg-gray-500 hover:border-white hover:text-slate-100"}
                                    onClick={() => moveToDeck(props.thisDeck, subDeck as Deck, true)}>
                                    {subDeck.name}
                                </button>
                            )
                        }
                        )}
                        </div>
                    </div>}
            </div>}
            {sessionRunning &&
            <div className='flex flex-row m-10 justify-center'>
                <SessionPage deck={props.thisDeck} indexArray={indexArray} settings={sessionSettings} terminateSession={terminateSession}/>
            </div>    
            }
        </>
        
    );
}

export default DeckPage;