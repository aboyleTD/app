package com.ab.backend;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.ab.backend.basicResponse;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class HelloController {

    
    @GetMapping(path ="/hello", produces = "application/json")
    public ResponseEntity<basicResponse> index() {
        basicResponse response = new basicResponse();
        response.message = "Greetings from the backend!";
        ResponseEntity<basicResponse> responseEntity = new ResponseEntity<basicResponse>(response, HttpStatus.OK);
        System.out.println(responseEntity.toString());
        return responseEntity;
    }

}