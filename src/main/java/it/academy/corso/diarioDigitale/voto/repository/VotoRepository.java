package it.academy.corso.diarioDigitale.voto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.academy.corso.diarioDigitale.user.model.User;
import it.academy.corso.diarioDigitale.voto.model.Voto;

@Repository
public interface VotoRepository extends JpaRepository<Voto, Long>{

    List<Voto> findByStudente(User studente);

}
