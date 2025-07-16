package it.academy.corso.diarioDigitale.voto.service;

import java.util.List;

import it.academy.corso.diarioDigitale.voto.DTO.VotoDTO;

public interface VotoService {

    VotoDTO salvaVoto(VotoDTO votoDTO);
    VotoDTO findByUuid(String uuid);
    List<VotoDTO> findAll();
    List<VotoDTO> findByStudenteUuid(String studenteUuid);
    List<VotoDTO> findByDocenteUuid(String docenteUuid);
    List<VotoDTO> getVotiByMateriaUuid(String materiaUuid);

}
