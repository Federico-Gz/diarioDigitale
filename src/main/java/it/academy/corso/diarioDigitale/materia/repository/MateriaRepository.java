package it.academy.corso.diarioDigitale.materia.repository;

import it.academy.corso.diarioDigitale.materia.model.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, Long> {
    Optional<Materia> findByUuid(String Uuid);
    List<Materia> findByNomeContainingIgnoreCase(String nome);
    void deleteByUuid(String uuid);
}
