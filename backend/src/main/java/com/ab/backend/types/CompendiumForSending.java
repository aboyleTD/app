package com.ab.backend.types;
import java.util.ArrayList;

public class CompendiumForSending {
    String name;
    CompendiumType type;
    ArrayList<Compendium> compendium;
    
    public CompendiumForSending(String name, ArrayList<Compendium> compendium, CompendiumType type) {
        this.name = name;
        this.compendium = compendium;
        this.type = type;
    }
    
}
