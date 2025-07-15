package it.academy.corso.diarioDigitale.messaggio.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import it.academy.corso.diarioDigitale.messaggio.dto.MessaggioDTO;
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
    private final UserRepository userRepository;


    @Override
    public MessaggioDTO save(MessaggioDTO messaggioDto) {
        User studente = userRepository.findByUuid(messaggioDto.getStudenteUuid()).orElseThrow(() -> new EntityNotFoundException("Studente non trovato"));
        User docente = userRepository.findByUuid(messaggioDto.getDocenteUuid()).orElseThrow(() -> new EntityNotFoundException("Docente non trovato"));
        messaggioDto.setUuid(UUID.randomUUID().toString());
        Messaggio messaggio = dtoToModel(messaggioDto, studente, docente);
        return modelToDto(messaggioRepository.save(messaggio));
    }

    @Override
    public List<MessaggioDTO> findAll() {

        return messaggioRepository.findAll()
            .stream()
            .map(this::modelToDto)
            .toList();
       
    }

    @Override
    public List<MessaggioDTO> findAllByStudenteUuid(String uuid) {
        return messaggioRepository.findByStudenteUuid(uuid).stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public List<MessaggioDTO> findAllByDocenteUuid(String uuid) {
        return messaggioRepository.findByDocenteUuid(uuid).stream()
                .map(this::modelToDto)
                .toList();
    }


    // conversioni

    private MessaggioDTO modelToDto(Messaggio messaggio) {
        return MessaggioDTO.builder()
                .uuid(messaggio.getUuid())
                .contenuto(messaggio.getContenuto())
                .studenteUuid(messaggio.getStudente().getUuid())
                .nomeStudente(messaggio.getStudente().getNome() + " " + messaggio.getStudente().getCognome())
                .docenteUuid(messaggio.getDocente().getUuid())
                .nomeDocente(messaggio.getDocente().getNome() + " " + messaggio.getDocente().getCognome())
                .build();
    }

    private Messaggio dtoToModel(MessaggioDTO messaggioDto, User studente, User docente) {
        return Messaggio.builder()
            .uuid(messaggioDto.getUuid())
            .contenuto(messaggioDto.getContenuto())
            .studente(studente) 
            .docente(docente)   
            .build();
    }

   
}
