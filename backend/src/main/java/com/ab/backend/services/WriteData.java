package com.ab.backend.services;

import java.util.Arrays;
import java.util.HashSet;

import org.springframework.stereotype.Service;

import com.ab.backend.types.Compendium;
import com.ab.backend.types.CompendiumCreationRequest;
import com.ab.backend.types.CompendiumType;
import com.ab.backend.types.Deck;
import com.ab.backend.types.DeckCreationRequest;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.io.File;
import java.io.IOException;

@Service
public class WriteData {
    static String dataFolderPath = "data/";
    static String[] excludedNames_list = new String[]{"metafiles", ".ds_store", "corrigendi", "duplicates"};
    static HashSet<String> excludedNames = new HashSet<String>(Arrays.asList(excludedNames_list));

    public static void createCompendium(CompendiumCreationRequest request) {
        System.out.println("Creating compendium: " + request.getCompendium().getName());
        String path = request.getPathToCompendium();
        File compendiumDirectory = new File(path);
        if (!compendiumDirectory.exists()) {
            compendiumDirectory.mkdirs();
        }
    }

    public static void createDeck(DeckCreationRequest request) {
        System.out.println("Creating deck: " + request.getDeck().getName());
        String path = request.getPathToDeck();
        Deck deck = request.getDeck();
        System.out.println("Creating deck: " + deck.getName());
        File parentDirectory = new File(path);
        if (!parentDirectory.exists()) {
            parentDirectory.mkdirs();
        }
        ObjectMapper mapper = new ObjectMapper();
        File deckFile = new File(path + "/" + deck.getName() + ".json");
        try {
            mapper.writeValue(deckFile, deck);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Deck subDeck = (Deck)deck.getCompendium().get(0);
        System.out.println("Card in subdeck: " + subDeck.getCards().get(0).getTerm());
            
        
    }
    
}
