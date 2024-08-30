export enum TestFormat{
    Random = "Random",
    Sequential = "Sequential",
}
export enum QueryType{
    Forward = "Forward",
    Backward = "Backward",
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