import { useState } from 'react';
import { Compendium, CompendiumType, Deck} from '../../types/DataTypes';
import { dummyCompendium } from '../BasicParts/Mocks/MockData';
import { FaPlus } from "react-icons/fa6";
import BackButton from '../BasicParts/Buttons/BackButton';
import DeckPage from './DeckPage';
import { useNavigate } from 'react-router-dom';

const CompendiumPage = () => {
    const navigate = useNavigate();
    const [curCompendium, setCurCompendium] = useState<Compendium>(dummyCompendium);
    let isTop = curCompendium.type === CompendiumType.Top;
    let isCollection = curCompendium.type === CompendiumType.Collection;
    let isCardSet = curCompendium.type === CompendiumType.CardSet;
    let isDeck = curCompendium.type === CompendiumType.Deck;
    const header = isTop ? "Card Collections" : CompendiumType[curCompendium.type] + ": " + curCompendium.name;

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

    
    return (<>
        {
            isDeck && <DeckPage thisDeck={curCompendium as Deck} returnToParent={returnToParent}/>
        }
        {!isDeck && <div className="flex flex-col justiy-center items-center">
            <div className="flex flex-row mt-5">
                {!isTop &&
                    <BackButton onClick={() => moveToCompedium(curCompendium, curCompendium.parent, false)} />
                }
                <p className='font-bold text-2xl'>{header}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-x-5 gap-y-5 columns-3 ml-5 mt-20 mb-10 overflow-y-scroll">
                {curCompendium.compendium.map((compendium: Compendium, index: number,) => {
                    return (
                        <button key={index.toString()+compendium.name} className='font-normal text-xl bg-inherit border-black border-2 rounded-lg hover:bg-gray-500 hover:border-white hover:text-slate-100 w-44 h-44'
                            onClick={() => moveToCompedium(curCompendium,compendium, true)}>
                            {compendium.name}
                        </button>
                    )
                }
                )}
                <div className="flex items-center justify-center">
                    <button className='flex items-center justify-center font-normal text-xl bg-inherit border-black border-2 rounded-lg hover:bg-gray-500 hover:border-white hover:text-slate-100 w-44 h-44'
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