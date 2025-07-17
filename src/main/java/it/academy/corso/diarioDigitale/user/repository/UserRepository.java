package it.academy.corso.diarioDigitale.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.academy.corso.diarioDigitale.user.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByUuid(String uuid);

    //per ottenere tutti gli studenti
    List<User> findByRuolo(String ruolo);
} 
