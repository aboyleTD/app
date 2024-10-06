import { jsonIgnoreReplacer, jsonIgnore } from 'json-ignore';
export interface Card{
    term : string;
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
    parent?: Compendium; //Unique to frontend
    compendium: Array<Compendium>;

}
export interface Deck extends Compendium {
    cards : Array<Card>;
}

export interface CardSet extends Compendium {
}
export interface Collection extends Compendium {
}
export interface OrphanedCompendium {
    name: string;
    type: CompendiumType;
    //Doesn't have parent to make it easier to serialize
    compendium: Array<OrphanedCompendium>;
}
export interface OrphanedDeck extends OrphanedCompendium {
    cards: Array<Card>;
}
export type TitledText = [string,string];

