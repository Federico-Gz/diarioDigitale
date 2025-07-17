package it.academy.corso.diarioDigitale.voto.service;


import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import it.academy.corso.diarioDigitale.materia.model.Materia;
import it.academy.corso.diarioDigitale.materia.repository.MateriaRepository;
import it.academy.corso.diarioDigitale.user.model.User;
import it.academy.corso.diarioDigitale.user.repository.UserRepository;
import it.academy.corso.diarioDigitale.voto.DTO.VotoDTO;
import it.academy.corso.diarioDigitale.voto.model.Voto;
import it.academy.corso.diarioDigitale.voto.repository.VotoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VotoServiceImpl implements VotoService {


    private final VotoRepository votoRepository;
    private final UserRepository userRepository;
    private final MateriaRepository materiaRepository;


   @Override
    public VotoDTO salvaVoto(VotoDTO dto) {
        User docente = userRepository.findByUuid(dto.getDocenteUuid())
                .orElseThrow(() -> new EntityNotFoundException("Docente non trovato"));
        if (!docente.getRuolo().equalsIgnoreCase("DOCENTE")) {
            throw new IllegalArgumentException("Solo i docenti possono assegnare voti");
        }

        User studente = userRepository.findByUuid(dto.getStudenteUuid())
                .orElseThrow(() -> new EntityNotFoundException("Studente non trovato"));

        Materia materia = materiaRepository.findByUuid(dto.getMateriaUuid())
                .orElseThrow(() -> new EntityNotFoundException("Materia non trovata"));

        dto.setUuid(UUID.randomUUID().toString());

        Voto voto = dtoToModel(dto, docente, studente, materia);

        return modelToDto(votoRepository.save(voto));
    }

    @Override
    public VotoDTO findByUuid(String uuid) {
        Voto voto = votoRepository.findByUuid(uuid)
                .orElseThrow(() -> new EntityNotFoundException("Voto non trovato"));
        return modelToDto(voto);
    }

    @Override
    public List<VotoDTO> findAll() {
        return votoRepository.findAll()
                .stream()
                .map(this::modelToDto)
                .toList();
    }

     @Override
    public List<VotoDTO> getVotiByMateriaUuid(String materiaUuid) {
       return votoRepository.findByMateriaUuid(materiaUuid)
            .stream()
            .map(this::modelToDto)
            .toList();
    }

    @Override
    public List<VotoDTO> findByStudenteUuid(String studenteUuid) {
        return votoRepository.findByStudenteUuid(studenteUuid)
                .stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public List<VotoDTO> findByDocenteUuid(String docenteUuid) {
        return votoRepository.findByDocenteUuid(docenteUuid)
                .stream()
                .map(this::modelToDto)
                .toList();
    }

    // conversioni

    private VotoDTO modelToDto(Voto voto){
        return VotoDTO.builder()
            .uuid(voto.getUuid())
            .valore(voto.getValore())
            .studenteUuid(voto.getStudente().getUuid())
            .materiaUuid(voto.getMateria().getUuid())
            .docenteUuid(voto.getDocente().getUuid())
            .build();
        }

    private Voto dtoToModel(VotoDTO votoDTO, User docente, User studente, Materia materia){
        return Voto.builder()
        .uuid(votoDTO.getUuid())
        .valore(votoDTO.getValore())
        .studente(studente)
        .docente(docente)
        .materia(materia)
        .build();
    }


}
