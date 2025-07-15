package it.academy.corso.diarioDigitale.messaggio.dto;

import it.academy.corso.diarioDigitale.user.model.User;
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
public class MessaggioDto {

    @NotBlank //non puo essere vuoto
    private String contenuto;
    @NotNull
    private User idStudente;
    @NotNull
    private User idDocente;

    private String nomeStudente;
    private String nomeDocente;
    
}
