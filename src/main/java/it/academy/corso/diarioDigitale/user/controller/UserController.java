package it.academy.corso.diarioDigitale.user.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import it.academy.corso.diarioDigitale.user.dto.UserDTO;
import it.academy.corso.diarioDigitale.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")

public class UserController {
    
    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO createUser(@Valid @RequestBody UserDTO userDTO){
        return userService.createUser(userDTO);
    }

    //RICERCA UTENTE PER UUID
    @GetMapping("/{uuid}")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO getUserByUuid(@PathVariable String uuid){
        return userService.getUserByUuid(uuid);
    }


    //LOGIN
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO login(@RequestParam String username, @RequestParam String password){
        UserDTO userDTO = userService.login(username, password);
        if(userDTO == null){
            throw new RuntimeException("Credenziali non valide");
        }
        return userDTO;
    }

    //trova tutti gli user con ruolo = "studente"
    @GetMapping("/studenti")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDTO> getUserByRuoloStudente(){
        return userService.getUserByRuoloStudente("STUDENTE");
    }

    //trova tutti gli user con ruolo = "docente"
    @GetMapping("/docenti")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDTO> getUserByRuoloDocente(){
        return userService.getUserByRuoloStudente("DOCENTE");
    }

}
