package com.ab.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.ab.backend.types.Compendium;
import com.ab.backend.services.LoadData;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class GetController {

    @GetMapping(path = "/collections", produces = "application/json")
    public ResponseEntity<Compendium> index() {
        System.out.println("GET /collections commence");
        Compendium usersCollections = LoadData.loadData();
        Compendium responseCompendium = new Compendium();
        ResponseEntity<Compendium> responseEntity = new ResponseEntity<Compendium>(usersCollections, HttpStatus.OK);
        System.out.println(responseEntity.toString());
        return responseEntity;
    }

}