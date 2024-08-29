import { Card, Deck, CardSet, Collection, Compendium, CompendiumType } from '../../../types/DataTypes';


export const dummyCard1 : Card = {
    word : "模擬",
    reading : "もぎ",
    translations : new Set(["dummy", "mock"]),
    extendedReadings : [new Set(["dummy1"]), new Set(["dummy2"])],
    examples : ["これは模擬カードである。"]
}
export const dummyCard2: Card = {
    word: "別模擬",
    reading: "もぎ",
    translations: new Set(["dummy", "mock"]),
    extendedReadings: [new Set(["dummy1"]), new Set(["dummy2"])],
    examples: ["これは模擬カードである。"]
}
export const dummyDeck1 : Deck = {
    name : "歴史",
    type: CompendiumType.Deck,
    cards: [dummyCard1, dummyCard2, dummyCard2, dummyCard1, dummyCard1, dummyCard1, dummyCard2, dummyCard1, dummyCard1, dummyCard1, dummyCard1, dummyCard1, dummyCard1, dummyCard1, dummyCard1, dummyCard1, dummyCard1, dummyCard1, dummyCard1, dummyCard1],
    compendium : []
}
export const dummyDeck2 : Deck = {
    name : "名詞",
    type: CompendiumType.Deck,
    cards: [dummyCard1],
    compendium: [dummyDeck1]
}
export const dummyCardSet1 : CardSet = {
    name : "語彙",
    type: CompendiumType.CardSet,
    compendium : [dummyDeck1, dummyDeck2]
}
export const dummyCollection1 : Collection = {
    name : "N1",
    type : CompendiumType.Collection,
    compendium : [dummyCardSet1]
}

export const dummyCompendium: Compendium = {
    name: "Compendium",
    type: CompendiumType.Top,
    compendium: [dummyCollection1, dummyCollection1, dummyCollection1, dummyCollection1]
}

