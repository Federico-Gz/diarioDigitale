package it.academy.corso.diarioDigitale.voto.DTO;

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

    private String studenteUuid;

    private String docenteUuid;
    
    private String materiaUuid;

}
