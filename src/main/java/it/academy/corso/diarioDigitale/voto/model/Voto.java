package it.academy.corso.diarioDigitale.voto.model;


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

@Table (name = "voto")
public class Voto{
    
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)    
    private long id;

    private String uuid;
    
    @Column(nullable = false)
    private double valore;

    @ManyToOne
    @JoinColumn(name = "id_studente", nullable = false)
    private User studente;

    @ManyToOne
    @JoinColumn(name = "id_materia", nullable = false)
    private Materia materia;
}