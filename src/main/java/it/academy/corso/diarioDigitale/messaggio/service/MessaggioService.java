package it.academy.corso.diarioDigitale.messaggio.service;

import java.util.List;

import it.academy.corso.diarioDigitale.messaggio.dto.MessaggioDto;

public interface MessaggioService {

    MessaggioDto creaMessaggio(MessaggioDto messaggioDto);
    List<MessaggioDto> getAllMessaggi();
    MessaggioDto getMessaggioById(Long idMessaggio);
    
}
