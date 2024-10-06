package com.ab.backend.types;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Array;
import java.util.ArrayList;

public class Card {
    @JsonProperty("term")
    String term;
    @JsonProperty("reading")
    String reading;
    @JsonProperty("translations")
    ArrayList<String> translations;
    @JsonProperty("extendedReadings")
    ArrayList<ArrayList<String>> extendedReadings; // [0] = onyomi, [1] = kunyomi
    @JsonProperty("examples")
    ArrayList<String> examples;

    public Card(String term, String reading, ArrayList<String> translations, 
            ArrayList<ArrayList<String>> extendedReadings, ArrayList<String> examples) {
        this.term = term;
        this.reading = reading;
        this.translations = translations;
        this.extendedReadings = extendedReadings;
        this.examples = examples;
    }
    public Card(){
        term = "";
        reading = "";
        translations = new ArrayList<String>();
        extendedReadings = new ArrayList<ArrayList<String>>();
        examples = new ArrayList<String>();
        // System.out.println("Creating new card");
    }
    public String getTerm(){
        return this.term;
    }
    public void setTerm(String term){
        this.term = term;
    }
    public String getReading(){
        return this.reading;
    }
    public void setReading(String reading){
        this.reading = reading;
    }
    public ArrayList<String> getTranslations(){
        return this.translations;
    }
    public void setTranslations(ArrayList<String> translations){
        this.translations = translations;
    }
    public ArrayList<ArrayList<String>> getExtendedReadings(){
        return this.extendedReadings;
    }
    public void setExtendedReadings(ArrayList<ArrayList<String>> extendedReadings){
        this.extendedReadings = extendedReadings;
    }
    public ArrayList<String> getExamples(){
        return this.examples;
    }
    public void setExamples(ArrayList<String> examples){
        this.examples = examples;
    }

}


