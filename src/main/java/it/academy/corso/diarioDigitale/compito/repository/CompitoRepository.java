package it.academy.corso.diarioDigitale.compito.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.academy.corso.diarioDigitale.compito.model.Compito;

@Repository
public interface CompitoRepository extends JpaRepository<Compito, Long> {
    List<Compito> findByDocenteUuid(String uuid);
    List<Compito> findByStudenteUuid(String uuid);
    Optional<Compito> findByUuid(String uuid);
}
