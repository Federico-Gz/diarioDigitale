package it.academy.corso.diarioDigitale.voto.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import it.academy.corso.diarioDigitale.voto.DTO.VotoDTO;
import it.academy.corso.diarioDigitale.voto.service.VotoService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/voti")

public class VotoController {
    
    private final VotoService votoService;


    //aggiungere un voto
    @PostMapping
    public VotoDTO salvaVoto(@RequestBody VotoDTO votoDTO){
        return votoService.salvaVoto(votoDTO);
    }


    //vedere tutti i voti di uno studente 
    @GetMapping("/studente/{uuidStudente}")
    public List<VotoDTO> getVotiStudente(@PathVariable("uuidStudente") String uuidStudente){
        return votoService.findByStudenteUuid(uuidStudente);
    }

    //vedere tutti i voti asseganti (docente)
    @GetMapping("/docente/{uuidDocente}")
    public List<VotoDTO> getVotiDocente(@PathVariable("uuidDocente") String uuidDocente){
        return votoService.findByDocenteUuid(uuidDocente);
    }
    //vedere tutti i voti di una materia specifica (STUDENTE)
   /*  @GetMapping("/studenti/voti/{idMateria}")
    public List<VotoDTO> getVotiMateria(@PathVariable Materia idMateria){
        return votoService.getVotiByMateria(idMateria);
    }*/

    
}
