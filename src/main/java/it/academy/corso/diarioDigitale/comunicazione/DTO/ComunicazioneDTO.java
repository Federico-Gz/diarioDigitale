package it.academy.corso.diarioDigitale.comunicazione.DTO;

import jakarta.persistence.Column;
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
public class ComunicazioneDTO {
    
    @Column(nullable = false, unique = true)
    private String uuid;

    @NotNull
    @NotEmpty
    private String testo;
    private String studenteUuid;
    private String docenteUuid;
}
