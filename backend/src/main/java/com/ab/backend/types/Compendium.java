package com.ab.backend.types;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonProperty;



public class Compendium {
    @JsonProperty("name")
    String name;
    @JsonProperty("type")
    CompendiumType type;
    @JsonProperty("compendium")
    ArrayList<Compendium> compendium;

    public Compendium(String name, ArrayList<Compendium> compendium, CompendiumType type) {
        this.name = name;
        this.compendium = compendium;
        this.type = type;
    }
    public Compendium(){
        this.name = "";
        this.compendium = new ArrayList<Compendium>();
        this.type = CompendiumType.INVALID;
    }
    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name = name;
    }
    public CompendiumType getType(){
        return this.type;
    }
    public void setType(CompendiumType type){
        this.type = type;
    }
    public ArrayList<Compendium> getCompendium(){
        return this.compendium;
    }
    public void setCompendium(ArrayList<Compendium> compendium){
        this.compendium = compendium;
    }

    public static CompendiumType depthToType(int depth) {
        switch (depth) {
            case 0:
                return CompendiumType.Top;
            case 1:
                return CompendiumType.Collection;
            case 2:
                return CompendiumType.CardSet;
            case 3:
                return CompendiumType.Deck;
            default:
                return CompendiumType.INVALID;
        }
    }
}