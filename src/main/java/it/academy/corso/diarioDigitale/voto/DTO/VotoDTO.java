package it.academy.corso.diarioDigitale.voto.DTO;

import it.academy.corso.diarioDigitale.materia.model.Materia;
import it.academy.corso.diarioDigitale.user.model.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VotoDTO {
    
    private String uuid;
    
    @NotNull
    private double valore;

    private User studenteId;

    private Materia materiaId;

}
