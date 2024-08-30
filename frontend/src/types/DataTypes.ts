export interface Card{
    word : string;
    reading : string; 
    translations : string[];
    extendedReadings: [string[], string[]]; // [onyomi, kunyomi]
    examples: string[];

}

export enum CompendiumType {
    Deck = "Deck",
    CardSet = "CardSet",
    Collection = "Collection",
    Top = "Top"
}
export interface Compendium {
    name: string;
    type: CompendiumType;
    parent?: Compendium;
    compendium: Array<Compendium>;

}
export interface Deck extends Compendium {
    cards : Array<Card>;
}
export interface CardSet extends Compendium {
}
export interface Collection extends Compendium {
}
export type TitledText = [string,string];

