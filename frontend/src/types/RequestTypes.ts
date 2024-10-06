import { Compendium, Deck, OrphanedCompendium, OrphanedDeck } from "./DataTypes";

export interface CompendiumCreationRequest{
    compendium: OrphanedCompendium;
    pathToCompendium: string;
}
export interface DeckCreationRequest{ 
    deck: OrphanedDeck;
    pathToDeck: string;
}