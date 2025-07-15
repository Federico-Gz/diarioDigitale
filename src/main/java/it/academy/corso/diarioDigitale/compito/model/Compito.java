package it.academy.corso.diarioDigitale.compito.model;

import java.sql.Date;

import it.academy.corso.diarioDigitale.materia.model.Materia;
import it.academy.corso.diarioDigitale.user.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Materia")
public class Compito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String descrizione;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date scadenza;

    @ManyToOne
    @JoinColumn(name = "id_materia", nullable = false)
    private Materia materia;

    @ManyToOne
    @JoinColumn(name = "id_docente", nullable = false)
    private User docente;



}