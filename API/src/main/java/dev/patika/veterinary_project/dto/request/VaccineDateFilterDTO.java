package dev.patika.veterinary_project.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VaccineDateFilterDTO {
    private LocalDate startDate;
    private LocalDate endDate;
}
