export interface Card{
    word : string;
    reading : string; 
    translations : Set<string>;
    extendedReadings : [Set<string>, Set<string>]; // [onyomi, kunyomi]
    examples : Array<String>;

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

