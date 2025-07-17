package it.academy.corso.diarioDigitale.comunicazione.repository;


import it.academy.corso.diarioDigitale.comunicazione.model.Comunicazione;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComunicazioneRepository extends JpaRepository<Comunicazione, Long> {

    Optional<Comunicazione> findByUuid(String uuid);
    void deleteByUuid(String uuid);

    @Query("SELECT c FROM Comunicazione c WHERE c.docente.uuid = :docenteUuid AND c.testo = :testo")
    List<Comunicazione> findByDocenteUuidAndTesto(String docenteUuid, String testo);

    @Query("SELECT c FROM Comunicazione c WHERE c.docente.uuid = :docenteUuid")
    List<Comunicazione> findAllByDocenteUuid(@Param("docenteUuid") String docenteUuid);

    @Query("SELECT c FROM Comunicazione c WHERE c.docente.uuid = :docenteUuid GROUP BY c.testo, c.docente")
    List<Comunicazione> findComunicazioniGeneraliByDocente(@Param("docenteUuid") String docenteUuid);

}
