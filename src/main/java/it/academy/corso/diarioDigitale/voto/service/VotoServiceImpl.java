package it.academy.corso.diarioDigitale.voto.service;

import java.util.List;

import org.springframework.stereotype.Service;

import it.academy.corso.diarioDigitale.materia.model.Materia;
import it.academy.corso.diarioDigitale.materia.repository.MateriaRepository;
import it.academy.corso.diarioDigitale.user.repository.UserRepository;
import it.academy.corso.diarioDigitale.voto.DTO.VotoDTO;
import it.academy.corso.diarioDigitale.voto.model.Voto;
import it.academy.corso.diarioDigitale.voto.repository.VotoRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VotoServiceImpl implements VotoService {


    private final VotoRepository votoRepository;
    private final UserRepository userRepository;
    private final MateriaRepository materiaRepository;


    @Override
    public VotoDTO salvaVoto(VotoDTO votoDTO, Long idStudente, Long idMateria) {
        
    
    }

    @Override
    public List<VotoDTO> getVotiByStudente(Long idStudente) {
       
    }

}
