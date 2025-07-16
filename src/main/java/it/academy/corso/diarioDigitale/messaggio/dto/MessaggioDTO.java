package it.academy.corso.diarioDigitale.messaggio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessaggioDTO {

    private String uuid;

    @NotBlank //non puo essere vuoto
    private String contenuto;
    @NotNull
    private String studenteUuid;
    @NotNull
    private String docenteUuid;

    private String nomeStudente;
    private String nomeDocente;
    
}
