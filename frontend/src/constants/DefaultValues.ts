import { Deck } from "../types/DataTypes";
import {TestFormat,QueryType,SessionSettings} from "../types/SettingTypes";

export const DEFAULT_STUDY_SETTINGS: SessionSettings = {
    testFormat: TestFormat.Random,
    queryType: QueryType.Forward,
    testLen: 1,
    lowerBound: 0,
    upperBound: 1,
}
export const getDefaultSettings = (deck:Deck) => {
    let basicSettings = DEFAULT_STUDY_SETTINGS;
    basicSettings.upperBound = deck.cards.length;
    return basicSettings
}