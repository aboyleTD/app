import { useState } from 'react';
import { Compendium, CompendiumType, Deck} from '../../types/DataTypes';
import { FaPlus } from "react-icons/fa6";
import BackButton from '../BasicParts/Buttons/BackButton';
import DeckPage from './DeckPage';
interface CompendiumPageProps {
    compendium: Compendium;
}

const CompendiumPage = (props:CompendiumPageProps) => {
    const [curCompendium, setCurCompendium] = useState<Compendium>(props.compendium);
    
    const returnToParent = () => {
        console.log("Returning to Parent");
        setCurCompendium(curCompendium.parent as Compendium);

    }
    const createCompendium = () => {
        console.log("Creating Collection");
    }
    const moveToCompedium = (curCompendium: Compendium,nextCompendium: Compendium | undefined, isDown: boolean) => {
        if (nextCompendium === undefined){
            console.log("No Collection to move to");
            return;
        }
        console.log("Moving to Collection:", nextCompendium.name);
        if (isDown){
            nextCompendium.parent = curCompendium;
        }
        setCurCompendium(nextCompendium);
        if (nextCompendium.type === CompendiumType.Deck){
            console.log("Moving to Deck:", nextCompendium.name);
        }

    }
    const isTop = curCompendium.type === CompendiumType.Top;
    const isCollection = curCompendium.type === CompendiumType.Collection;
    const isCardSet = curCompendium.type === CompendiumType.CardSet;
    const isDeck = curCompendium.type === CompendiumType.Deck;
    const header = isTop ? "Card Collections" : CompendiumType[curCompendium.type] + ": " + curCompendium.name;
    let compendiumBasedStyleWhole:string;
    let compendiumBasedStyleBox: string;
    switch (curCompendium.type){
        //Redundant cases are for finetuning later
        case CompendiumType.Top: 
            compendiumBasedStyleWhole = "grid-cols-3 mt-20 gap-x-5 gap-y-5 ";
            compendiumBasedStyleBox = "w-44 h-44 ";
            break;
        case CompendiumType.Collection:
            compendiumBasedStyleWhole = "grid-cols-3 mt-20 gap-x-5 gap-y-5 ";
            compendiumBasedStyleBox = "w-44 h-44 ";
            break;
        case CompendiumType.CardSet:
            compendiumBasedStyleWhole = "grid-cols-4 mt-16 gap-x-4 gap-y-4 ";
            compendiumBasedStyleBox = "w-32 h-32";
            break;
        default:
            compendiumBasedStyleWhole = "grid-cols-3 mt-20 gap-x-5 gap-y-5 ";
            compendiumBasedStyleBox = "w-44 h-44 ";

    }

    let boxStyle = `${compendiumBasedStyleBox} flex items-center justify-center font-normal text-xl bg-inherit border-black border-2 rounded-lg hover:bg-gray-500 hover:border-white hover:text-slate-100`;
    
    return (<>
        {
            isDeck && <DeckPage thisDeck={curCompendium as Deck} moveToCompendium={moveToCompedium}/>
        }
        {!isDeck && <div className="flex flex-col justiy-center items-center">
            <div className="flex flex-row mt-5">
                
                {!isTop && // The back button for decks is different because need to wrap up the session
                    <BackButton onClick={() => moveToCompedium(curCompendium, curCompendium.parent, false)} />
                }
                <p className='font-bold text-2xl'>{header}</p>
            </div>
            
            <div className={`grid ${compendiumBasedStyleWhole} ml-5  mb-10 overflow-y-scroll`}>
                {curCompendium.compendium.map((compendium: Compendium, index: number,) => {
                    return (
                        <button key={index.toString()+compendium.name} className={boxStyle}
                            onClick={() => moveToCompedium(curCompendium,compendium, true)}>
                            {compendium.name}
                        </button>
                    )
                }
                )}
                <div className="flex items-center justify-center">
                    <button className={boxStyle}
                        onClick={createCompendium}>
                        <FaPlus size={30}/>
                    </button>
                    

                </div>
            </div>
        </div>}
    </>
    );
}

export default CompendiumPage;