package com.ab.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ab.backend.types.BasicResponse;
import com.ab.backend.types.Compendium;
import com.ab.backend.types.CompendiumCreationRequest;
import com.ab.backend.types.DeckCreationRequest;
import com.ab.backend.services.WriteData;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class PostController {

    @PostMapping(path = "/create/compendium", produces = "application/json")
    public ResponseEntity<BasicResponse> createCompendium(@RequestBody CompendiumCreationRequest request) {
        System.out.println("Post /create received compendium: " + request.getCompendium().getName());
        WriteData.createCompendium(request);
        BasicResponse response = new BasicResponse();
        response.setMessage("Created Compendium: " + request.getCompendium().getName());
        ResponseEntity<BasicResponse> responseEntity = new ResponseEntity<BasicResponse>(response, HttpStatus.OK);
        System.out.println(responseEntity.toString());
        return responseEntity;
    }
    
    @PostMapping(path = "/create/deck", produces = "application/json")
    public ResponseEntity<BasicResponse> createDeck(@RequestBody DeckCreationRequest request) {
        System.out.println("Post /create/deck");
        System.out.println("Received deck: " + request.getDeck().getName() + " at path: " + request.getPathToDeck());
        WriteData.createDeck(request);
        BasicResponse response = new BasicResponse();
        response.setMessage("Created Compendium: " + request.getDeck().getName());
        ResponseEntity<BasicResponse> responseEntity = new ResponseEntity<BasicResponse>(response, HttpStatus.OK);
        System.out.println(responseEntity.toString());
        return responseEntity;
    }

}