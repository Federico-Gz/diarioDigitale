package it.academy.corso.diarioDigitale.comunicazione.controller;

import it.academy.corso.diarioDigitale.comunicazione.DTO.ComunicazioneDTO;
import it.academy.corso.diarioDigitale.comunicazione.service.ComunicazioneService;
import it.academy.corso.diarioDigitale.user.model.User;
import it.academy.corso.diarioDigitale.user.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/comunicazioni")
public class ComunicazioneController {

    private final ComunicazioneService comunicazioneService;
    private final UserRepository userRepository;

    @GetMapping
    public List<ComunicazioneDTO> findAll(){
        return comunicazioneService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ComunicazioneDTO save (@RequestBody ComunicazioneDTO comunicazione){
        comunicazione.setUuid(UUID.randomUUID().toString());
        return comunicazioneService.save(comunicazione);
    }

    @DeleteMapping("/{uuid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable String uuid){
        comunicazioneService.deleteByUuid(uuid);
    }

    @PostMapping("/generale")
    @ResponseStatus(HttpStatus.CREATED)
    public void inviaComunicazioneGenerale(@Valid @RequestBody ComunicazioneDTO dto) {
        User docente = userRepository.findByUuid(dto.getDocenteUuid())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Docente non trovato"));

        comunicazioneService.inviaAGliStudenti(docente, dto.getTesto());
    }


}
