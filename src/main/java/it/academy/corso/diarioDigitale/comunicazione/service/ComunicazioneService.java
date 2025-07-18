package it.academy.corso.diarioDigitale.comunicazione.service;

import it.academy.corso.diarioDigitale.comunicazione.DTO.ComunicazioneDTO;
import it.academy.corso.diarioDigitale.user.model.User;

import java.util.List;

public interface ComunicazioneService {
    List<ComunicazioneDTO> findAll();
    ComunicazioneDTO findByUuid(String uuid);
    ComunicazioneDTO save(ComunicazioneDTO comunicazione);
    void deleteByUuid(String uuid);
    void deleteByDocenteUuidAndTesto(String uuidDocente, String testo);
    void inviaAGliStudenti(User docente, String testo);
    List<ComunicazioneDTO> findAllDistinctByDocente(String docenteUuid);
    List<ComunicazioneDTO> findAllByDocenteUuid(String docenteUuid);
}
