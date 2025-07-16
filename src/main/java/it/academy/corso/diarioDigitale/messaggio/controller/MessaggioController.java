package it.academy.corso.diarioDigitale.messaggio.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.academy.corso.diarioDigitale.messaggio.dto.MessaggioDTO;
import it.academy.corso.diarioDigitale.messaggio.service.MessaggioService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/messaggi")
@RequiredArgsConstructor

public class MessaggioController {

    private final MessaggioService messaggioService;

    //crea un messaggio
    @PostMapping
    public MessaggioDTO creaMessaggio(@RequestBody MessaggioDTO messaggioDto){
        
        return messaggioService.save(messaggioDto);
    }

    //visualizza messaggi studente
    @GetMapping("/studente/{uuid}")
    public List<MessaggioDTO> getAllMessaggiStudente(@PathVariable String uuid){
        return messaggioService.findAllByStudenteUuid(uuid);
    }

    //visualizza messaggi docente
    @GetMapping("/docente/{uuid}")
    public List<MessaggioDTO> getMessaggioById(@PathVariable String uuid){
        return messaggioService.findAllByDocenteUuid(uuid);
    }
 }
