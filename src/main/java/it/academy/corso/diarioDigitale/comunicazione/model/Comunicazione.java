package it.academy.corso.diarioDigitale.comunicazione.model;

import it.academy.corso.diarioDigitale.user.model.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comunicazione {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uuid;
    private String testo;

    @ManyToOne
    @JoinColumn(name = "id_studente", nullable = false)
    private User studente;

    @ManyToOne
    @JoinColumn(name = "id_docente", nullable = false)
    private User docente;
}
