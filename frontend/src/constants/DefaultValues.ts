import {TestFormat,QueryType,SessionSettings} from "../types/SettingTypes";

export const DEFAULT_STUDY_SETTINGS: SessionSettings = {
    testFormat: TestFormat.Random,
    queryType: QueryType.EnglishToNihongo,
    testLen: 1,
    lowerBound: 0,
    upperBound: 1,
}