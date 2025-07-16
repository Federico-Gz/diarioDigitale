package it.academy.corso.diarioDigitale.messaggio.service;

import java.util.List;

import it.academy.corso.diarioDigitale.messaggio.dto.MessaggioDTO;

public interface MessaggioService {

    MessaggioDTO save(MessaggioDTO messaggioDto);
    List<MessaggioDTO> findAll();
    List<MessaggioDTO> findAllByStudenteUuid(String uuid);
    List<MessaggioDTO> findAllByDocenteUuid(String uuid);   
    
}
