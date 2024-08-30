package com.ab.backend.types;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Card {
    @JsonProperty("term")
    String term;
    @JsonProperty("reading")
    String reading;
    @JsonProperty("translations")
    String[] translations;
    @JsonProperty("extendedReadings")
    String[][] extendedReadings; // [0] = onyomi, [1] = kunyomi
    @JsonProperty("examples")
    String[] examples;

    public Card(String term, String reading, String[] translations, String[][] extendedReadings, String[] examples) {
        this.term = term;
        this.reading = reading;
        this.translations = translations;
        this.extendedReadings = extendedReadings;
        this.examples = examples;
    }
    public Card(){
        term = "";
        reading = "";
        translations = new String[0];
        extendedReadings = new String[0][0];
        examples = new String[0];
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
    public String[] getTranslations(){
        return this.translations;
    }
    public void setTranslations(String[] translations){
        this.translations = translations;
    }
    public String[][] getExtendedReadings(){
        return this.extendedReadings;
    }
    public void setExtendedReadings(String[][] extendedReadings){
        this.extendedReadings = extendedReadings;
    }
    public String[] getExamples(){
        return this.examples;
    }
    public void setExamples(String[] examples){
        this.examples = examples;
    }

}


