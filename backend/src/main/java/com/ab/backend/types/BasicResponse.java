package com.ab.backend.types;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BasicResponse {
    @JsonProperty("message")
    String message;
    public String getMessage(){
        return this.message;
    }
    public void setMessage(String message){
        this.message = message;
    }
    
}
