package it.academy.corso.diarioDigitale.voto.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import it.academy.corso.diarioDigitale.voto.DTO.VotoDTO;
import it.academy.corso.diarioDigitale.voto.model.Voto;
import it.academy.corso.diarioDigitale.voto.repository.VotoRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VotoServiceImpl implements VotoService {


    private final VotoRepository votoRepository;


    @Override
    public VotoDTO salvaVoto(VotoDTO votoDTO, Long idStudente, Long idMateria) {
        votoDTO.setUuid(UUID.randomUUID().toString());
        Voto voto = dtoToModel(votoDTO);
        Voto saved = votoRepository.save(voto);
    return modelToDto(saved);
}


    @Override
    public List<VotoDTO> getVotiByStudente(Long idStudente) {
       return votoRepository.findById(idStudente)
            .stream()
            .map(this::modelToDto)
            .toList();
    }


    // conversioni

    private VotoDTO modelToDto(Voto voto){
        return VotoDTO.builder()
            .uuid(voto.getUuid())
            .valore(voto.getValore())
            .studenteId(voto.getStudente())
            .materiaId(voto.getMateria())
            .build();
        }

    private Voto dtoToModel(VotoDTO votoDTO){
        return Voto.builder()
        .uuid(votoDTO.getUuid())
        .valore(votoDTO.getValore())
        .studente(votoDTO.getStudenteId())
        .materia(votoDTO.getMateriaId())
        .build();
    }

}
