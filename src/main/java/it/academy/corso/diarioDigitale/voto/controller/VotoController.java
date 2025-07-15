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

    @PostMapping
    public VotoDTO salvaVoto(@RequestBody VotoDTO votoDTO, @PathVariable Long idStudente, @PathVariable Long idMateria){

        return votoService.salvaVoto(votoDTO, idStudente, idMateria);
    }

    @GetMapping

    public List<VotoDTO> getVotiStudente(@PathVariable Long idStuente){
        return votoService.getVotiByStudente(idStuente);
    }
}
