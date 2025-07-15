package it.academy.corso.diarioDigitale.voto.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.academy.corso.diarioDigitale.materia.model.Materia;
import it.academy.corso.diarioDigitale.user.model.User;
import it.academy.corso.diarioDigitale.voto.DTO.VotoDTO;
import it.academy.corso.diarioDigitale.voto.service.VotoService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1")

public class VotoController {
    
    private final VotoService votoService;


    //aggiungere un voto

    @PostMapping("/voti")
    public VotoDTO salvaVoto(@RequestBody VotoDTO votoDTO){
        return votoService.salvaVoto(votoDTO, votoDTO.getStudenteId(), votoDTO.getMateriaId());
    }

    //vedere tutti i voti (DOCENTE)

    @GetMapping("/professori/voti")
    public List <VotoDTO> getAllVoti(){
        return votoService.getAllVoti();
    }

    //vedere tutti i voti dello studente

    @GetMapping("/studenti/voti")
    public List<VotoDTO> getAllVotiStudente(){
        return votoService.getAllVoti();
    }

    //vedere tutti i voti di uno studente 
    @GetMapping("/professori/voti/{idStudente}")
    public List<VotoDTO> getVotiStudente(@PathVariable User idStudente){
        return votoService.getVotiByStudente(idStudente);
    }

    //vedere tutti i voti di una materia specifica (STUDENTE)
    @GetMapping("/studenti/voti/{idMateria}")
    public List<VotoDTO> getVotiMateria(@PathVariable Materia idMateria){
        return votoService.getVotiByMateria(idMateria);
    }

    
}
