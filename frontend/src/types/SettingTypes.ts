export enum TestFormat{
    Random = "Random",
    Sequential = "Sequential",
}
export enum QueryType{
    EnglishToNihongo = "EnglishToNihongo",
    NihongoToEnglish = "NihongoToEnglish",
    Kanji = "Kanji",
}
export interface EnumDisplay {
    key: string;
    value: string;
}
export interface SessionSettings {
    testFormat: TestFormat;
    queryType: QueryType;
    testLen: number;
    lowerBound: number;
    upperBound: number;

}