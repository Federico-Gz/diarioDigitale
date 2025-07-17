package it.academy.corso.diarioDigitale.materia.service;

import it.academy.corso.diarioDigitale.materia.dto.MateriaDTO;
import it.academy.corso.diarioDigitale.materia.model.Materia;
import it.academy.corso.diarioDigitale.materia.repository.MateriaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MateriaServiceImpl implements MateriaService{
    private final MateriaRepository materiaRepository;

    @Override
    public List<MateriaDTO> findAll() {
        return materiaRepository.findAll()
                .stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public MateriaDTO findByUuid(String uuid) {
        MateriaDTO ret = modelToDto(materiaRepository.findByUuid(uuid).orElseThrow());
        return ret;
    }

    @Override
    public MateriaDTO save(MateriaDTO materia) {
        materia.setUuid(UUID.randomUUID().toString());
        return modelToDto(materiaRepository.save(dtoToModel(materia)));
    }

    @Override
    public void deleteByUuid(String uuid) {
        Materia materiaToDelete = materiaRepository.findByUuid(uuid).orElseThrow();
        materiaRepository.deleteByUuid(materiaToDelete.getUuid());
    }

    private MateriaDTO modelToDto(Materia materia){
        return MateriaDTO.builder()
                .uuid(materia.getUuid())
                .nome(materia.getNome())
                .build();
    }

    private Materia dtoToModel (MateriaDTO materia){
        return Materia.builder()
                .uuid(materia.getUuid())
                .nome(materia.getNome())
                .build();
    }
}
