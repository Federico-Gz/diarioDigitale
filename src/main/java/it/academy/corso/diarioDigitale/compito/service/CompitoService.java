package it.academy.corso.diarioDigitale.compito.service;

import java.util.List;

import it.academy.corso.diarioDigitale.compito.dto.CompitoDTO;

public interface CompitoService {
    
    CompitoDTO createCompito(CompitoDTO compitoDTO);
    List<CompitoDTO> getAllCompiti();
    List<CompitoDTO> getCompitiByDocenteUuid(String uuid);
    List<CompitoDTO> getCompitiByStudenteUuid(String uuidStudente);
    CompitoDTO findByUuid(String uuid);
    void deleteCompito(String uuid);
} 
