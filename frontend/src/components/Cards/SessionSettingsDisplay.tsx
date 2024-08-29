import { EnumDisplay, TestFormat, QueryType, SessionSettings } from "../../types/SettingTypes";
import { Deck } from "../../types/DataTypes"; 
import RadialSelector from "../BasicParts/Settings/RadialSelector";
import NumberSlider from "../BasicParts/Settings/NumberSlider";
import WithLabel from "../BasicParts/Settings/WithLabel";
import Button from "../BasicParts/Buttons/BaseButton";

interface SessionSettingsProps {
    currentSettings: SessionSettings;
    deck: Deck;
    handleChangeTestFormat: (newCategory: string) => void;
    handleChangeQueryType: (newCategory: string) => void;
    handleChangeTestLen: (newSetting: number) => void;
    handleChangeLowerBound: (newSetting: number) => void;
    handleChangeUpperBound: (newSetting: number) => void;
    startSession: () => void;
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
            <WithLabel label="Test Format">
                <RadialSelector 
                    radioID="testFormatRadio"
                    currentCategory={props.currentSettings.testFormat}
                    onChange={props.handleChangeTestFormat}
                    categories={getEnumOptions(TestFormat)}
                />
            </WithLabel>
            <WithLabel label="Query Type">
                <RadialSelector 
                    radioID="queryTypeRadio"
                    currentCategory={props.currentSettings.queryType}
                    onChange={props.handleChangeQueryType}
                    categories={getEnumOptions(QueryType)}
                />
            </WithLabel>
            <WithLabel label="Test Length">
            <NumberSlider 
                value ={props.currentSettings.testLen}
                onChange={props.handleChangeTestLen}
                minValue={1}
                maxValue={len}
                isInteger={true}
                size="big"
            />
            </WithLabel>
            <WithLabel label="Card Range Lower Bound">
                <NumberSlider
                    value={props.currentSettings.lowerBound}
                    onChange={props.handleChangeLowerBound}
                    minValue={1}
                    maxValue={len-1}
                    isInteger={true}
                />
            </WithLabel>
            <WithLabel label="Card Range Upperbound">
                <NumberSlider
                    value={props.currentSettings.upperBound}
                    onChange={props.handleChangeUpperBound}
                    minValue={2}
                    maxValue={len}
                    isInteger={true}
                />
            </WithLabel>
            <Button order={1} pos={3} onClick={props.startSession} >
                Start Session
            </Button>


        </div>
    );
}
export default SessionSettingsDisplay;