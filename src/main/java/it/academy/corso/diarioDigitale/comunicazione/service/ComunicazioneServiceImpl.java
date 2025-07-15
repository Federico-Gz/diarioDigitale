package it.academy.corso.diarioDigitale.comunicazione.service;

import it.academy.corso.diarioDigitale.comunicazione.DTO.ComunicazioneDTO;
import it.academy.corso.diarioDigitale.comunicazione.model.Comunicazione;
import it.academy.corso.diarioDigitale.comunicazione.repository.ComunicazioneRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ComunicazioneServiceImpl implements ComunicazioneService{

    private final ComunicazioneRepository comunicazioneRepository;

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
    public ComunicazioneDTO save(ComunicazioneDTO comunicazione) {
        comunicazione.setUuid(UUID.randomUUID().toString());
        return modelToDto( comunicazioneRepository.save(dtoToModel(comunicazione)));
    }

    @Override
    public void deleteByUuid(String uuid) {
        Comunicazione comunicazioneToDelete = comunicazioneRepository.findByUuid(uuid).orElseThrow();
        comunicazioneRepository.deleteById(comunicazioneToDelete.getId());
    }

   private ComunicazioneDTO modelToDto(Comunicazione comunicazione){
        return ComunicazioneDTO.builder()
                .uuid(comunicazione.getUuid())
                .testo(comunicazione.getTesto())
                .build();
   }

   private Comunicazione dtoToModel(ComunicazioneDTO comunicazione){
        return Comunicazione.builder()
                .uuid(comunicazione.getUuid())
                .testo(comunicazione.getTesto())
                .build();
   }
}
