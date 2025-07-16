package it.academy.corso.diarioDigitale.compito.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import it.academy.corso.diarioDigitale.compito.dto.CompitoDTO;
import it.academy.corso.diarioDigitale.compito.model.Compito;
import it.academy.corso.diarioDigitale.compito.repository.CompitoRepository;
import it.academy.corso.diarioDigitale.materia.model.Materia;
import it.academy.corso.diarioDigitale.materia.repository.MateriaRepository;
import it.academy.corso.diarioDigitale.user.model.User;
import it.academy.corso.diarioDigitale.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CompitoServiceImpl implements CompitoService {

    private final CompitoRepository compitoRepository;
    private final UserRepository userRepository;
    private final MateriaRepository materiaRepository;

    @Override
    public CompitoDTO createCompito(CompitoDTO compitoDTO) {
        //Carica il docente
        User docente = userRepository.findByUuid(compitoDTO.getDocenteUuid())
            .orElseThrow(() -> new EntityNotFoundException("Docente non trovato"));
        if (!docente.getRuolo().equalsIgnoreCase("DOCENTE")) {
            throw new IllegalArgumentException("Solo i docenti possono creare compiti");
        }

        //Carica la materia
        Materia materia = materiaRepository.findByUuid(compitoDTO.getMateriaUuid())
            .orElseThrow(() -> new EntityNotFoundException("Materia non trovata"));


        User studente = userRepository.findByUuid(compitoDTO.getStudenteUuid()).orElseThrow(() -> new EntityNotFoundException("Studente non trovato"));
        
        compitoDTO.setUuid(UUID.randomUUID().toString());

        Compito compito = dtoToModel(compitoDTO, docente, materia, studente);

        return modelToDTO(compitoRepository.save((compito)));
    }

    @Override
    public List<CompitoDTO> getCompitiByDocenteUuid(String uuid) {
        List<Compito> compitiTrovati = compitoRepository.findByDocenteUuid(uuid);
        return compitiTrovati.stream()
                .map(this::modelToDTO)
                .toList();
    }

    @Override
    public List<CompitoDTO> getCompitiByStudenteUuid(String uuid) {
        List<Compito> compitiTrovati = compitoRepository.findByStudenteUuid(uuid);
        return compitiTrovati.stream()
                .map(this::modelToDTO)
                .toList();
    }

    @Override
    public CompitoDTO findByUuid(String uuid) {
        Compito compito = compitoRepository.findByUuid(uuid)
                .orElseThrow(() -> new EntityNotFoundException("Compito non trovato con uuid: " + uuid));

        return modelToDTO(compito);
    }

    @Override
    public List<CompitoDTO> getAllCompiti() {
        return compitoRepository.findAll().stream()
                .map(this::modelToDTO)
                .toList();
    }

    @Override
    public void deleteCompito(String uuid) {
        Compito compito = compitoRepository.findByUuid(uuid)
                .orElseThrow(() -> new EntityNotFoundException("Compito non trovato"));
        if (!compito.getDocente().getRuolo().equalsIgnoreCase("DOCENTE")) {
            throw new IllegalArgumentException("Solo i docenti possono eliminare compiti");
        }
        compitoRepository.delete(compito);
    }
/* 
    private Compito dtoToModel(CompitoDTO dto) {
        User docente = userRepository.findByUuid(dto.getDocenteUuid())
                .orElseThrow(() -> new RuntimeException("Docente non trovato"));

        Materia materia = materiaRepository.findByUuid(dto.getMateriaUuid())
                .orElseThrow(() -> new RuntimeException("Materia non trovata"));

        return Compito.builder()
                .uuid(dto.getUuid())
                .descrizione(dto.getDescrizione())
                .scadenza(dto.getScadenza())
                .docente(docente)
                .materia(materia)
                .build();
    }
*/

    private Compito dtoToModel(CompitoDTO dto, User docente, Materia materia, User studente) {
        return Compito.builder()
            .uuid(dto.getUuid())
            .descrizione(dto.getDescrizione())
            .scadenza(dto.getScadenza())
            .docente(docente)
            .materia(materia)
            .studente(studente)
            .build();
    }

    private CompitoDTO modelToDTO(Compito model) {
        return CompitoDTO.builder()
                .uuid(model.getUuid())
                .descrizione(model.getDescrizione())
                .scadenza(model.getScadenza())
                .docenteUuid(model.getDocente().getUuid())
                .materiaUuid(model.getMateria().getUuid())
                .build();
    }

}
