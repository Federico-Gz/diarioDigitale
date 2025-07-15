package it.academy.corso.diarioDigitale.voto.service;

import java.util.List;

import it.academy.corso.diarioDigitale.materia.model.Materia;
import it.academy.corso.diarioDigitale.user.model.User;
import it.academy.corso.diarioDigitale.voto.DTO.VotoDTO;

public interface VotoService {

    VotoDTO salvaVoto(VotoDTO votoDTO, User idStudente, Materia idMateria);

    List<VotoDTO> getVotiByStudente(User idStudente);

    List<VotoDTO> getVotiByMateria(Materia idMateria);

    List<VotoDTO> getAllVoti();

}
