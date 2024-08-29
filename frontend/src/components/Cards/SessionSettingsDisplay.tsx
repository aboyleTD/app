import CategoricalSlider from "../BasicParts/Settings/CategoricalSlider";
import DropDownSelect from "../BasicParts/Settings/DropDownSelect";
import NumberSlider from "./NumberSlider";
import RadialSelector from "../BasicParts/Settings/RadialSelector";
import {EnumDisplay, TestFormat, QueryType, SessionSettings } from "../../types/SettingTypes";
import { Deck } from "../../types/DataTypes";

interface SessionSettingsProps {
    currentSettings: SessionSettings;
    deck: Deck;
    handleChangeTestFormat: (newCategory: string) => void;
    handleChangeQueryType: (newCategory: string) => void;
    handleChangeTestLen: (newSetting: number) => void;
}
// --- Enums ---
const getEnumOptions = (enumClass: any): Array<EnumDisplay> => {
    let options: Array<EnumDisplay> = [];

    for (let enumCase of Object.keys(enumClass)) {
        let lowerName = enumCase.toLowerCase();
        options.push({
            key: enumCase,
            value: lowerName.charAt(0).toUpperCase() + lowerName.slice(1),
        });
    }

    return options;
};
const SessionSettingsDisplay = (props:SessionSettingsProps) => {
    const len = props.deck.cards.length;

    return (
        <div className="flex flex-col items-start">
            <RadialSelector 
                currentCategory={props.currentSettings.testFormat}
                onChange={props.handleChangeTestFormat}
                categories={getEnumOptions(TestFormat)}
            />
            <RadialSelector 
                currentCategory={props.currentSettings.queryType}
                onChange={props.handleChangeQueryType}
                categories={getEnumOptions(QueryType)}
            />
            <NumberSlider 
                currentValue ={props.currentSettings.testLen}
                onChange={props.handleChangeTestLen}
                minValue={1}
                maxValue={len}
                isInteger={true}
            />


        </div>
    );
}
export default SessionSettingsDisplay;