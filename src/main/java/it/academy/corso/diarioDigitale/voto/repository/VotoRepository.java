package it.academy.corso.diarioDigitale.voto.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import it.academy.corso.diarioDigitale.voto.model.Voto;

@Repository
public interface VotoRepository extends JpaRepository<Voto, Long>{

    Optional<Voto> findByUuid(String uuid);
    
    List<Voto> findByStudenteUuid(String uuid);
    
    List<Voto> findByMateriaUuid(String uuid);

    List<Voto> findByDocenteUuid(String uuid);
}
