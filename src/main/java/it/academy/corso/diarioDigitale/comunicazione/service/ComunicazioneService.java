package it.academy.corso.diarioDigitale.comunicazione.service;

import it.academy.corso.diarioDigitale.comunicazione.DTO.ComunicazioneDTO;

import java.util.List;

public interface ComunicazioneService {
    List<ComunicazioneDTO> findAll();
    ComunicazioneDTO findByUuid(String uuid);
    ComunicazioneDTO save(ComunicazioneDTO comunicazione);
    void deleteByUuid(String uuid);
}
