package it.academy.corso.diarioDigitale.voto.service;

import java.util.List;

import it.academy.corso.diarioDigitale.voto.DTO.VotoDTO;

public interface VotoService {

    VotoDTO salvaVoto(VotoDTO votoDTO, Long idStudente, Long idMateria);

    List<VotoDTO> getVotiByStudente(Long idStudente);

}
