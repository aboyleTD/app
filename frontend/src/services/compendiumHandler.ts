import {Compendium, Deck, OrphanedCompendium, OrphanedDeck} from "../types/DataTypes";
import { CompendiumCreationRequest, DeckCreationRequest } from "../types/RequestTypes";
import * as path from 'path-browserify';

export function getPathToCompendiumUp(Compendium: Compendium): string {

    let pathToCompendium = "";
    let current = Compendium;
    while(current.parent !== undefined) {
        pathToCompendium = path.join(current.name, pathToCompendium) ;
        current = current.parent;
    }

    return pathToCompendium;
}
export function getPathToDeckUp(Deck: Deck): string {

    let pathToDeck = "";
    let current = Deck.parent;
    while(current !== undefined) {
        pathToDeck = path.join(current.name, pathToDeck) ;
        current = current.parent;
    }

    return pathToDeck;
}
export function orphanCompendium(compendium: Compendium): OrphanedCompendium {
    let name = compendium.name;
    let type = compendium.type;
    let orphanedChildren: OrphanedCompendium[]  = [];
    for (let child of compendium.compendium) {
        orphanedChildren.push(orphanCompendium(child));
    }
    return { name: name, type: type, compendium: orphanedChildren };
}

export function prepareCompendium(compendium: Compendium): CompendiumCreationRequest {
    let pathToCompendium = getPathToCompendiumUp(compendium);
    let orphanedCompendium:OrphanedCompendium = {name: compendium.name, type: compendium.type, compendium: compendium.compendium};


    return { compendium: orphanedCompendium, pathToCompendium: pathToCompendium};
}

export function prepareDeck(deck: Deck): DeckCreationRequest {
    let pathToDeck = getPathToDeckUp(deck);
    // let orphanedCompendium:OrphanedCompendium = {name: deck.name, type: deck.type, compendium: deck.compendium};
    deck.parent = undefined;
    let orphanedDeck:OrphanedDeck = {name: deck.name, type: deck.type, cards: deck.cards, compendium: deck.compendium};

    return { deck: orphanedDeck, pathToDeck: pathToDeck};
}