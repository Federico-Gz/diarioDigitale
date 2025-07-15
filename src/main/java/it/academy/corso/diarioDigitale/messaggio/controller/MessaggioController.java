package it.academy.corso.diarioDigitale.messaggio.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.academy.corso.diarioDigitale.messaggio.dto.MessaggioDto;
import it.academy.corso.diarioDigitale.messaggio.service.MessaggioService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/messaggi")
@RequiredArgsConstructor

public class MessaggioController {

    private final MessaggioService messaggioService;

    //crea un messaggio
    @PostMapping
    public MessaggioDto creaMessaggio(@RequestBody MessaggioDto messaggioDto){
        return messaggioService.creaMessaggio(messaggioDto);
    }

    //visualizza messaggi
    @GetMapping
    public List<MessaggioDto> getAllMessaggi(){
        return messaggioService.getAllMessaggi();
    }

    //visualizza dettaglio messaggio
    @GetMapping("/{idMessaggio}")
    public MessaggioDto getMessaggioById(@PathVariable("id_messaggio") Long idMessaggio){
        return messaggioService.getMessaggioById(idMessaggio);
    }
 }
