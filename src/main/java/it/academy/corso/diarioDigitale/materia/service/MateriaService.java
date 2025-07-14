package it.academy.corso.diarioDigitale.materia.service;

import it.academy.corso.diarioDigitale.materia.dto.MateriaDTO;

import java.util.List;

public interface MateriaService {
    List<MateriaDTO> findAll();
    MateriaDTO findByUuid(String Uuid);
    MateriaDTO save(MateriaDTO materia);
    void deleteByUuid(String Uuid);
}
