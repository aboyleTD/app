import { useState } from 'react';
import { Deck } from '../../types/DataTypes';
import { DEFAULT_STUDY_SETTINGS } from '../../constants/DefaultValues';
import { TestFormat,QueryType, SessionSettings } from '../../types/SettingTypes';
import CardStack from '../Cards/CardStack';
import BackButton from '../BasicParts/Buttons/BackButton';
import SessionSettingsDisplay from '../Cards/SessionSettingsDisplay';
import SessionPage from './SessionPage';
interface DeckSetPageProps {
    thisDeck: Deck;
    returnToParent: () => void;
}

const DeckPage = (props: DeckSetPageProps) => {

    const [sessionSettings,setSessionSettings] = useState<SessionSettings>(DEFAULT_STUDY_SETTINGS);
    const [sessionRunning, setSessionRunning] = useState<boolean>(false);
    
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
    const handleChangeLowerBound = (newBound: number) => {
        setSessionSettings({ ...sessionSettings, lowerBound: newBound });
    }
    const handleChangeUpperBound = (newBound: number) => {
        setSessionSettings({ ...sessionSettings, upperBound: newBound });
    }
    const startSession = () => {
        console.log("Starting Session with Settings: ", sessionSettings);
        setSessionRunning(true);
    }
    const terminateSession= () => {
        setSessionRunning(false);
    }
    

    return (
        <>
            <BackButton onClick={() => returnToCollectionBrowser()} />
            {!sessionRunning && 
            <div className='flex flex-row justify-center m-10'>
                    <div className='flex flex-col ml-32  z-10 '>
                        <p className='font-bold text-2xl '>{props.thisDeck.name}</p>
                        <CardStack thisDeck={props.thisDeck} />
                    </div>
                    <div className='flex items-center flex-col gap-5 self-stetch grow'>
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
            </div>}
            {sessionRunning &&
            <div className='flex flex-row m-10 justify-center'>
                <SessionPage deck={props.thisDeck} settings={sessionSettings} terminateSession={terminateSession}/>
            </div>    
            }
        </>
        
    );
}

export default DeckPage;