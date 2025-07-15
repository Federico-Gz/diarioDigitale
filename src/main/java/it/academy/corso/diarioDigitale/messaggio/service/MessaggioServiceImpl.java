package it.academy.corso.diarioDigitale.messaggio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import it.academy.corso.diarioDigitale.messaggio.dto.MessaggioDto;
import it.academy.corso.diarioDigitale.messaggio.model.Messaggio;
import it.academy.corso.diarioDigitale.messaggio.repository.MessaggioRepository;
import it.academy.corso.diarioDigitale.user.model.User;
import it.academy.corso.diarioDigitale.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessaggioServiceImpl implements MessaggioService {

    private final MessaggioRepository messaggioRepository;

    @Override
    public MessaggioDto creaMessaggio(MessaggioDto messaggioDto) {

        Messaggio messaggio = dtoToModel(messaggioDto);
        Messaggio savedMessaggio = messaggioRepository.save(messaggio);

        return modelToDto(savedMessaggio);
    }

    @Override
    public List<MessaggioDto> getAllMessaggi() {

        return messaggioRepository.findAll()
            .stream()
            .map(this::modelToDto)
            .toList();
       
    }

   @Override
    public MessaggioDto getMessaggioById(Long idMessaggio) {
        
        Messaggio messaggio = messaggioRepository.findById(idMessaggio)
                .orElseThrow(() -> new EntityNotFoundException("Messaggio non trovato con ID: " + idMessaggio));
                
        return modelToDto(messaggio);
    }


    // conversioni

    private MessaggioDto modelToDto(Messaggio messaggio) {
        return MessaggioDto.builder()
                .contenuto(messaggio.getContenuto())
                .idStudente(messaggio.getStudente().getUuid())
                .nomeStudente(messaggio.getStudente().getNome() + " " + messaggio.getStudente().getCognome())
                .idDocente(messaggio.getDocente().getUuid())
                .nomeDocente(messaggio.getDocente().getNome() + " " + messaggio.getDocente().getCognome())
                .build();
    }

    private Messaggio dtoToModel(MessaggioDto messaggioDto) {
        return Messaggio.builder()
                .contenuto(messaggioDto.getContenuto())
                .studente(messaggioDto.getIdStudente()) 
                .docente(messaggioDto.getIdDocente())   
                .build();
    }
}
