package it.academy.corso.diarioDigitale.messaggio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.academy.corso.diarioDigitale.messaggio.model.Messaggio;

@Repository
public interface MessaggioRepository extends JpaRepository<Messaggio, Long>{
    
} 
