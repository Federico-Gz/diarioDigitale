package it.academy.corso.diarioDigitale.materia.controller;

import it.academy.corso.diarioDigitale.materia.dto.MateriaDTO;
import it.academy.corso.diarioDigitale.materia.service.MateriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/materie")
public class MateriaController {
    private final MateriaService materiaService;

    @GetMapping
    public List<MateriaDTO> findAll(){
        return materiaService.findAll();
    }
    @GetMapping("/{uuid}")
    public MateriaDTO findById(@PathVariable String uuid){
        return materiaService.findByUuid(uuid);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MateriaDTO save(@RequestBody MateriaDTO materia){
        materia.setUuid(UUID.randomUUID().toString());
        return materiaService.save(materia);
    }

    @DeleteMapping("/{uuid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable String uuid){
        materiaService.deleteByUuid(uuid);
    }
}