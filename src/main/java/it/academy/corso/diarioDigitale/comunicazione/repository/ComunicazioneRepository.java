package it.academy.corso.diarioDigitale.comunicazione.repository;

import it.academy.corso.diarioDigitale.comunicazione.model.Comunicazione;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ComunicazioneRepository extends JpaRepository<Comunicazione, Long> {

    Optional<Comunicazione> findByUuid(String uuid);

}
