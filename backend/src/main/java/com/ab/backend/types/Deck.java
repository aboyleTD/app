package com.ab.backend.types;
import java.io.File;
import java.io.FileNotFoundException;
import java.lang.reflect.Array;
import java.util.Scanner;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;

import java.util.ArrayList;
import java.util.HashMap;

@JsonTypeName("Deck")
public class Deck extends Compendium {
    @JsonProperty("cards")
    ArrayList<Card> cards;

    @JsonIgnore
    HashMap<String,Card> indexedCards;
    public ArrayList<Card> getCards(){
        return this.cards;
    }
    public void setCards(ArrayList<Card> cards){
        this.cards = cards;
    }
    public Deck(File file) throws FileNotFoundException  {
        this.name = file.getName();
        // System.out.println("Loading deck: " + this.name);
        this.type = CompendiumType.Deck;
        Scanner filesc = new Scanner(file);
        String cur;
        String term;
        String reading;
        String[] translations;
        String[] examples;
        String[] on;
        String[] kun;
        String[] parts;
        String[] bodysections;
        String title;
        ArrayList<Card> set = new ArrayList<Card>();
        HashMap<String, Card> membersMap = new HashMap<String, Card>();
        // Read the file
        // int count = 0;
        while (filesc.hasNextLine()) {
            cur = filesc.nextLine();
            parts = cur.split("#");
            //Term
            term = parts[0];
            if (term.equals("Empt.")) {
                term = null;
            } 
            //Readings
            bodysections = parts[1].split("/");
            if (bodysections[0].equals("Empt.")) {
                reading = bodysections[1];
                kun = bodysections[1].split(",");
                on = null;
            } else if (bodysections[1].equals("Empt.")) {
                reading = bodysections[0];
                on = bodysections[0].split(",");
                kun = null;
            } else {
                on = bodysections[0].split(",");
                kun = bodysections[1].split(",");
                reading = null;
            }
            //Translations
            translations = parts[2].split("/");
            //Examples
            examples = null;
            try {
                if (!parts[3].equals("Empt.")) {
                    examples = parts[3].split(",");
                } 
            } catch (java.lang.ArrayIndexOutOfBoundsException e) {
                System.out.println(cur);
            }
            
            title = term == null ? reading : term;
            String[][] extendedReadings = {on, kun};
            ArrayList<String> translations_as_list = new ArrayList<String>();
            for (String translation : translations) {
                translations_as_list.add(translation);
            }
            ArrayList<String> examples_as_list = new ArrayList<String>();
            if (examples != null) {
                for (String example : examples) {
                    examples_as_list.add(example);
                }
            }
            ArrayList<ArrayList<String>> extendedReadings_as_list = new ArrayList<ArrayList<String>>(2);
            ArrayList<String> on_readings = new ArrayList<String>();
            ArrayList<String> kun_readings = new ArrayList<String>();
            if (on != null) {
                for (String on_reading : on){
                    on_readings.add(on_reading);
                }
            }
            if (kun != null) {
                for (String kun_reading : kun){
                    kun_readings.add(kun_reading);
                }
            }
            extendedReadings_as_list.add(on_readings);
            extendedReadings_as_list.add(kun_readings);
            Card nc = new Card(term, reading, translations_as_list, extendedReadings_as_list, examples_as_list);
            membersMap.put(title, nc);
            set.add(nc);
        }

        // Instantiate the object
        this.cards = set;
        this.indexedCards = membersMap;
        // System.out.println("Successfully loaded deck: " + this.name);
        filesc.close();
    }

    public Deck(){
        super();
        this.cards = new ArrayList<Card>();
        this.indexedCards = new HashMap<String, Card>();
        this.type = CompendiumType.Deck;
    }
}
