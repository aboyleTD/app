import { useState } from 'react';
import { Deck } from '../../types/DataTypes';
import { DEFAULT_STUDY_SETTINGS } from '../../constants/DefaultValues';
import { TestFormat,QueryType, SessionSettings } from '../../types/SettingTypes';
import CardStack from '../Cards/CardStack';
import CardStackV2 from '../Cards/CardStackV2';
import BackButton from '../BasicParts/Buttons/BackButton';
import SessionSettingsDisplay from '../Cards/SessionSettingsDisplay';
interface DeckSetPageProps {
    thisDeck: Deck;
    returnToParent: () => void;
}

const DeckPage = (props: DeckSetPageProps) => {

    const [sessionSettings,setSessionSettings] = useState<SessionSettings>(DEFAULT_STUDY_SETTINGS);
    const [sessionStarted, setSessionStarted] = useState<boolean>(false);
    const returnToCollectionBrowser = () => {
        console.log("Returning to Collection Browser");
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
    

    return (
        <div className='flex flex-row m-10'>
            {!sessionStarted && 
                <div className='flex flex-col   z-10 border-2 rounded-lg'>
                    <p className='font-bold text-2xl '>Deck: {props.thisDeck.name}</p>
                    <CardStackV2 thisDeck={props.thisDeck} />
                </div>}
            
            <BackButton onClick={() => returnToCollectionBrowser()} />
            
            {!sessionStarted && 
                <div className='flex items-center flex-col gap-5 self-stetch grow border-2 rounded-lg '>
                    <p className='font-bold text-2xl  self-center'>Session Settings</p>
                    <SessionSettingsDisplay currentSettings={sessionSettings} deck={props.thisDeck}
                        handleChangeTestFormat={handleChangeTestFormat} 
                        handleChangeQueryType={handleChangeQueryType} 
                        handleChangeTestLen={handleChangeTestLen}/>
                </div>}
            
        </div>
    );
}

export default DeckPage;