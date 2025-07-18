package it.academy.corso.diarioDigitale.comunicazione.service;

import it.academy.corso.diarioDigitale.comunicazione.DTO.ComunicazioneDTO;
import it.academy.corso.diarioDigitale.comunicazione.model.Comunicazione;
import it.academy.corso.diarioDigitale.comunicazione.repository.ComunicazioneRepository;
import it.academy.corso.diarioDigitale.user.model.User;
import it.academy.corso.diarioDigitale.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ComunicazioneServiceImpl implements ComunicazioneService{

    private final ComunicazioneRepository comunicazioneRepository;
    private final UserRepository userRepository;

    @Override
    public List<ComunicazioneDTO> findAll() {
        return comunicazioneRepository.findAll()
                .stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public ComunicazioneDTO findByUuid(String uuid) {
        ComunicazioneDTO ret = modelToDto(comunicazioneRepository.findByUuid(uuid).orElseThrow());
        return ret;
    }

    @Override
    public ComunicazioneDTO save(ComunicazioneDTO comunicazioneDto) {

        User studente = userRepository.findByUuid(comunicazioneDto.getStudenteUuid()).orElseThrow(() -> new EntityNotFoundException("Studente non trovato"));
        User docente = userRepository.findByUuid(comunicazioneDto.getDocenteUuid()).orElseThrow(() -> new EntityNotFoundException("Docente non trovato"));

        
        comunicazioneDto.setUuid(UUID.randomUUID().toString());
        Comunicazione comunicazione = dtoToModel(comunicazioneDto, studente, docente);

        return modelToDto(comunicazioneRepository.save(comunicazione));
    }

    public void deleteByDocenteUuidAndTesto(String docenteUuid, String testo) {
        List<Comunicazione> comunicazioni = comunicazioneRepository.findByDocenteUuidAndTesto(docenteUuid, testo);
        comunicazioneRepository.deleteAll(comunicazioni);
    }


    public void inviaAGliStudenti(User docente, String testo) {
        List<User> studenti = userRepository.findByRuolo("STUDENTE");
        for (User studente : studenti) {
            Comunicazione c = new Comunicazione();
            c.setUuid(UUID.randomUUID().toString());
            c.setTesto(testo);
            c.setStudente(studente);
            c.setDocente(docente); // chi è il mittente
            comunicazioneRepository.save(c);
        }
    }

    @Override
    public List<ComunicazioneDTO> findAllDistinctByDocente(String docenteUuid) {
        List<Comunicazione> comunicazioni = comunicazioneRepository.findAllByDocenteUuid(docenteUuid);
        Map<String, Comunicazione> uniqueMap = new HashMap<>();

        for (Comunicazione c : comunicazioni) {
            String key = c.getTesto(); 
            if (!uniqueMap.containsKey(key)) {
                uniqueMap.put(key, c);
            }
        }

        return uniqueMap.values().stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public List<ComunicazioneDTO> findAllByDocenteUuid(String docenteUuid) {
        List<Comunicazione> comunicazioni = comunicazioneRepository.findAllByDocenteUuid(docenteUuid);
        return comunicazioni.stream()
                .map(this::modelToDto)
                .toList();
    }


   private ComunicazioneDTO modelToDto(Comunicazione comunicazione){
        return ComunicazioneDTO.builder()
                .uuid(comunicazione.getUuid())
                .docenteUuid(comunicazione.getDocente().getUuid())
                .studenteUuid(comunicazione.getStudente().getUuid())
                .testo(comunicazione.getTesto())
                .build();
   }

   private Comunicazione dtoToModel(ComunicazioneDTO comunicazione, User studente, User docente){
        return Comunicazione.builder()
                .uuid(comunicazione.getUuid())
                .testo(comunicazione.getTesto())
                .docente(docente)
                .studente(studente)
                .build();
   }

   @Override
   public void deleteByUuid(String uuid) {
        Comunicazione comunicazioneToDelete = comunicazioneRepository.findByUuid(uuid).orElseThrow();
        comunicazioneRepository.delete(comunicazioneToDelete);
   }


  
}
