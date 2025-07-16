package it.academy.corso.diarioDigitale.messaggio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.academy.corso.diarioDigitale.messaggio.model.Messaggio;

@Repository
public interface MessaggioRepository extends JpaRepository<Messaggio, Long>{

    Optional<Messaggio> findByUuid(String uuid);

    List<Messaggio> findByStudenteUuid(String uuid);

    List<Messaggio> findByDocenteUuid(String uuid);
} 
