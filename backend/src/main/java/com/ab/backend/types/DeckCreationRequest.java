package com.ab.backend.types;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DeckCreationRequest {
    @JsonProperty("deck")
    Deck deck;
    @JsonProperty("pathToDeck")
    String pathToDeck;

    public Deck getDeck() {
        return this.deck;
    }

    public String getPathToDeck() {
        return pathToDeck;
    }

    public void setDeck(Deck deck) {
        this.deck = deck;
    }

    public void setPathToDeck(String pathToDeck) {
        this.pathToDeck = pathToDeck;
    }
}