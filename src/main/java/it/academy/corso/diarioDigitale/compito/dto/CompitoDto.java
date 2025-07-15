package it.academy.corso.diarioDigitale.compito.dto;


import java.time.LocalDate;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class CompitoDTO {
    
    private String uuid;

    @NotNull
    @NotEmpty
    private String descrizione;

    @NotNull
    private LocalDate scadenza;

    @NotNull
    @NotEmpty
    private String materiaUuid;

    @NotNull
    @NotEmpty
    private String docenteUuid;
}
