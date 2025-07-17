package it.academy.corso.diarioDigitale.compito.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.http.HttpStatus;

import it.academy.corso.diarioDigitale.compito.dto.CompitoDTO;
import it.academy.corso.diarioDigitale.compito.service.CompitoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/compiti")
@RequiredArgsConstructor

public class CompitoController {
    
    private final CompitoService compitoService;
    
    //AGGIUNGI COMPITO - SOLO DOCENTE
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CompitoDTO createCompito(@Valid @RequestBody CompitoDTO compitoDTO){
        return compitoService.createCompito(compitoDTO);
    }

    //ELENCO DI TUTTI I COMPITI - ENTRAMBI
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CompitoDTO> getAllCompiti(){
        return compitoService.getAllCompiti();
    }

    //Ottieni un compito per UUID.
    @GetMapping("/{uuid}")
    @ResponseStatus(HttpStatus.OK)
    public CompitoDTO getCompitoByUuid(@PathVariable String uuid) {
        return compitoService.findByUuid(uuid);
    }

    //Elimina un compito per UUID (solo docente)
    @DeleteMapping("/{uuid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCompito(@PathVariable String uuid) {
        compitoService.deleteCompito(uuid);
    }

    // Ottieni compiti per studente
    @GetMapping("/studente/{uuid}")
    @ResponseStatus(HttpStatus.OK)
    public List<CompitoDTO> getCompitiByStudente(@PathVariable String uuid) {
        return compitoService.getCompitiByStudenteUuid(uuid);
    }

    // Ottieni compiti per docente
    @GetMapping("/docente/{uuid}")
    @ResponseStatus(HttpStatus.OK)
    public List<CompitoDTO> getCompitiByDocente(@PathVariable String uuid) {
        return compitoService.getCompitiByDocenteUuid(uuid);
    }

}
