package it.academy.corso.diarioDigitale.messaggio.model;

import it.academy.corso.diarioDigitale.user.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Messaggio")
public class Messaggio {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uuid;

    @Column(nullable = false, length = 150)
    private String contenuto;

    @ManyToOne
    @JoinColumn(name = "id_studente", nullable = false)
    private User studente;

    @ManyToOne
    @JoinColumn(name = "id_docente", nullable = false)
    private User docente;
}
