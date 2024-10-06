package com.ab.backend.types;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CompendiumCreationRequest {
    @JsonProperty("compendium")
    Compendium compendium;
    @JsonProperty("pathToCompendium")
    String pathToCompendium;

    public Compendium getCompendium() {
        return this.compendium;
    }
    public String getPathToCompendium() {
        return pathToCompendium;
    }
    public void setCompendium(Compendium compendium) {
        this.compendium = compendium;
    }
    public void setPathToCompendium(String pathToCompendium) {
        this.pathToCompendium = pathToCompendium;
    }
}